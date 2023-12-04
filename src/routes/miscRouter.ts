import { Router } from 'express';
import { reportPage, sendReport } from '../controllers/miscController.js';
import { body } from 'express-validator';
const router : Router = Router();

const validateReport = [
    body('name').notEmpty().withMessage('Invalid Name!'),
    body('email').isEmail().withMessage('Invalid Email!'),
    body('errorUrl').isURL().withMessage('Invalid URL!'),
    body('message').notEmpty().withMessage('Invalid Message')
]

router.route('/report')
    .get(reportPage)
    .post(validateReport, sendReport);

export default router;