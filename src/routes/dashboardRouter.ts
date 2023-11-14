import { checkAuth } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadCharacterFile, uploadWeaponFile, logoutUser, deleteCharacter, deleteWeapon, deleteArtifact, uploadArtifactFile, editCharacter, editWeapon, saveCharacter, saveWeapon, downloadCharacters, downloadWeapons, downloadArtifacts, editArtifact } from '../controllers/dashboardController.js'
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
    body('affiliation').notEmpty().withMessage('Affiliation is required'),
    body('constellation').notEmpty().withMessage('Constellation is required'),
];

const validateWeapon = [
    body('name').notEmpty().withMessage('Weapon name is required'),
    body('desc').notEmpty().withMessage('Description is required'),
    body('rarity').notEmpty().withMessage('Rarity is required'),
    body('source').notEmpty().withMessage('Source is required'),
    body('baseAtk').notEmpty().withMessage('Base Attack value is required'),
    body('subStatType').notEmpty().withMessage('Sub Stat Type is required'),
    body('baseSubStat').notEmpty().withMessage('Base Stat value is required'),
    body('affix').notEmpty().withMessage('Weapon Affix is required'),
    body('passive').notEmpty().withMessage('Weapon Passive is required'),
    body('vr').notEmpty().withMessage('Version Release is required'),
    body('region').notEmpty().withMessage('Weapon Region is required'),
    body('family').notEmpty().withMessage('Weapon Family is required'),
    body('icon').notEmpty().withMessage('Weapon icon link is required'),
    body('original').notEmpty().withMessage('Original Weapon image link is required'),
    body('awakened').notEmpty().withMessage('Awakened Weapon image link is required'),
    body('gacha').notEmpty().withMessage('Gacha Art link is required'),
    body('wikiUrl').notEmpty().withMessage('Wiki URL is required'),
];

const upload = multer({ storage: memoryStorage() });

router.get('/', checkAuth, getDashboard);
router.post('/upload/characters', upload.single('jsonCharacterFile'), uploadCharacterFile);
router.post('/upload/weapons', upload.single('jsonWeaponFile'), uploadWeaponFile);
router.post('/upload/artifacts', upload.single('jsonArtifactFile'), uploadArtifactFile);

router.post('/character/delete/:id', deleteCharacter)
router.post('/weapon/delete/:id', deleteWeapon)
router.post('/artifact/delete/:id', deleteArtifact)

router.get('/character/edit/:id', editCharacter); // edit character page
router.post('/character/edit/:id', checkAuth, validateCharacter, saveCharacter); // save character

router.get('/weapon/edit/:id', editWeapon); // edit weapon page
router.post('/weapon/edit/:id', validateWeapon, saveWeapon); // save weapon

router.get('/artifact/edit/:id', editArtifact); // edit artifact page
// router.post('/weapon/edit/:id', validateWeapon, saveWeapon); // save artifact

router.get('/characters/download', downloadCharacters);
router.get('/weapons/download', downloadWeapons);
router.get('/artifacts/download', downloadArtifacts);

router.get('/logout', logoutUser);

export default router;
