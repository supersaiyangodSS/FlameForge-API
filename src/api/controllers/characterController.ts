import { Request, Response } from "express";
import Character from "../../models/characterModel.js";
import { apiLogger } from "../../helpers/logger.js";


const getSingleCharacter = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const { name, infoSize } = req.query;

        if (name) {
            const nameAsString = name as string;
            const formattedName = nameAsString.charAt(0).toUpperCase() + nameAsString.slice(1);
            const formattedInput = formattedName.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
            const getCharacterByName = await Character.findOne({ name: formattedInput }).select(
                '-_id -__v -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -affiliation -constellation'
            );
            if (infoSize == 'full') {
                const getCharacterByName = await Character.findOne({ name: formattedInput }).select(
                    '-_id -__v'
                );
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/character?name=${name}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                return res.send(getCharacterByName)
            }
            
            apiLogger.verbose('API call successful', {
                endpoint: `/api/character?name=${name}`,
                method: 'GET',
                ip: ip
            })
            return res.send(getCharacterByName);
        }

        if (infoSize == 'full') {
            const fullCharacterData = await Character.aggregate([
                { $sample: { size: 1 } },
                { $project: { __v: 0, _id: 0 } }
            ])
            const characterObj = fullCharacterData[0];
            apiLogger.verbose('API call successful', {
                endpoint: `/api/character&infoSize=full`,
                method: 'GET',
                ip: ip
            })
            return res.json(characterObj);
        }

        const minimalCharacterData = await Character.aggregate([
            { $sample: { size: 1 } },
            { $project: { __v: 0, _id: 0, versionRelease: 0, birthday: 0, title: 0, 'images.card': 0, 'images.gacha': 0, wikiUrl: 0, affiliation: 0, constellation: 0 } }
        ])
        const characterObj = minimalCharacterData[0];
        apiLogger.verbose('API call successful', {
            endpoint: `/api/character`,
            method: 'GET',
            ip: ip
        })
        return res.json(characterObj)

    } catch (error) {
        if (error.reason.code === 'ERR_ASSERTION') {
            return res.json({ error: 'invalid input value'})
        }
        apiLogger.error('API call error', {
            endpoint: `/api/character`,
            method: 'GET',
            ip: ip,
            error: error.message
        })
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

const getAllCharacters = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const { vision, region, rarity, weapon, infoSize } = req.query;

        if (vision) {
            const visionAsString = vision as string;
            const formattedVision = visionAsString.charAt(0).toUpperCase() + visionAsString.slice(1);
            const getCharacterByVision = await Character.find({ vision: formattedVision }).select(
                '-_id -__v -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -affiliation -constellation'
            );
            if (infoSize == 'full') {
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/characters?vision=${vision}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                const getCharacterByVision = await Character.find({ vision: formattedVision }).select(
                    '-_id -__v'
                );
                return res.send(getCharacterByVision);
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/characters?vision=${vision}`,
                method: 'GET',
                ip: ip
            })
            return res.send(getCharacterByVision);
        }

        if (region) {
            const regionAsString = region as string;
            const formattedRegion = regionAsString.charAt(0).toUpperCase() + regionAsString.slice(1);
            const formattedInput = formattedRegion.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());

            if (infoSize == 'full') {
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/characters?region=${region}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                const getCharacterByRegion = await Character.find({ region: { $in: [formattedInput] } }).select(
                    '-_id -__v'
                );
                return res.send(getCharacterByRegion);
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/characters?region=${region}`,
                method: 'GET',
                ip: ip
            })
            const getCharacterByRegion = await Character.find({ region: { $in: [formattedInput] } }).select(
                '-_id -__v -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -affiliation -constellation'
            );
            return res.send(getCharacterByRegion);
        }

        if (rarity) {
            if (infoSize == 'full') {
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/characters?rarity=${rarity}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                const getCharacterByRarity = await Character.find({ rarity: rarity }).select(
                    '-_id -__v'
                );
                return res.send(getCharacterByRarity);
            }            
            apiLogger.verbose('API call successful', {
                endpoint: `/api/characters?rarity=${rarity}`,
                method: 'GET',
                ip: ip
            })
            const getCharacterByRarity = await Character.find({ rarity: rarity }).select(
                '-_id -__v -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -affiliation -constellation'
            );
            return res.send(getCharacterByRarity);
        }

        if (weapon) {
            const weaponAsString = weapon as string;
            const formattedWeapon = weaponAsString.charAt(0).toUpperCase() + weaponAsString.slice(1);

            if (infoSize == 'full') {                
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/characters?weapon=${weapon}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                const getCharacterByWeaponType = await Character.find({ weapon: formattedWeapon }).select(
                    '-_id -__v'
                );
                return res.send(getCharacterByWeaponType);
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/characters?weapon=${weapon}&infoSize=full`,
                method: 'GET',
                ip: ip
            })
            const getCharacterByWeaponType = await Character.find({ weapon: formattedWeapon }).select(
                '-_id -__v -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -affiliation -constellation'
            );
            return res.send(getCharacterByWeaponType);

        }
        if (infoSize == 'full') {
            apiLogger.verbose('API call successful', {
                endpoint: `/api/characters?infoSize=full`,
                method: 'GET',
                ip: ip
            })
            const fullCharacterData = await Character.find().select(
                '-__v -_id'
            )
            return res.json(fullCharacterData);
        }
        apiLogger.verbose('API call successful', {
            endpoint: `/api/characters`,
            method: 'GET',
            ip: ip
        })
        const minimalCharacterData = await Character.find().select(
            '-_id -versionRelease -birthday -title -images.card -images.gacha -wikiUrl -__v -affiliation -constellation'
        )

        return res.json(minimalCharacterData);
    } catch (error) {
        if (error.reason.code === 'ERR_ASSERTION') {
            return res.json({ error: 'invalid input value'})
        }
        console.log(error);
        apiLogger.error('API call error', {
            endpoint: `/api/characters`,
            method: 'GET',
            ip: ip,
            error: error.message
        })
        res.json({ error: 'Internal server error!' });
    }
}

export { getAllCharacters, getSingleCharacter }