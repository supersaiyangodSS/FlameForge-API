import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadCharacterFile, uploadWeaponFile, logoutUser, deleteCharacter, deleteWeapon, deleteArtifact, uploadArtifactFile, editCharacter } from '../controllers/dashboardController.js'
import multer, { StorageEngine, memoryStorage } from 'multer';

const router : Router = Router();

const upload = multer({ storage: memoryStorage() });

router.get('/', checkAuth, getDashboard);
router.post('/upload/characters', upload.single('jsonCharacterFile'), uploadCharacterFile);
router.post('/upload/weapons', upload.single('jsonWeaponFile'), uploadWeaponFile);
router.post('/upload/artifacts', upload.single('jsonArtifactFile'), uploadArtifactFile);

router.post('/character/delete/:id', deleteCharacter)
router.post('/weapon/delete/:id', deleteWeapon)
router.post('/artifact/delete/:id', deleteArtifact)

router.get('/character/edit/:id', editCharacter);

router.get('/logout', logoutUser);

export default router;
