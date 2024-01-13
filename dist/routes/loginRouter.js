import { Router } from 'express';
import { loginPage, loginUser } from '../controllers/loginController.js';
import { body } from 'express-validator';
import { formLimiter, limiter } from '../helpers/limiter.js';
const router = Router();
const validateUsers = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
];
router.route('/')
    .get(limiter, loginPage)
    .post(validateUsers, formLimiter, loginUser);
export default router;
//# sourceMappingURL=loginRouter.js.map