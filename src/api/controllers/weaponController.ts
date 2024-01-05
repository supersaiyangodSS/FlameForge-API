import { Request, Response } from "express";
import Weapon from "../../models/weaponModel.js";
import { apiLogger } from "../../helpers/logger.js";

const getSingleWeapon = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const { name, infoSize } = req.query;

        if (name) {
            const nameAsString = name as string;
            const formattedName = nameAsString.charAt(0).toUpperCase() + nameAsString.slice(1);
            const formattedInput = formattedName.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
            const getWeaponByName = await Weapon.findOne({ name: formattedInput }).select(
                '-_id -__v -images.original -images.awakened -images.gacha -source -baseSubStat -affix -passive -versionRelease -region -wikiUrl'
            );
            if (infoSize == 'full') {
                const getWeaponByName = await Weapon.findOne({ name: formattedInput }).select(
                    '-_id -__v'
                );
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/weapon?name=${name}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                return res.send(getWeaponByName)
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/weapon?name=${name}`,
                method: 'GET',
                ip: ip
            })
            return res.send(getWeaponByName);
        }

        if (infoSize == 'full') {
            const fullWeaponData = await Weapon.aggregate([
                { $sample: { size: 1 } },
                { $project: { __v: 0, _id: 0 } }
            ])
            apiLogger.verbose('API call successful', {
                endpoint: `/api/weapon&infoSize=full`,
                method: 'GET',
                ip: ip
            })
            return res.json(fullWeaponData);
        }

        const minimalWeaponData = await Weapon.aggregate([
            { $sample: { size: 1 } },
            { $project: { __v: 0, _id: 0, '-images.original': 0, '-images.awakened': 0, '-images.gacha': 0, source: 0, baseSubStat: 0, affix: 0, passive: 0, versionRelease: 0, region: 0, wikiUrl: 0} }
        ])
        apiLogger.verbose('API call successful', {
            endpoint: `/api/weapon`,
            method: 'GET',
            ip: ip
        })
        return res.json(minimalWeaponData)

    } catch (error) {
        if (error.reason.code === 'ERR_ASSERTION') {
            return res.json({ error: 'invalid input value'})
        }
        apiLogger.error('API call error', {
            endpoint: `/api/weapon`,
            method: 'GET',
            ip: ip,
            error: error.message
        })
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

const getAllWeapons = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const { rarity, family, infoSize } = req.query;

        if (family) {
            const familyAsString = family as string;
            const formattedFamily = familyAsString.charAt(0).toUpperCase() + familyAsString.slice(1);
            const getWeaponByFamily = await Weapon.find({ family: formattedFamily }).select(
                '-_id -__v -images.original -images.awakened -images.gacha -source -baseSubStat -affix -passive -versionRelease -region -wikiUrl'
            );
            if (infoSize == 'full') {
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/weapons?family=${family}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                const getWeaponByFamily = await Weapon.find({ family: formattedFamily }).select(
                    '-_id -__v'
                );
                return res.send(getWeaponByFamily);
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/weapons?family=${family}`,
                method: 'GET',
                ip: ip
            });
            return res.send(getWeaponByFamily);
        }

        if (rarity) {
            if (infoSize == 'full') {
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/weapons?rarity=${rarity}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                const getWeaponByRarity = await Weapon.find({ rarity }).select(
                    '-_id -__v'
                );
                return res.send(getWeaponByRarity);
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/weapons?rarity=${rarity}`,
                method: 'GET',
                ip: ip
            });
            const getWeaponByRarity = await Weapon.find({ rarity }).select(
                '-_id -__v -images.original -images.awakened -images.gacha -source -baseSubStat -affix -passive -versionRelease -region -wikiUrl'
            );
            return res.send(getWeaponByRarity);
        }

        if (infoSize == 'full') {
            apiLogger.verbose('API call successful', {
                endpoint: `/api/weapons?infoSize=full`,
                method: 'GET',
                ip: ip
            })
            const fullWeaponData = await Weapon.find().select(
                '-__v -_id'
            )
            return res.json(fullWeaponData);
        }
        apiLogger.verbose('API call successful', {
            endpoint: `/api/weapons`,
            method: 'GET',
            ip: ip
        })
        const minimalWeaponData = await Weapon.find().select(
            '-_id -__v -images.original -images.awakened -images.gacha -source -baseSubStat -affix -passive -versionRelease -region -wikiUrl'
        )
        return res.json(minimalWeaponData);
    } catch (error) {
        console.log(error);
        if (error.reason.code === 'ERR_ASSERTION') {
            return res.json({ error: 'invalid input value'})
        }
        apiLogger.error('API call error', {
            endpoint: `/api/weapons`,
            method: 'GET',
            ip: ip,
            error: error.message
        })
        res.json({ error: 'Internal server error!' });
    }
}


export { getSingleWeapon, getAllWeapons };