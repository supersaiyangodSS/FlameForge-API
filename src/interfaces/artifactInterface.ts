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
            icon: string,
        },
        sands: {
            title: string,
            piece: string,
            icon: string,
        },
        plume: {
            title: string,
            piece: string,
            icon: string,
        },
        circlet: {
            title: string,
            piece: string,
            icon: string,
        },
        goblet: {
            title: string,
            piece: string,
            icon: string,
        }
    }
}