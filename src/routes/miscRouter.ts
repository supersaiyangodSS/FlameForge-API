import { Router } from 'express';
import { reportPage } from '../controllers/miscController.js';
import { body } from 'express-validator';
const router : Router = Router();

const validateReport = [
    body('name').notEmpty().withMessage('Invalid Name!'),
    body('email').isEmail().withMessage('Invalid Email!'),
    body('url').isEmpty().isURL().withMessage('Invalid URL!'),
    body('message').isEmpty().withMessage('Invalid Message')
]

router.route('/report')
    .get(reportPage)

export default router;