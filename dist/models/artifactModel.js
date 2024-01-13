import { Schema, model } from "mongoose";
const artifactSchema = new Schema({
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
const Artifact = model('Artifact', artifactSchema);
export default Artifact;
//# sourceMappingURL=artifactModel.js.map