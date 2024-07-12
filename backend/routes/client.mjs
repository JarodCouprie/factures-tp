import {Router} from "express";

const router = Router();

import ctrl from '../controllers/client.mjs'

router.get('/', ctrl.getItems);

router.get('/:id', ctrl.getItem)

router.post("/", ctrl.createItem)

export default router;