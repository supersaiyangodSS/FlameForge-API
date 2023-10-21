import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadFile } from '../controllers/dashboardController.js'
import multer, { StorageEngine, memoryStorage } from 'multer';

const router : Router = Router();

const upload = multer({ storage: memoryStorage() });

router.get('/', getDashboard);
router.post('/upload/characters', upload.single('jsonCharacterFile'), uploadFile);

export default router;
