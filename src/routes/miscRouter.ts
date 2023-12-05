import { Router } from 'express';
import { modifySettings, reportPage, sendReport } from '../controllers/miscController.js';
import { body } from 'express-validator';
import { formLimiter, limiter } from '../helpers/limiter.js';
import { checkAuthAdmin } from '../app.js';
const router : Router = Router();

const validateReport = [
    body('name').notEmpty().withMessage('Invalid Name!'),
    body('email').isEmail().withMessage('Invalid Email!'),
    body('errorUrl').isURL().withMessage('Invalid URL!'),
    body('message').notEmpty().withMessage('Invalid Message')
]

router.route('/report')
    .get(limiter, reportPage)
    .post(validateReport, formLimiter, sendReport);

router.route('/setting')
    .post(formLimiter, checkAuthAdmin, modifySettings);

export default router;
