import { Document } from "mongoose";

export interface IArtifact extends Document {
    name: string,
    effect: {
        twoPc: string,
        fourPc: string,
    },
    fullSet: {
        flower: {
            title: string,
            piece: string,
            desc: string,
            images: string,
        },
        sands: {
            title: string,
            piece: string,
            desc: string,
            image: string,
        },
        plume: {
            title: string,
            piece: string,
            desc: string,
            image: string,
        },
        circlet: {
            title: string,
            piece: string,
            desc: string,
            image: string,
        },
        goblet: {
            title: string,
            piece: string,
            desc: string,
            image: string,
        }
    }
}