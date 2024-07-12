import * as fs from "node:fs";
import * as path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BILL_PATH_FILE = path.resolve(__dirname, '../db/bills.json');
const CLIENT_PATH_FILE = path.resolve(__dirname, '../db/clients.json');

const getItems = async (req, res) => {
    try {
        const bills = fs.readFileSync(BILL_PATH_FILE, "utf-8");
        const clients = fs.readFileSync(CLIENT_PATH_FILE, "utf-8");

        const dataBills = JSON.parse(bills).splice(0, 2);
        const dataClients = JSON.parse(clients).splice(0, 2);

        const billsNumber = JSON.parse(bills).length;
        const initialValue = 0;
        const billsAmount = JSON.parse(bills).reduce(
            (accumulator, bill) => accumulator + bill.totalTTC, initialValue,
        )

        res.json({
            bills: dataBills,
            clients: dataClients,
            billsNumber,
            billsAmount
        })
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

export default {getItems}