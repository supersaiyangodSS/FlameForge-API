import { Request, Response } from "express";
import User from '../models/userModel.js';
import Character from "../models/characterModel.js";
import Weapon from "../models/weaponModel.js";
import Artifact from "../models/artifactModel.js";
import { validationResult } from "express-validator";
import { join } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
import { __dirname } from "../app.js";
import { logger } from "../helpers/logger.js";
import Setting from "../models/settingsModel.js";
import cloudinary from 'cloudinary';

const getDashboard = async (req: Request, res: Response) => {
    if (req.session && req.session.user) {

        try {
            const users = await User.find().select(
            '-password -token -__v -_id -isTokenUsed -email -createdAt -updatedAt'
        ).lean();
        const characters = await Character.find().select(
            '-desc -vision -weapon -versionRelease -birthday -title -constellation -region -affiliation -model -wikiUrl'
        ).lean();
        const characterCount = await Character.countDocuments();
        const weapons = await Weapon.find().select(
            '-versionRelease'
        ).lean();
        const weaponCount = await Weapon.countDocuments();
        const artifacts = await Artifact.find().select(
            '-versionRelease'
        ).lean();
        const artifactCount = await Artifact.countDocuments();
        const settings = await Setting.findOne({ settingType: 'global' }).lean()
        const userId = req.session.uid;
        const loggedUser = await User.findById(userId).lean();
        if (!loggedUser) {
            logger.error(`User: ${req.session.user}, Error no logged user!`);
            res.status(500).render('500', {
                title: "Internal Server Error!",
            });
        }
        const locals = {
            title: 'Dashboard',
            desc: 'Dashboard for FlameForge API',
            users: users,
            characters: characters,
            weapons: weapons,
            artifacts: artifacts,
            messages: req.flash(),
            user: req.session.user,
            role: req.session.role,
            loggedUser: loggedUser,
            characterCount,
            weaponCount,
            artifactCount,
            settings

        }
        return res.render('dashboard', locals);

    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured on dashboard page: ${error}`);
        console.log(error);
        return res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}
res.status(301).redirect('/sign-in');
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            req.flash('error', 'User does not exist!');
            return res.status(301).redirect('/dashboard');
        }
        req.flash('success', 'Account Deleted Successfully!');
        return res.status(301).redirect('/sign-in');
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while deleting user account: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });  
    }
}

const uploadCharacterFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            req.flash('error', 'no files selected!');
            return res.status(301).redirect('/dashboard')
        }
            let uploadedData;
            try {
                uploadedData = JSON.parse(req.file.buffer.toString());
            } catch (jsonError) {
                req.flash('error', 'JSON Syntax Error!');
                return res.status(301).redirect('/dashboard');
            }
            for (const object of uploadedData) {
                const document = new Character(object);
                try {
                    await document.validate();
                } catch (validationError: any) {
                    req.flash('error', 'Please Provide Valid Data!');
                    return res.status(301).redirect('/dashboard');
                }
                const result = await document.save();
                if (!result) {
                    logger.error(`User: ${req.session.user}, Error occured while saving the character`);
                    req.flash('error', 'An Error Occured While Saving the Data!');
                    return res.status(301).redirect('/dashboard');
                }
            }
            req.flash("success", "Data uploaded successfully")
            res.status(301).redirect('/dashboard');
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while uploading character: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
};

const uploadImage = async (req: Request, res: Response) => {
    try {
        const url = req.body.characterImage;
        const urls = url.split(',');
        if (!url) {
            return res.status(404).render('404', {
                title: "Not Found!",
            });
        }

        const uploadedUrls = [];

        const folder = 'FlameForge/characters';
        const publicId = `character${Date.now()}`
        const options = {
            public_id: publicId,
            folder: folder
        };

        for (const link of urls) {
            const result = await cloudinary.v2.uploader.upload(link, options);
            uploadedUrls.push(result.url);
        }
                
        req.flash('success', 'Image Uploaded Successfully!');
        req.flash('link', uploadedUrls);
        return res.redirect('/dashboard');
        
    } catch (error) {    
        if (error.http_code == '404' || error.http_code) {
            logger.error(`User: ${req.session.user},  uploaded invalid image link: ${error}`);
            req.flash('error', 'Invalid Image Link Provided!');
            return res.redirect('/dashboard');
        }
        logger.error(`User: ${req.session.user}, Error occured while uploading image: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const uploadWeaponFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            req.flash('error', 'no files selected!');
            return res.status(301).redirect('/dashboard')
        }
            let uploadedData;
            try {
                uploadedData = JSON.parse(req.file.buffer.toString());
            } catch (jsonError) {
                req.flash('error', 'JSON Syntax Error!');
                return res.status(301).redirect('/dashboard');
            }
            for (const object of uploadedData) {
                const document = new Weapon(object);
                try {
                    await document.validate();
                } catch (validationError: any) {
                    req.flash('error', 'Please Provide Valid Data!');
                    return res.status(301).redirect('/dashboard');
                }
                const result = await document.save();
                if (!result) {
                    logger.error(`User: ${req.session.user}, Error occured while saving the weapon`);
                    req.flash('error', 'An Error Occured While Saving the Data!');
                    return res.status(301).redirect('/dashboard');
                }
            }
            req.flash("success", "Data uploaded successfully")
            res.status(301).redirect('/dashboard');
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while uploading weapon: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
};

const uploadArtifactFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            req.flash('error', 'no files selected!');
            return res.status(301).redirect('/dashboard')
        }
            let uploadedData;
            try {
                uploadedData = JSON.parse(req.file.buffer.toString());
            } catch (jsonError) {
                req.flash('error', 'JSON Syntax Error!');
                return res.status(301).redirect('/dashboard');
            }
            for (const object of uploadedData) {
                const document = new Artifact(object);
                try {
                    await document.validate();
                } catch (validationError: any) {
                    req.flash('error', 'Please Provide Valid Data!');
                    return res.status(301).redirect('/dashboard');
                }
                const result = await document.save();
                if (!result) {
                    logger.error(`User: ${req.session.user}, Error occured while saving the artifact`);
                    req.flash('error', 'An Error Occured While Saving the Data!');
                    return res.status(301).redirect('/dashboard');
                }
            }
            req.flash("success", "Data uploaded successfully")
            res.status(301).redirect('/dashboard');
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while uploading artifact page: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
};

const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
        logger.error(`User: ${req.session.user}, Error occured on editing artifact page: ${err}`);
        console.log(err);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
        }
        else {
            res.status(301).redirect('/sign-in');
        }
    });
}

const editCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const character = await Character.findById(id).select('-__v').lean();
            if (!character) {
                req.flash('error', 'Invalid Character id or Character not found!');
                return res.status(301).redirect('/');
            }
            const characterName = character.name;
            const locals = {
                title: characterName,
                character: character,
                messages: req.flash()
            }
            res.render('editCharacter', locals);
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
            title: "Unauthorized",
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured on editing character page: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const editWeapon = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const weapon = await Weapon.findById(id).select('-__v').lean();
            if (!weapon) {
                req.flash('error', 'Invalid Weapon id or Weapon not found!');
                return res.status(301).redirect('/');
            }
            const weaponName = weapon.name;
            const locals = {
                title: weaponName,
                weapon: weapon,
                messages: req.flash()
            }
            res.render('editWeapon', locals);
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
            title: "Unauthorized",
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured on editing weapon page: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const editArtifact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const artifact = await Artifact.findById(id).select('-__v').lean();
            if (!artifact) {
                req.flash('error', 'Invalid Artifact id or Artifact not found!');
                return res.status(301).redirect('/');
            }
            const artifactName = artifact.name;
            const locals = {
                title: artifactName,
                artifact: artifact,
                messages: req.flash()
            }
            res.render('editArtifact', locals);
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
            title: "Unauthorized",
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured on editing artifact page: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const saveCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    let titles = req.body.title.split(',');
    let affiliations = req.body.affiliation.split(',');
    let { name, birthday, vr, model, rarity, desc, vision, weapon, region, imgProfile, imgCard, imgGacha, wikiUrl, constellation } = req.body;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorOne = errors.array()[0].msg;
                req.flash('error', errorOne);
                return res.status(301).redirect(`/dashboard${req.url}`);
            }
            const existingCharacter = await Character.findById(id);
            if (!existingCharacter) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
            if (name !== existingCharacter.name) {
                existingCharacter.name = name;
            }
            if (birthday !== existingCharacter.birthday) {
                existingCharacter.birthday = birthday;
            }
            if (desc !== existingCharacter.desc) {
                existingCharacter.desc = desc;
            }
            if (rarity !== existingCharacter.rarity) {
                existingCharacter.rarity = rarity;
            }
            if (vision !== existingCharacter.vision) {
                existingCharacter.vision = vision;
            }
            if (weapon !== existingCharacter.weapon) {
                existingCharacter.weapon = weapon;
            }
            if (vr !== existingCharacter.versionRelease) {
                existingCharacter.versionRelease = vr;
            }
            if (titles !== existingCharacter.title) {
                existingCharacter.title = titles;
            }
            if (constellation !== existingCharacter.constellation) {
                existingCharacter.constellation = constellation;
            }
            if (region !== existingCharacter.region) {
                existingCharacter.region = region;
            }
            if (affiliations !== existingCharacter.affiliation) {
                existingCharacter.affiliation = affiliations;
            }
            if (desc !== existingCharacter.desc) {
                existingCharacter.desc = desc;
            }
            if (imgProfile !== existingCharacter.images.profile) {
                existingCharacter.images.profile = imgProfile;
            }
            if (imgGacha !== existingCharacter.images.gacha) {
                existingCharacter.images.gacha = imgGacha;
            }
            if (imgCard !== existingCharacter.images.card) {
                existingCharacter.images.card = imgCard;
            }
            if (model !== existingCharacter.model) {
                existingCharacter.model = model;
            }
            if (wikiUrl != existingCharacter.wikiUrl) {
                existingCharacter.wikiUrl = wikiUrl;
            }
            const updatedCharacter = await existingCharacter.save();
            if (!updatedCharacter) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
            req.flash('success', 'character information updated successfully');
            return res.status(301).redirect('/dashboard');
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
            title: "Unauthorized",
        });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while saving the character: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const saveWeapon = async (req: Request, res: Response) => {
    const { id } = req.params;
    let { name, vr, baseAtk, subStatType, baseSubStat, source, desc, affix, passive, region, family, icon, original, gacha, awakened, wikiUrl } = req.body;
    try {
        if (req.session && req.session.role == 'admin') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorOne = errors.array()[0].msg;
                req.flash('error', errorOne);
                return res.status(301).redirect(`/dashboard${req.url}`);
            }
            const existingWeapon = await Weapon.findById(id);
            if (!existingWeapon) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
            if (name !== existingWeapon.name) {
                existingWeapon.name = name;
            }
            if (vr !== existingWeapon.versionRelease) {
                existingWeapon.versionRelease = vr;
            }
            if (baseAtk !== existingWeapon.baseAtk) {
                existingWeapon.baseAtk = baseAtk;
            }
            if (subStatType !== existingWeapon.subStatType) {
                existingWeapon.subStatType = subStatType;
            }
            if (baseSubStat !== existingWeapon.baseSubStat) {
                existingWeapon.baseSubStat = baseSubStat;
            }
            if (source !== existingWeapon.source) {
                existingWeapon.source = source;
            }
            if (subStatType !== existingWeapon.subStatType) {
                existingWeapon.subStatType = subStatType;
            }
            if (desc !== existingWeapon.desc) {
                existingWeapon.desc = desc;
            }
            if (affix !== existingWeapon.affix) {
                existingWeapon.affix = affix;
            }
            if (passive !== existingWeapon.passive) {
                existingWeapon.passive = passive;
            }
            if (region !== existingWeapon.region) {
                existingWeapon.region = region;
            }
            if (family !== existingWeapon.family) {
                existingWeapon.family = family;
            }
            if (icon !== existingWeapon.images.icon) {
                existingWeapon.images.icon = icon;
            }
            if (original !== existingWeapon.images.original) {
                existingWeapon.images.original = original;
            }
            if (awakened !== existingWeapon.images.awakened) {
                existingWeapon.images.awakened = awakened;
            }
            if (gacha !== existingWeapon.images.gacha) {
                existingWeapon.images.gacha = gacha;
            }
            if (wikiUrl !== existingWeapon.wikiUrl) {
                existingWeapon.wikiUrl = wikiUrl;
            }
            const updatedWeapon = await existingWeapon.save();
            if (!updatedWeapon) {
                return res.status(404).render('404', {
                    title: "Not Found!"
                });
            }
            req.flash('success', 'weapon information updated successfully');
            return res.status(301).redirect('/dashboard');
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
            title: "Unauthorized",
        });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while saving the weapon: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const saveArtifact = async (req: Request, res: Response) => {
    const { id } = req.params;
    let { name, twoPc, fourPc, flowerTitle, flowerPiece, flowerIcon, sandsTitle, sandsPiece, sandsIcon, plumeTitle, plumePiece, plumeIcon, circletTitle, circletPiece, circletIcon, gobletTitle, gobletPiece, gobletIcon } = req.body;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorOne = errors.array()[0].msg;
                req.flash('error', errorOne);
                return res.status(301).redirect(`/dashboard${req.url}`);
            }
            const existingArtifact = await Artifact.findById(id);
            if (!existingArtifact) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
            if (name !== existingArtifact.name) {
                existingArtifact.name = name
            }
            if (twoPc !== existingArtifact.effect.twoPc) {
                existingArtifact.effect.twoPc = twoPc
            }
            if (fourPc !== existingArtifact.effect.fourPc) {
                existingArtifact.effect.fourPc = fourPc
            }
            if (flowerTitle !== existingArtifact.fullSet.flower.title) {
                existingArtifact.fullSet.flower.title = flowerTitle
            }
            if (flowerPiece !== existingArtifact.fullSet.flower.piece) {
                existingArtifact.fullSet.flower.piece = flowerPiece
            }
            if (flowerIcon !== existingArtifact.fullSet.flower.icon) {
                existingArtifact.fullSet.flower.icon = flowerIcon
            }
            if (sandsTitle !== existingArtifact.fullSet.sands.title) {
                existingArtifact.fullSet.sands.title = sandsTitle
            }
            if (sandsPiece !== existingArtifact.fullSet.sands.piece) {
                existingArtifact.fullSet.sands.piece = sandsPiece
            }
            if (sandsIcon !== existingArtifact.fullSet.sands.icon) {
                existingArtifact.fullSet.sands.icon = sandsIcon
            }
            if (plumeTitle !== existingArtifact.fullSet.plume.title) {
                existingArtifact.fullSet.plume.title = plumeTitle
            }
            if (plumePiece !== existingArtifact.fullSet.plume.piece) {
                existingArtifact.fullSet.plume.piece = plumePiece
            }
            if (plumeIcon !== existingArtifact.fullSet.plume.icon) {
                existingArtifact.fullSet.plume.icon = plumeIcon
            }
            if (circletTitle !== existingArtifact.fullSet.circlet.title) {
                existingArtifact.fullSet.circlet.title = circletTitle
            }
            if (circletPiece !== existingArtifact.fullSet.circlet.piece) {
                existingArtifact.fullSet.circlet.piece = circletPiece
            }
            if (circletIcon !== existingArtifact.fullSet.circlet.icon) {
                existingArtifact.fullSet.circlet.icon = circletIcon
            }
            if (gobletTitle !== existingArtifact.fullSet.goblet.title) {
                existingArtifact.fullSet.goblet.title = gobletTitle
            }
            if (gobletPiece !== existingArtifact.fullSet.goblet.piece) {
                existingArtifact.fullSet.goblet.piece = gobletPiece
            }
            if (gobletIcon !== existingArtifact.fullSet.goblet.icon) {
                existingArtifact.fullSet.goblet.icon = gobletIcon
            }
            const updatedArtifact = await existingArtifact.save();
            if (!updatedArtifact) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
            req.flash('success', 'artifact information updated successfully');
            return res.status(301).redirect('/dashboard');
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
            title: "Unauthorized",
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while saving the artifact: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const deleteCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const deletedCharacter = await Character.findByIdAndRemove(id);
            if (!deletedCharacter) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
                req.flash('success', 'Character Deleted Successfully');
                return res.status(301).redirect('/dashboard');
        }
        logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
        return res.status(401).render('401', {
            title: "Unauthorized",
        });
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while deleting the character: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const deleteWeapon = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const deletedWeapon = await Weapon.findByIdAndRemove(id);
            if (!deletedWeapon) {
                return res.status(500).render('404', {
                    title: "Not Found!",
                });
            }
                req.flash('success', 'Weapon Deleted Successfully');
                return res.status(301).redirect('/dashboard');
        }
        logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
        return res.status(401).render('401', {
            title: "Unauthorized",
        });
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while deleting the weapons: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const deleteArtifact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const deletedArtifact = await Artifact.findByIdAndRemove(id);
            if(!deletedArtifact) {
                return res.status(404).render('404', {
                    title: "Not Found!",
                });
            }
                req.flash('success', 'Artifact Deleted Successfully');
                return res.status(301).redirect('/dashboard');
        }
        logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
        return res.status(401).render('401', {
            title: "Unauthorized",
        });
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while deleting the artifact: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const downloadCharacters = async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.role === 'admin') {

            const characters = await Character.find().select('-_id -__v');
            if (!characters) {
                return res.status(404).render('404', {
                    title: "Not Found!"
                }); 
            }
            const filename = `character_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);

            writeFileSync(filePath, JSON.stringify(characters, null, 2));

            res.download(filePath, filename, (err) => {
                logger.silly(`User ${req.session.user} as ${req.session.role} exported characters`)
                unlinkSync(filePath);
                if (err) {
                    console.log(err);
                    res.status(500).render('500', {
                        title: "Internal Server Error!"
                    });
                }
            })
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
                title: "Unauthorized"
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while exporting artifacts: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!"
        });
    }
}

const downloadWeapons = async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.role === 'admin') {

            const weapons = await Weapon.find().select('-_id -__v');
            if (!weapons) {
                return res.status(404).render('404', {
                    title: "Not Found!"
                }); 
            }
            const filename = `weapon_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);

            writeFileSync(filePath, JSON.stringify(weapons, null, 2));

            res.download(filePath, filename, (err) => {
                logger.silly(`User ${req.session.user} as ${req.session.role} exported weapons`)
                unlinkSync(filePath);
                if (err) {
                    console.log(err);
                    res.status(500).render('500', {
                        title: "Internal Server Error!"
                    });
                }
            });
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
                title: "Unauthorized"
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while exporting weapons: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!"
        });
    }
}

const downloadArtifacts = async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.role === 'admin') {
            const artifacts = await Artifact.find().select('-_id -__v');
            if (!artifacts) {
                return res.status(404).render('404', {
                    title: "Not Found!"
                }); 
            }
            const filename = `artifact_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);

            writeFileSync(filePath, JSON.stringify(artifacts, null, 2));

            res.download(filePath, filename, (err) => {
                logger.silly(`User: ${req.session.user} as ${req.session.role} exported artifacts`)
                unlinkSync(filePath);
                if (err) {
                    console.log(err);
                    res.status(500).render('500', {
                        title: "Internal Server Error!"
                    });
                }
            });
        }
        else {
            logger.silly(`User: ${req.session.user}, Attempt unauthorized access to ${req.url}`);
            return res.status(401).render('401', {
                title: "Unauthorized"
            });
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while exporting artifacts: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!"
        });
    }
}

export { getDashboard, deleteUser, uploadCharacterFile, uploadWeaponFile, uploadArtifactFile, editCharacter, editWeapon, editArtifact, logoutUser, deleteCharacter, deleteWeapon, deleteArtifact, saveCharacter, saveWeapon, downloadCharacters, downloadWeapons, downloadArtifacts, saveArtifact, uploadImage };