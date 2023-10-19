import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard } from '../controllers/dashboardController.js'

const router : Router = Router();

router.get('/', getDashboard);

export default router;
