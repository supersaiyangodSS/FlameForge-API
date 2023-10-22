import { Document } from "mongoose";

export interface ICharacter extends Document {
    name: string,
    desc: string,
    rarity: number,
    vision: string,
    weapon: string,
    versionRelease: number,
    birthday: string,
    title: string[],
    constellation: string,
    region: string[],
    affiliation: string[],
    images: {
        profile: string,
        gacha: string,
    },
    model: string,
    wikiUrl: string,
    skin: {
        title: string,
        profile: string,
        gacha: string
    }
}