import { Request, Response, Router } from "express";
import { getDashboard } from '../controllers/dashboardController.js'

const router : Router = Router();

router.route('/')
        .get(getDashboard)

export default router;
