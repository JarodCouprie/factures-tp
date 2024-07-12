import {Router} from "express";
import ctrl from "../controllers/dashboard.mjs";

const router = Router();

router.get('/', ctrl.getItems);

export default router;