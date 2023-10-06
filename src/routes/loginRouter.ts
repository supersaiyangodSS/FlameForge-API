import { Router } from 'express';
import {loginPage, loginUser, logoutUser} from '../controllers/loginController.js';
import { body } from 'express-validator';
const router : Router = Router();

const validateUsers = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
];

router.route('/')
    .get(loginPage)
    .post(validateUsers, loginUser)

router.get('/logout', logoutUser);

export default router;