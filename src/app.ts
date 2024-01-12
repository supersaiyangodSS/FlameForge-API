import { config } from 'dotenv';
config();
import express, {Express, NextFunction, Request, Response} from 'express';
import connectDB from './config/database.js';
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';
import dashboardRouter from "./routes/dashboardRouter.js";
import miscRouter from './routes/miscRouter.js';
import apiRouter from './api/routes/apiRouter.js';
import { logger } from './helpers/logger.js';
import { create } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';
import session from 'express-session';
import flash from 'connect-flash';
import { eq } from './helpers/helper.js';
import cors from 'cors';
import helmet from 'helmet';
import cloudinary from 'cloudinary';
import { routeLogger } from './helpers/logger.js';
connectDB();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const app : Express = express();
const viewsPath = join(__dirname, "../views");
const layoutPath = join(__dirname, "../views/layouts");
const partialsPath = join(__dirname, "../views/partials");
const secretString = randomBytes(20).toString('hex');
const secret = process.env.SECRET || secretString;
const oneDay = 1000 * 60 * 60 * 24;

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: layoutPath,
    partialsDir: partialsPath,
    helpers: {
        eq: eq
    }
})

const sessions = session({
    secret,
    resave: false,
    cookie: { 
        path: '/',
        httpOnly: false,
        maxAge: oneDay },
    saveUninitialized: true
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions);
app.use(flash());
app.use(cors({
    origin: "http://localhost:4000" // REPLACE
}))
app.use(express.static('public'));
app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'code.jquery.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
        connectSrc: ["'self'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com'],
    }
}));
app.use((req, res, next) => {
    res.setHeader('Permissions-policy', '');
    next();
});

app.set('views', viewsPath);
app.use('/sign-in', loginRouter);
app.use('/sign-up', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/misc', miscRouter);
app.use('/api', apiRouter);
app.use(( req : Request , res : Response , next : NextFunction ) => {
    logger.info(`Request Received ${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    console.log(`Request Received ${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    next();
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function checkAuth ( req: Request, res: Response, next: NextFunction ) {
    if ( req.session && req.session.user ) {
        next();
    }
    else {
        res.redirect('/sign-in');
    }
}

export function checkAuthAdmin (req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.role === 'admin') {
        next();
    }
    else {
        res.redirect('/dashboard');
    }
}

app.get('/', ( req : Request , res : Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('homepage', {
        title: "Documentation"
    });
    routeLogger.verbose('route call successful', {
        endpoint: `/`,
        method: 'GET',
        ip: ip
    })
});

app.get('/report', ( req : Request , res : Response) => {
    res.render('report', {
        title: "Report Portal",
    });
});

app.get('*', ( req: Request , res : Response) => {
    res.render('404', {
        title: '404! Not Found!'
    })
});

export { app }