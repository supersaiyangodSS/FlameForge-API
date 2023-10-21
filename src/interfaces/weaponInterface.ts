import { Document } from "mongoose";

export interface IWeapon extends Document {
    name: string,
    desc: string,
    rarity: number,
    source: string,
    secondaryStat: string,
    passive: string,
    versionRelease: number,
    region: string,
    type: string,
    affiliation: string[],
    images: {
        icon: string,
        original: string,
        awakened: string,
    },
    wikiUrl: string
}