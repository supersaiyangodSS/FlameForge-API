import { Router } from "express";
import { getMain } from "../controllers/apiController.js";
import { getSingleCharacter, getAllCharacters } from "../controllers/characterController.js";
import { getAllWeapons, getSingleWeapon } from "../controllers/weaponController.js";
import { getAllArtifacts, getSingleArtifact } from "../controllers/artifactController.js";
import { apiLimiter } from "../../helpers/limiter.js";

const router = Router();

router.route('/')
        .get(apiLimiter, getMain)

router.route('/characters')
        .get(apiLimiter, getAllCharacters)

router.route('/character')
        .get(apiLimiter, getSingleCharacter)

router.route('/weapon')
        .get(apiLimiter, getSingleWeapon)

router.route('/weapons')
        .get(apiLimiter, getAllWeapons)

router.route('/artifact')
        .get(apiLimiter, getSingleArtifact)

router.route('/artifacts')
        .get(apiLimiter, getAllArtifacts)

export default router;
