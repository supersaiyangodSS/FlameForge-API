import { Router } from 'express';
import {addUser, registerPage, verifyUser} from "../controllers/registerController.js";
import { body } from 'express-validator'
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
    .get(registerPage)
    .post(validateUser, addUser)

router.get('/verify', verifyUser);

export default router;
