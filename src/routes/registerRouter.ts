import express, { Router } from 'express';
import { addUser } from "../controllers/registerController.js";
import { body } from 'express-validator'
const router : Router = express.Router();

const validateUser = [
    body('firstName').notEmpty().withMessage('first name is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
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
    .post(validateUser, addUser)

export default router;