import express from "express";
import bills from "./routes/bill.mjs";
import clients from "./routes/client.mjs";
import cors from 'cors';

const app = express()
const port = 3000


app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use("/bills", bills)
app.use("/clients", clients)

app.get('/', (req, res) => {
    res.send('Hi mom!')
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})