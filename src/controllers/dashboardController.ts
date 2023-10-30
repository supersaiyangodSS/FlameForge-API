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
        const userId = req.session.uid;
        const loggedUser = await User.findById(userId).lean();
        if (!loggedUser) {
            return res.status(404).send('Internal Server Error!');
        }
        console.log(loggedUser);
        
        const locals = {
            title: 'Dashboard',
            desc: 'Dashboard for FlameForge API',
            users: users,
            characters: characters,
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
                    req.flash("success", "Data uploaded successfully")
                }
            }
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

export { getDashboard, uploadCharacterFile, logoutUser, deleteCharacter };