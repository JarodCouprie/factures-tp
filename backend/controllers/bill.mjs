import * as fs from "node:fs";
import * as path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getItems = async (req, res) => {
    try {
        fs.readFile(path.resolve(__dirname, "../db/bill.json"), 'utf-8', (err, data) => {
            if (err) {
                return console.log(err)
            }
            res.send(data)
        });
    } catch (e) {
        res.send(e)
        console.log(e)
    }
}

const getItem = (req, res) => {
    res.send(`Hello facture ${req.params.id}`)
}

const createItem = (req, res) => {
    res.json(req.body);
}

const patchItem = (req, res) => {
    res.json(req.params.id)
}

const deleteItem = (req, res) => {
    res.json(req.params.id)
}

export default {getItems, getItem, createItem, patchItem, deleteItem}