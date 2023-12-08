import { Router , Request, Response} from "express";
import { getMain } from "../controllers/apiController.js";

const router = Router();

router.route('/')
        .get(getMain);

export default router;
