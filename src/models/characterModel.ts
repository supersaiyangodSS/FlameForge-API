import mongoose, { Schema, model, Model } from 'mongoose';
import { ICharacter } from 'interfaces/characterInterface';
import { promisify } from 'util';

const characterSchema = new Schema<ICharacter>({
    name : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true,
    },
    rarity : {
        type: Number,
        required: true,
    },
    vision : {
        type: String,
        required: true,
    },
    weapon: {
        // type: Schema.Types.ObjectId,
        // ref: 'Weapon'
        type: String,
        required: true,
    },
    versionRelease : {
        type: Number,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    title : {
        type: [String],
        required: true,
    },
    constellation : {
        type: String,
        required: true,
    },
    region : {
        type: [String],
        required: true,
    },
    affiliation: {
        type: [String],
        required: true,
    },
    images : {
        profile: {
            type: String,
            required: true,
        },
        gacha : {
            type : String,
            required: true,
        },
    },
    model : {
        type: String,
        required: true,
    },
    wikiUrl : {
        type: String,
        required: true,
    }
});

const Character: Model<ICharacter> = model<ICharacter>('Character', characterSchema);
 
// characterSchema.pre('save', async function (next) {
//     const Character = this.constructor as Model<ICharacter & Document>;
//     if (!this.isNew) {
//         return next();
//     }
//     try {
//         const count = await Character.countDocuments();
//         this.id = count + 1;
//         next();
//     } catch (err: any) {
//         next(err);
//     }
// });

export default Character;
