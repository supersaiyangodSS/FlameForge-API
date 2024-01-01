import { Router } from "express";
import { getMain, getAllCharacters, getCharacterByName, getRandomCharacter } from "../controllers/apiController.js";

const router = Router();

router.route('/')
        .get(getMain); // homepage 

router.route('/characters')
        .get(getAllCharacters) // all characters

router.route('/character')
        .get(getCharacterByName) // character by name

router.route('/character/random')
        .get(getRandomCharacter)

export default router;
