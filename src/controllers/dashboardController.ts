import { Request, Response } from "express";
import User from '../models/userModel.js';
import Character from "../models/characterModel.js";
import Weapon from "../models/weaponModel.js";
import Artifact from "../models/artifactModel.js";
import { validationResult } from "express-validator";
import { join } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
import { __dirname } from "../app.js";
import logger from "../logger.js";

const getDashboard = async (req: Request, res: Response) => {
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
        const userId = req.session.uid;
        const loggedUser = await User.findById(userId).lean();
        if (!loggedUser) {
            return res.status(404).send('Internal Server Error!');
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
            artifactCount
        }
        res.render('dashboard', locals);

    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: `user does not exist!` });
        }
        res.json({ message: `Account deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error` });
        console.log(error);        
    }
}

const uploadCharacterFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        if (req.file) {
            const uploadedData = JSON.parse(req.file.buffer.toString());
            for (const object of uploadedData) {
                const document = new Character(object);
                try {
                    await document.validate();
                } catch (validationError: any) {
                    console.error(validationError);
                    return res.status(400).json({ error: validationError.errors });
                }
                const result = await document.save();
                if (result) {
                    console.log('File Uploaded');
                }
            }
            req.flash("success", "Data uploaded successfully")
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Internal server error', mainError: error });
    }
};

const uploadWeaponFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        if (req.file) {
            const uploadedData = JSON.parse(req.file.buffer.toString());
            for (const object of uploadedData) {
                const document = new Weapon(object);
                try {
                    await document.validate();
                } catch (validationError: any) {
                    console.error(validationError);
                    return res.status(400).json({ error: validationError.errors });
                }
                const result = await document.save();
                if (result) {
                    console.log('File Uploaded');
                }
            }
            req.flash("success", "Data uploaded successfully")
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Internal server error', mainError: error });
    }
};

const uploadArtifactFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        if (req.file) {
            const uploadedData = JSON.parse(req.file.buffer.toString());
            for (const object of uploadedData) {
                const document = new Artifact(object);
                try {
                    await document.validate();
                } catch (validationError: any) {
                    console.error(validationError);
                    return res.status(400).json({ error: validationError.errors });
                }
                const result = await document.save();
                if (result) {
                    console.log('File Uploaded');
                }
            }
            req.flash("success", "Data uploaded successfully")
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Internal server error', mainError: error });
    }
};

const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session', err);
        }
        else {
            console.log('session destroyed successfully')
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
                req.flash('no character', 'character not found');
                return res.redirect('/');
            }
            const locals = {
                character: character
            }
            res.render('editCharacter', locals);
        }
        else {
            const character = await Character.findById(id).select('-__v').lean();
            if (character) {
                let characterName = character.name;
                const locals = {
                    title: characterName,
                    character: character
                }
                res.render('editCharacter', locals);
            } else {
                res.send('Invalid Character')
            }
            // res.send('Not Admin');
        }
    } catch (error) {
        console.error(error);
    }
}

const editWeapon = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const weapon = await Weapon.findById(id).select('-__v').lean();
            if (!weapon) {
                req.flash('error', 'Invalid Weapon id or Weapon not found');
                return res.redirect('/');
            }
            const weaponName = weapon.name;
            const locals = {
                title: weaponName,
                weapon: weapon
            }
            res.render('editWeapon', locals);
        }
        else {
            const weapon = await Weapon.findById(id).select('-__v').lean();
            if (!weapon) {
                req.flash('error', 'Invalid Weapon id or Weapon not found');
                return res.redirect('/');
            }
            const weaponName = weapon.name;
            const locals = {
                title: weaponName,
                weapon: weapon
            }
            res.render('editWeapon', locals);
        }
    } catch (error) {
        console.log(error);
    }
}

const editArtifact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const artifact = await Artifact.findById(id).select('-__v').lean();
            if (!artifact) {
                req.flash('error', 'Invalid Artifact id or Artifact not found');
                return res.redirect('/');
            }
            const artifactName = artifact.name;
            const locals = {
                title: artifactName,
                artifact: artifact
            }
            res.render('editArtifact', locals);
        }
        else {
            const artifact = await Artifact.findById(id).select('-__v').lean();
            if (!artifact) {
                req.flash('error', 'Invalid Artifact id or Artifact not found');
                return res.redirect('/');
            }
            const artifactName = artifact.name;
            const locals = {
                title: artifactName,
                artifact: artifact
            }
            res.render('editArtifact', locals);
        }
    } catch (error) {
        console.log(error);
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
                return res.status(409).json({
                    errors: errors.array().map((key) => key.msg)
                });
            }
            const existingCharacter = await Character.findById(id);
            if (!existingCharacter) {
                return res.json('no character found');
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
            req.flash('success', 'character information updated successfully');
            return res.redirect('/dashboard');
            // return res.send(updatedCharacter);
        }
        else {
            res.send('unauthorized')
        }
    } catch (error) {
        console.error(error);
    }
}

const saveWeapon = async (req: Request, res: Response) => {
    const { id } = req.params;
    let { name, vr, baseAtk, subStatType, baseSubStat, source, desc, affix, passive, region, family, icon, original, gacha, awakened, wikiUrl } = req.body;
    try {
        if (req.session && req.session.role == 'admin' || 2 == 2) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(409).json({
                    errors: errors.array().map((key) => key.msg)
                });
            }
            const existingWeapon = await Weapon.findById(id);
            if (!existingWeapon) {
                return res.send('no weapon found');
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
            req.flash('success', 'weapon information updated successfully');
            return res.redirect('/dashboard');
        }
        else {
            return res.send('Not authorized');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'internal server error' })
    }
}

const saveArtifact = async (req: Request, res: Response) => {
    const { id } = req.params;
    let { name, twoPc, fourPc, flowerTitle, flowerPiece, flowerIcon, sandsTitle, sandsPiece, sandsIcon, plumeTitle, plumePiece, plumeIcon, circletTitle, circletPiece, circletIcon, gobletTitle, gobletPiece, gobletIcon } = req.body;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(409).json({
                    errors: errors.array().map((key) => key.msg)
                });
            }
            const existingArtifact = await Artifact.findById(id);
            if (!existingArtifact) {
                return res.json('no artifact found');
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
                return res.send('error saving the artifact')
            }
            req.flash('success', 'artifact information updated successfully');
            return res.redirect('/dashboard');
        }
        else {
            res.send('unauthorized');
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            // return res.send(`admin: ${id}`);
            const deletedCharacter = await Character.findByIdAndRemove(id);
            if (deletedCharacter) {
                // res.send(deletedCharacter);
                req.flash('deletedItem', 'Deleted Successfully');
                return res.redirect('/dashboard')
            }
            else {
                return res.send('Interval server error');
            }
        }
        return res.send('not admin')
    } catch (error) {
        return res.send(error)
    }
}

const deleteWeapon = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            // return res.send(`admin: ${id}`);
            const deletedWeapon = await Weapon.findByIdAndRemove(id);
            if (deletedWeapon) {
                // res.send(deletedCharacter);
                req.flash('deletedItem', 'Deleted Successfully');
                return res.redirect('/dashboard')
            }
            else {
                return res.send('Interval server error');
            }
        }
        return res.send('not admin')
    } catch (error) {
        return res.send(error)
    }
}

const deleteArtifact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            // return res.send(`admin: ${id}`);
            const deletedArtifact = await Artifact.findByIdAndRemove(id);
            if (deletedArtifact) {
                // res.send(deletedCharacter);
                req.flash('deletedItem', 'Deleted Successfully');
                return res.redirect('/dashboard')
            }
            else {
                return res.send('Interval server error');
            }
        }
        return res.send('not admin')
    } catch (error) {
        return res.send(error)
    }
}

const downloadCharacters = async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.role == 'admin') {

            const characters = await Character.find().select('-_id -__v');
            if (!characters) {
                return res.render('404');
            }
            const filename = `character_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);

            writeFileSync(filePath, JSON.stringify(characters, null, 2));

            res.download(filePath, filename, (err) => {
                logger.info(`User ${req.session.user} exported characters`)
                unlinkSync(filePath);
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            })
        }
        else {
            return res.status(400).json({ unauthorized: 'Unauthorized access' })
        }
    } catch (error) {
        logger.error(`Error in download Characters: ${error}`);
        console.log(error);
        res.json(error)
    }
}

const downloadWeapons = async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.role == 'admin') {

            const weapons = await Weapon.find().select('-_id -__v');
            if (!weapons) {
                return res.render('404');
            }
            const filename = `weapon_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);

            writeFileSync(filePath, JSON.stringify(weapons, null, 2));

            res.download(filePath, filename, (err) => {
                logger.info(`User ${req.session.user} exported weapons`)
                unlinkSync(filePath);
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
        }
        else {
            return res.status(400).json({ unauthorized: 'Unauthorized access' })
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error in Exporting Weapons: ${error}`);
        console.log(error);
        res.json(error)
    }
}

const downloadArtifacts = async (req: Request, res: Response) => {
    try {
        if (req.session.user && req.session.role == 'admin') {

            const artifacts = await Artifact.find().select('-_id -__v');
            if (!artifacts) {
                return res.render('404');
            }
            const filename = `artifact_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);

            writeFileSync(filePath, JSON.stringify(artifacts, null, 2));

            res.download(filePath, filename, (err) => {
                logger.info(`User ${req.session.user} exported artifacts`)
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
            return res.status(401).render('500', {
                title: "Unauthorized"
            })
            // fix
        }
    } catch (error) {
        logger.error(`User: ${req.session.user}, Error in Exporting Artifacts: ${error}`);
        console.log(error);
        res.json(error)
    }
}

export { getDashboard, deleteUser, uploadCharacterFile, uploadWeaponFile, uploadArtifactFile, editCharacter, editWeapon, editArtifact, logoutUser, deleteCharacter, deleteWeapon, deleteArtifact, saveCharacter, saveWeapon, downloadCharacters, downloadWeapons, downloadArtifacts, saveArtifact };