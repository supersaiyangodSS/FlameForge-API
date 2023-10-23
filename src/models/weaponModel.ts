import { Schema, model, Model } from 'mongoose';
import { IWeapon } from 'interfaces/weaponInterface';

const weaponSchema = new Schema<IWeapon>({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    rarity: {
        type: Number,
        required: true,
    },
    source: {
        type: [String],
        required: true,
    },
    base: {
        type: Number,
        required: true,
    },
    subStat: {
        type: String,
        required: true,
    },
    passive: {
        type: String,
        required: true,
    },
    versionRelease: {
        type: Number,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    family: {
        type: String,
        required: true
    },
    images: {
        icon: {
            type: String,
            required: true,
        },
        original: {
            type: String,
            required: true,
        },
        awakened: {
            type: String,
            required: true,
        }
    },
    wikiUrl: {
        type: String,
        required: true,
    }
});

const Weapon : Model<IWeapon> = model<IWeapon>('Weapon', weaponSchema);

export default Weapon;