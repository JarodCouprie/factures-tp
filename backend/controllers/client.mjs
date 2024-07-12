const getItems = (req, res) => {
    res.send("Liste des clients")
}

const getItem = (req, res) => {
    res.send(`Hello client ${req.params.id}`)
}

const createItem = (req, res) => {
    res.json(req.body);
}

export default {getItems, getItem, createItem}