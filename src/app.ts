import { config } from 'dotenv';
config();
import express, {Express, NextFunction, Request, Response} from 'express';
import connectDB from './config/database.js';
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';
import logger from './logger.js';
import { create } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';
import session from 'express-session';
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app : Express = express();
const viewsPath = join(__dirname, "../views");
const layoutPath = join(__dirname, "../views/layouts");
const partialsPath = join(__dirname, "../views/partials");
const secretString = randomBytes(20).toString('hex');
const secret = process.env.SECRET || secretString;

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: layoutPath,
    partialsDir: partialsPath
})
const sessions = session({
    secret,
    resave: false,
    saveUninitialized: true
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions);
app.use(express.static('public'));
app.set('views', viewsPath);
app.use('/sign-in', loginRouter);
app.use('/sign-up', registerRouter);
app.use(( req : Request , res : Response , next : NextFunction ) => {
    logger.info(`Request Received ${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    console.log(`Request Received ${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    next();
});

const checkAuth = ( req : Request , res : Response, next : NextFunction ) => {
    if ( req.session && req.session.user ) {
        next();
    }
    else {
        res.redirect('/sign-in');
    }
}

app.get('/', checkAuth, ( req : Request , res : Response) => {
    res.render('home', {
        title: "Homepage"
    });
});

export { app , checkAuth };