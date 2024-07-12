import {Router} from "express";

const router = Router();

import ctrl from '../controllers/bill.mjs'

router.get('/', ctrl.getItems);

router.get('/:id', ctrl.getItem)

router.post("/", ctrl.createItem)

router.patch("/:id", ctrl.patchItem)

router.delete("/:id", ctrl.deleteItem)

export default router;