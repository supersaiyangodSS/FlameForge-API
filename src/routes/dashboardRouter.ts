import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadCharacterFile, uploadWeaponFile, logoutUser, deleteCharacter } from '../controllers/dashboardController.js'
import multer, { StorageEngine, memoryStorage } from 'multer';

const router : Router = Router();

const upload = multer({ storage: memoryStorage() });

router.get('/', checkAuth, getDashboard);
router.post('/upload/characters', upload.single('jsonCharacterFile'), uploadCharacterFile);
router.post('/upload/weapons', upload.single('jsonWeaponFile'), uploadWeaponFile);


router.post('/delete/character/:id', deleteCharacter)
router.get('/logout', logoutUser);

export default router;
