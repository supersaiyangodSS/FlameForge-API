import { Schema, model } from 'mongoose';
const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    rarity: {
        type: Number,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    weapon: {
        // type: Schema.Types.ObjectId,
        // ref: 'Weapon'
        type: String,
        required: true,
    },
    versionRelease: {
        type: Number,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    title: {
        type: [String],
        required: true,
    },
    constellation: {
        type: String,
        required: true,
    },
    region: {
        type: [String],
        required: true,
    },
    affiliation: {
        type: [String],
        required: true,
    },
    images: {
        profile: {
            type: String,
            required: true,
        },
        gacha: {
            type: String,
            required: true,
        },
        card: {
            type: String,
            required: true,
        },
    },
    wikiUrl: {
        type: String,
        required: true,
    },
    skin: {
        title: {
            type: String,
        },
        profile: {
            type: String,
        },
        gacha: {
            type: String,
        }
    }
});
const Character = model('Character', characterSchema);
export default Character;
//# sourceMappingURL=characterModel.js.map