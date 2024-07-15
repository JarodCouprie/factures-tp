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

        const dataBills = JSON.parse(bills).splice(0, 5);
        const dataClients = JSON.parse(clients).splice(0, 5);

        const billsNumber = JSON.parse(bills).filter(bill => {
            let currentDateYear = new Date().getFullYear();
            let billDateYear = new Date(bill.date).getFullYear();
            return currentDateYear === billDateYear;
        }).length;

        const initialValue = 0;
        const billsAmount = JSON.parse(bills).filter(bill => {
            let currentDateYear = new Date().getFullYear();
            let billDateYear = new Date(bill.date).getFullYear();
            return currentDateYear === billDateYear;
        }).reduce(
            (accumulator, bill) => accumulator + bill.totalTTC, initialValue,
        )

        const totalBills = JSON.parse(bills).length;

        const totalBillPreviousYear = JSON.parse(bills).filter(bill => {
            let previousDateYear = new Date().getFullYear() - 1;
            let billDateYear = new Date(bill.date).getFullYear();
            return billDateYear === previousDateYear && bill.paid !== bill.totalTTC;
        }).length / totalBills * 100;

        const totalBillPaid = JSON.parse(bills).filter(bill => bill.paid === bill.totalTTC).length / totalBills * 100;
        const totalBillBilled = JSON.parse(bills).filter(bill => {
            let currentDateYear = new Date().getFullYear();
            let billPreviousDateYear = new Date(bill.date).getFullYear();
            return currentDateYear === billPreviousDateYear && bill.paid !== bill.totalTTC;
        }).length / totalBills * 100;

        res.json({
            bills: dataBills,
            clients: dataClients,
            billsNumber,
            billsAmount,
            totalBillPaid,
            totalBillBilled,
            totalBillPreviousYear
        })
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

export default {getItems}