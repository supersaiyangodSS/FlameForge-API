import { checkAuth, checkAuthAdmin } from "../app.js";
import { Request, Response, Router } from "express";
import { getDashboard, uploadCharacterFile, uploadWeaponFile, logoutUser, deleteCharacter, deleteWeapon, deleteArtifact, uploadArtifactFile, editCharacter, editWeapon, saveCharacter, saveWeapon, downloadCharacters, downloadWeapons, downloadArtifacts, editArtifact, saveArtifact, deleteUser } from '../controllers/dashboardController.js'
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

const validateArtifact = [
    body('name').notEmpty().withMessage('Artifact name is required'),
    body('twoPc').notEmpty().withMessage('Artifact two piece effect is required'),
    body('fourPc').notEmpty().withMessage('Artifact four piece effect is required'),
    body('flowerTitle').notEmpty().withMessage('Flower title is required'),
    body('flowerPiece').notEmpty().withMessage('Flower piece name is required'),
    body('flowerIcon').notEmpty().withMessage('Flower icon link is required'),
    body('sandsTitle').notEmpty().withMessage('Sands title is required'),
    body('sandsPiece').notEmpty().withMessage('Sands piece name is required'),
    body('sandsIcon').notEmpty().withMessage('Sands icon link is required'),
    body('plumeTitle').notEmpty().withMessage('Plume title is required'),
    body('plumePiece').notEmpty().withMessage('Plume piece name is required'),
    body('plumeIcon').notEmpty().withMessage('Plume icon link is required'),
    body('circletTitle').notEmpty().withMessage('Circlet title is required'),
    body('circletPiece').notEmpty().withMessage('Circlet piece name is required'),
    body('circletIcon').notEmpty().withMessage('Circlet icon link is required'),
    body('gobletTitle').notEmpty().withMessage('Goblet title is required'),
    body('gobletPiece').notEmpty().withMessage('Goblet piece name is required'),
    body('gobletIcon').notEmpty().withMessage('Goblet icon link is required'),
]

const upload = multer({ storage: memoryStorage() });

router.get('/', checkAuth, getDashboard);
router.post('/upload/characters', checkAuth, upload.single('jsonCharacterFile'), uploadCharacterFile);
router.post('/upload/weapons', checkAuth, upload.single('jsonWeaponFile'), uploadWeaponFile);
router.post('/upload/artifacts', checkAuth, upload.single('jsonArtifactFile'), uploadArtifactFile);

router.post('/character/delete/:id', checkAuthAdmin, deleteCharacter)
router.post('/weapon/delete/:id', checkAuthAdmin, deleteWeapon)
router.post('/artifact/delete/:id', checkAuthAdmin, deleteArtifact)

router.get('/character/edit/:id', checkAuthAdmin, editCharacter);
router.post('/character/edit/:id', checkAuthAdmin, validateCharacter, saveCharacter);

router.get('/weapon/edit/:id', checkAuthAdmin, editWeapon);
router.post('/weapon/edit/:id', checkAuthAdmin, validateWeapon, saveWeapon);

router.get('/artifact/edit/:id', editArtifact);
router.post('/artifact/edit/:id', validateArtifact, saveArtifact);

router.get('/characters/download', checkAuthAdmin, downloadCharacters);
router.get('/weapons/download', checkAuthAdmin, downloadWeapons);
router.get('/artifacts/download', checkAuthAdmin, downloadArtifacts);

router.get('/logout', checkAuth, logoutUser);
router.delete('/delete/:id', checkAuth, deleteUser);

export default router;
