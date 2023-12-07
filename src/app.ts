import { config } from 'dotenv';
config();
import express, {Express, NextFunction, Request, Response} from 'express';
import connectDB from './config/database.js';
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';
import dashboardRouter from "./routes/dashboardRouter.js";
import miscRouter from './routes/miscRouter.js';
import { logger } from './helpers/logger.js';
import exphbs, { create } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';
import session from 'express-session';
import flash from 'connect-flash';
import { eq } from './helpers/helper.js';
import cors from 'cors';
import helmet from 'helmet';
connectDB();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const app : Express = express();
const viewsPath = join(__dirname, "../views");
const layoutPath = join(__dirname, "../views/layouts");
const partialsPath = join(__dirname, "../views/partials");
const secretString = randomBytes(20).toString('hex');
// const secret = process.env.SECRET || secretString;
const secret = 'js';
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
    origin: "http://localhost:4000"
}))
app.use(express.static('public'));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'code.jquery.com', 'cdnjs.cloudflare.com', 'cdn.jsdeliver.net', '*'], // FIXME:
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', '*'], // change to main images src for api and assets
        connectSrc: ["'self'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com'],
        manifestSrc: ["'self'"],
        workerSrc: ["'self'", 'blob:'],
        frameAncestors: ["'self'"],
        formAction: ["'self'"],
        frameSrc: ["'self'", 'cdnjs.cloudflare.com']
    }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}))
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use((req, res, next) => {
    res.setHeader('Permissions-policy', '');
    next();
});

app.set('views', viewsPath);
app.use('/sign-in', loginRouter);
app.use('/sign-up', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/misc', miscRouter);
app.use(( req : Request , res : Response , next : NextFunction ) => {
    logger.info(`Request Received ${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    console.log(`Request Received ${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    next();
});

// export const checkAuth = ( req : Request , res : Response, next : NextFunction ) => {
//     if ( req.session && req.session.user ) {
//         next();
//     }
//     else {
//         res.redirect('/sign-in');
//     }
// }

export function checkAuth ( req: Request, res: Response, next: NextFunction ) {
    req.session.user = 'SSJ'; //temp
    req.session.role = 'admin' //temp
    req.session.uid = '656cb6377894b27a8cd470cc' //temp
    // req.session.role = 'user' //temp
    if (req.session && req.session.user) {
        console.log(`
        user: ${req.session.user}
        role: ${req.session.role}
        uid: ${req.session.uid}
        `);
        next();
    }
    else {
        res.redirect('sign-in');
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
    res.render('home', {
        title: "Homepage"
    });
});

// fix
app.get('/401', ( req : Request , res : Response) => {
    res.render('401', {
        title: "401! Unauthorized!"
    });
});
// fix
app.get('/500', ( req : Request , res : Response) => {
    res.render('500', {
        title: "500! Internal Server Error!"
    });
});
// fix
app.get('/404', ( req : Request , res : Response) => {
    res.render('404', {
        title: "404! Not Found!"
    });
});

app.get('/test', ( req : Request , res : Response) => {
    res.render('emailSent', {
        title: "Email Sent Successully!",
        email: "vedantsapalkar99@gmail.com"
    });
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