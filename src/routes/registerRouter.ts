import { Router } from 'express';
import {addUser, registerPage, verifyUser} from "../controllers/registerController.js";
import { body } from 'express-validator'
import { formLimiter, limiter } from '../helpers/limiter.js';
const router : Router = Router();

const validateUser = [
    body('firstName').notEmpty().withMessage('first name is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('username').notEmpty().withMessage('username is required'),
    body('email').notEmpty().isEmail().withMessage('email is required'),
    body('password').isLength({ min: 8 }).withMessage('password is required')
    .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Password Does Not Match');
        }
        return true;
    }),
    body('confirmPassword').notEmpty().withMessage('confirm password is required')
]

router.route('/')
    .get(limiter, registerPage)
    .post(formLimiter, validateUser, addUser)

router.get('/verify', formLimiter, verifyUser);

export default router;
