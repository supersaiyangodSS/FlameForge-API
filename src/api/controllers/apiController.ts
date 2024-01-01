import { Request, Response } from "express";
import Character from "../../models/characterModel.js";

const getMain = async (req: Request, res: Response) => {
    try {

        res.json({ message: "Explore our API documentation on the homepage for detailed information and usage guidelines." });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

const getCharacterByName = async (req: Request, res: Response) => {
    try {
        const { name, infoSize } = req.query;
        const nameAsString = name as string;
        if (!name) {
            return res.status(400).json({ error: 'Input parameter is missing.' });
        }
        const formattedInput = nameAsString.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
        if (!formattedInput) {
            return res.status(500).json({ error: 'Internal server error!' });
        }
        if (infoSize == 'full') {
            const getCharByName = await Character.find({ name : formattedInput }).select(
                '-_id -__v'
            );
            return res.json(getCharByName);
        }
        const getCharByName = await Character.find({ name : formattedInput }).select(
            '-_id -__v -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -affiliation -constellation'
        );
        res.json(getCharByName);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

const getRandomCharacter = async (req: Request, res: Response) => {
    try {
        const { infoSize } = req.query;
        if (infoSize == 'full') {
            const fullCharacterData = await Character.aggregate([
                { $sample: { size : 1 } }, 
                { $project : { __v: 0, _id: 0 } }
            ])
            return res.json(fullCharacterData);
        }
        const minimalCharacterData = await Character.aggregate([
            { $sample: { size : 1 } }, 
            { $project : { __v: 0, _id: 0, versionRelease: 0, birthday: 0, title: 0, 'images.card': 0, 'images.gacha': 0, wikiUrl: 0, affiliation: 0, constellation: 0 } }
        ])
            '-_id -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -__v -affiliation -constellation'
        return res.json(minimalCharacterData);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

const getAllCharacters = async (req: Request, res: Response) => {
    try {
        const { infoSize } = req.query;
        if (infoSize == 'full') {
            const fullCharacterData = await Character.find().select(
                '-__v -_id'
            )
            return res.json(fullCharacterData);
        }
        const minimalCharacterData = await Character.find().select(
            '-_id -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -__v -affiliation -constellation'
        )
        return res.json(minimalCharacterData);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

export { getMain, getAllCharacters, getCharacterByName, getRandomCharacter }