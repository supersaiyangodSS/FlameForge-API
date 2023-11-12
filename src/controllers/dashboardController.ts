import { Request, Response } from "express";
import User from '../models/userModel.js';
import Character from "../models/characterModel.js";
import Weapon from "../models/weaponModel.js";
import Artifact from "../models/artifactModel.js";
import { validationResult } from "express-validator";
import { join } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
import { __dirname } from "../app.js";


const getDashboard = async (req: Request, res: Response) => {
    
    try {
        const users = await User.find().select(
            '-password -token -__v -_id -isTokenUsed -email -createdAt -updatedAt'
        ).lean();
        const characters = await Character.find().select(
            '-desc -vision -weapon -versionRelease -birthday -title -constellation -region -affiliation -model -wikiUrl'
        ).lean();
        const weapons = await Weapon.find().select(
            '-versionRelease'
        ).lean();
        const artifacts = await Artifact.find().select(
            '-versionRelease'
        ).lean();
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
            loggedUser: loggedUser
        }
        res.render('dashboard', locals);
                
    } catch (error) {
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
                } catch (validationError : any) {
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
            
      res.status(500).json({ error: 'Internal server error', mainError: error});
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
                } catch (validationError : any) {
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
            
      res.status(500).json({ error: 'Internal server error', mainError: error});
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
                } catch (validationError : any) {
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
            
      res.status(500).json({ error: 'Internal server error', mainError: error});
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
    const {id} = req.params;
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
    const {id} = req.params;
    try {
        if (req.session.user && req.session.role === 'admin') {
            const weapon = await Weapon.findById(id).select('-__v').lean();
            if(!weapon) {
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
            if(!weapon) {
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

const saveCharacter = async (req: Request, res: Response) => {
    const {id} = req.params;
    let titles = req.body.title.split(',');
    let affiliations = req.body.affiliation.split(',');
    let { name, birthday, vr, model, rarity, desc, vision, weapon , region, imgProfile, imgCard, imgGacha, wikiUrl, constellation} = req.body;
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
    try {
        
    } catch (error) {
        console.log(error);   
        return res.status(500).json({ 'error': 'internal server error' })
    }
}

const deleteCharacter = async (req: Request, res: Response) => {
    const {id} = req.params;
        try {            
            if (req.session.user && req.session.role === 'admin') {
                // return res.send(`admin: ${id}`);
                const deletedCharacter = await Character.findByIdAndRemove(id);
                if (deletedCharacter) {
                    // res.send(deletedCharacter);
                    req.flash('deletedItem', 'Deleted Successfully');
                    res.redirect('/dashboard')
                }
                else {
                    res.send('Interval server error');
                }
            }
            res.send('not admin')
        } catch (error) {
            
        }
}

const deleteWeapon = async (req: Request, res: Response) => {
    const {id} = req.params;
        try {            
            if (req.session.user && req.session.role === 'admin') {
                // return res.send(`admin: ${id}`);
                const deletedWeapon = await Weapon.findByIdAndRemove(id);
                if (deletedWeapon) {
                    // res.send(deletedCharacter);
                    req.flash('deletedItem', 'Deleted Successfully');
                    res.redirect('/dashboard')
                }
                else {
                    res.send('Interval server error');
                }
            }
            res.send('not admin')
        } catch (error) {
            
        }
}

const deleteArtifact = async (req: Request, res: Response) => {
    const {id} = req.params;
        try {            
            if (req.session.user && req.session.role === 'admin') {
                // return res.send(`admin: ${id}`);
                const deletedArtifact = await Artifact.findByIdAndRemove(id);
                if (deletedArtifact) {
                    // res.send(deletedCharacter);
                    req.flash('deletedItem', 'Deleted Successfully');
                    res.redirect('/dashboard')
                }
                else {
                    res.send('Interval server error');
                }
            }
            res.send('not admin')
        } catch (error) {
            
        }
}

const downloadCharacters = async (req: Request,  res: Response) => {
    try {
        if (req.session.user && req.session.role == 'admin') {

            const characters = await Character.find().select('-_id -__v');
            if (!characters) {
                return res.status(404).json({ 'error': "page not found" });
            }
            const filename = `character_data_${Date.now()}.json`;
            const filePath = join(__dirname, '..', 'downloads', filename);
            
            writeFileSync(filePath, JSON.stringify(characters, null, 2));
            res.download(filePath, filename, (err) => {
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
        console.log(error);
        res.json(error)
    }
}

export { getDashboard, uploadCharacterFile, uploadWeaponFile, uploadArtifactFile, editCharacter, editWeapon, logoutUser, deleteCharacter, deleteWeapon , deleteArtifact, saveCharacter, saveWeapon, downloadCharacters};