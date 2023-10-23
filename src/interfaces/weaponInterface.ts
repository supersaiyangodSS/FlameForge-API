import { Document } from "mongoose";

export interface IWeapon extends Document {
    name: string,
    desc: string,
    rarity: number,
    source: string[],
    base: number,
    subStat: string,
    passive: string,
    versionRelease: number,
    region: string,
    family: string,
    images: {
        icon: string,
        original: string,
        awakened: string,
    },
    wikiUrl: string
}