import { Request, Response } from "express";
import User from '../models/userModel.js';
import Character from "../models/characterModel.js";

const getDashboard = async (req: Request, res: Response) => {
    
    try {
        const users = await User.find().select(
            '-password -token -__v -_id -isTokenUsed -email -createdAt -updatedAt'
        ).lean();
        const characters = await Character.find().select(
            '-desc -vision -weapon -versionRelease -birthday -title -constellation -region -affiliation -model -wikiUrl'
        ).lean();
        const locals = {
            title: 'Dashboard',
            desc: 'Dashboard for FlameForge API',
            users: users,
            characterIcons: characters,
            messages: req.flash(),
            user: req.session.user,
            role: 'Admin'
        }
        res.render('dashboard', locals);
        console.log(locals.user);
        
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
                req.flash('success', 'Data uploaded successfully')
                res.redirect('/dashboard');
            }
            // res.status(201).json({ message: 'Data saved successfully'});
        }
        } catch (error) {
            console.error(error);
            
      res.status(500).json({ error: 'Internal server error', mainError: error});
    }
};

export { getDashboard, uploadCharacterFile };