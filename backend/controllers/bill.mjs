import * as fs from "node:fs";
import * as path from "path";
import {fileURLToPath} from 'url';
import {v4 as uuid} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PATH_FILE = path.resolve(__dirname, '../db/bills.json')

const getItems = async (req, res) => {
    try {
        const data = fs.readFileSync(PATH_FILE)
        res.send(data)
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const getItem = (req, res) => {
    try {
        const data = fs.readFileSync(PATH_FILE)
        const items = JSON.parse(data)
        const item = items.find(item => item.id == req.params.id)
        if (item) {
            res.json(item)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const createItem = (req, res) => {
    try {
        const data = fs.readFileSync(PATH_FILE);
        const items = JSON.parse(data);
        const newBill = {...req.body, id: uuid()}
        items.push(newBill);

        fs.writeFileSync(PATH_FILE, JSON.stringify(items))
        res.json(newBill);
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const patchItem = (req, res) => {
    try {
        const data = fs.readFileSync(PATH_FILE);

        const items = JSON.parse(data);

        const index = items.findIndex(item => item.id == req.params.id)
        items[index] = {...items[index], ...req.body}

        fs.writeFileSync(PATH_FILE, JSON.stringify(items))
        res.json(items[index]);
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const deleteItem = (req, res) => {
    try {
        const data = fs.readFileSync(PATH_FILE)
        let items = JSON.parse(data)

        items = items.filter(item => item.id != req.params.id)

        fs.writeFileSync(PATH_FILE, JSON.stringify(items))
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

export default {getItems, getItem, createItem, patchItem, deleteItem}