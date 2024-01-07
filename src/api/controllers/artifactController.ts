import { Request, Response } from "express";
import Artifact from "../../models/artifactModel.js";
import { apiLogger } from "../../helpers/logger.js";

const getSingleArtifact = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const { name, infoSize } = req.query;

        if (name) {
            const nameAsString = name as string;
            const wordsToExclude = ['of', 'the', 'a'];
            const formattedName = nameAsString
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (match) => match.toUpperCase());

            const formattedInput = formattedName.replace(
                new RegExp(`\\b(${wordsToExclude.join('|')})\\b`, 'ig'),
                (match) => match.toLowerCase()
            );
            const getArtifactByName = await Artifact.findOne({ name: formattedInput }).select(
                '-_id -__v -fullSet.sands -fullSet.plume -fullSet.circlet -fullSet.goblet -fullSet.flower.piece -fullSet.flower.title'
            );
            if (infoSize == 'full') {
                const getArtifactByName = await Artifact.findOne({ name: formattedInput }).select(
                    '-_id -__v'
                );
                apiLogger.verbose('API call successful', {
                    endpoint: `/api/artifact?name=${name}&infoSize=full`,
                    method: 'GET',
                    ip: ip
                })
                return res.send(getArtifactByName)
            }
            apiLogger.verbose('API call successful', {
                endpoint: `/api/artifact?name=${name}`,
                method: 'GET',
                ip: ip
            })
            return res.send(getArtifactByName);
        }

        if (infoSize == 'full') {
            const fullArtifactData = await Artifact.aggregate([
                { $sample: { size: 1 } },
                { $project: { __v: 0, _id: 0 } }
            ])
            const artifactObj = fullArtifactData[0];
            apiLogger.verbose('API call successful', {
                endpoint: `/api/artifact&infoSize=full`,
                method: 'GET',
                ip: ip
            })
            return res.json(artifactObj);
        }

        const minimalArtifactData = await Artifact.aggregate([
            { $sample: { size: 1 } },
            { $project: { __v: 0, _id: 0, 'fullSet.flower.title': 0, 'fullSet.flower.piece': 0, 'fullSet.sands': 0, 'fullSet.plume': 0, 'fullSet.circlet': 0, 'fullSet.goblet': 0 } }
        ])
        const artifactObj = minimalArtifactData[0];
        apiLogger.verbose('API call successful', {
            endpoint: `/api/artifact`,
            method: 'GET',
            ip: ip
        })
        return res.json(artifactObj)

    } catch (error) {
        if (error.reason.code === 'ERR_ASSERTION') {
            return res.json({ error: 'invalid input value' })
        }
        apiLogger.error('API call error', {
            endpoint: `/api/artifact`,
            method: 'GET',
            ip: ip,
            error: error.message
        })
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

const getAllArtifacts = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const { infoSize } = req.query;

        if (infoSize == 'full') {
            const fullArtifactData = await Artifact.find().select(
                '-__v -_id'
            )
            apiLogger.verbose('API call successful', {
                endpoint: `/api/artifacts&infoSize=full`,
                method: 'GET',
                ip: ip
            })
            return res.json(fullArtifactData);
        }

        const minimalArtifactData = await Artifact.find().select(
            '-_id -__v -fullSet.sands -fullSet.plume -fullSet.circlet -fullSet.goblet -fullSet.flower.piece -fullSet.flower.title'
        )
        apiLogger.verbose('API call successful', {
            endpoint: `/api/artifacts`,
            method: 'GET',
            ip: ip
        })
        return res.json(minimalArtifactData)
    } catch (error) {
        if (error.reason.code === 'ERR_ASSERTION') {
            return res.json({ error: 'invalid input value' })
        }
        apiLogger.error('API call error', {
            endpoint: `/api/artifact`,
            method: 'GET',
            ip: ip,
            error: error.message
        })
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}


export { getSingleArtifact, getAllArtifacts };