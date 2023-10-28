import { Router } from 'express';
import {loginPage, loginUser} from '../controllers/loginController.js';
import { body } from 'express-validator';
const router : Router = Router();

const validateUsers = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
];

router.route('/')
    .get(loginPage)
    .post(validateUsers, loginUser)


export default router;