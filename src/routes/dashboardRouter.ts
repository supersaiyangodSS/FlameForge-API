import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadCharacterFile, uploadWeaponFile, logoutUser, deleteCharacter, deleteWeapon, deleteArtifact, uploadArtifactFile, editCharacter, saveCharacter } from '../controllers/dashboardController.js'
import multer, { StorageEngine, memoryStorage } from 'multer';
import { body } from 'express-validator';

const router : Router = Router();

const validateCharacter = [
    body('name').notEmpty().withMessage('Name is required'),
    body('birthday').notEmpty().withMessage('Birthday is required'),
    body('vr').notEmpty().withMessage('Version Release is required'),
    body('model').notEmpty().withMessage('Model info is required'),
    body('rarity').notEmpty().withMessage('Rarity is required'),
    body('vision').notEmpty().withMessage('Vision is required'),
    body('weapon').notEmpty().withMessage('Weapon is required'),
    body('region').notEmpty().withMessage('Region is required'),
    body('imgProfile').notEmpty().withMessage('Profile Picture Link is required'),
    body('imgCard').notEmpty().withMessage('Card Link is required'),
    body('imgGacha').notEmpty().withMessage('Gacha Art Link is required'),
    body('wikiUrl').notEmpty().withMessage('Wiki Link is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('constellation').notEmpty().withMessage('Constellation is required'),
];

const upload = multer({ storage: memoryStorage() });

router.get('/', checkAuth, getDashboard);
router.post('/upload/characters', upload.single('jsonCharacterFile'), uploadCharacterFile);
router.post('/upload/weapons', upload.single('jsonWeaponFile'), uploadWeaponFile);
router.post('/upload/artifacts', upload.single('jsonArtifactFile'), uploadArtifactFile);

router.post('/character/delete/:id', deleteCharacter)
router.post('/weapon/delete/:id', deleteWeapon)
router.post('/artifact/delete/:id', deleteArtifact)

router.get('/character/edit/:id', editCharacter);
router.post('/character/edit/:id', checkAuth, validateCharacter, saveCharacter);

router.get('/logout', logoutUser);

export default router;
