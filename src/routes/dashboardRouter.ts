import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadCharacterFile, logoutUser, deleteItems } from '../controllers/dashboardController.js'
import multer, { StorageEngine, memoryStorage } from 'multer';

const router : Router = Router();

const upload = multer({ storage: memoryStorage() });

router.get('/', checkAuth, getDashboard);
router.post('/upload/characters', upload.single('jsonCharacterFile'), uploadCharacterFile);


router.post('/delete/:id', deleteItems)
router.get('/logout', logoutUser);

export default router;
