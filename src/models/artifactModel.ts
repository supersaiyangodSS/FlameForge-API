import { Schema, model, Model } from "mongoose";
import { IArtifact } from "interfaces/artifactInterface";

const artifactSchema = new Schema<IArtifact>({
    name: {
        type: String,
        required: true,
    },
    effect: {
        twoPc: {
            type: String,
            required: true,
        },
        fourPc: {
            type: String,
            required: true,
        }
    },
    fullSet: {
        flower: {
            title: {
                type: String,
                required: true,
            },
            piece: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
        },
        sands: {
            title: {
                type: String,
                required: true,
            },
            piece: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
        },
        plume: {
            title: {
                type: String,
                required: true,
            },
            piece: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
        },
        circlet: {
            title: {
                type: String,
                required: true,
            },
            piece: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
        },
        goblet: {
            title: {
                type: String,
                required: true,
            },
            piece: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
        },
    }
});

const Artifact : Model<IArtifact> = model<IArtifact>('Artifact', artifactSchema);

export default Artifact;
