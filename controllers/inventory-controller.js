const knex = require("knex")(require("../knexfile"));

const addInventoryItem = async (req, res) => {
    if (
        !req.body.item ||
        !req.body.quantity
    ) {
        res.status(500).send({ message: "All fields must be inputted" })
        return
    }
    try {
        const data = await knex("inventory").insert(req.body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({
            message: `Unable to add inventory item: ${error}`
        });
    }
}

const getInventoryItems = async (req, res) => {
    try {
        const inventorylist = await knex("inventory").select(
            "id",
            "item",
            "quantity"
        );
        res.json(inventorylist);
    } catch (e) {
        res.status(500).json({
            message: "unable to retrive inventory list"
        });
    }
}

const deleteInventoryItem = async (req, res) => {
    try {
        const rowDelete = await knex("inventory")
            .where({ id: req.params.id })
            .delete();
        if (rowDelete === 0) {
            return res
                .status(404)
                .json({ message: `item with ID: ${req.params.id} not found` })
        }
    } catch (e) {
        res.status(500).json({
            message: `unable to delete inventory: ${error}`
        })
    }
}
const editInventoryItem = async (req, res) => {
    console.log(req.body)
    if (
        !req.body.id ||
        !req.body.item ||
        !req.body.quantity
    ) {
        return res.status(400).json({
            message: 'Please provide neccassary detials for the inventory item'
        });
    }
    try {
        const itemUpdate = await knex('inventory')
            .where({ id: req.params.id })
            .update(req.body)

        if (itemUpdate === 0) {
            return res.status(404).json({
                message: `inventory item with ID ${req.params.id} not found`,
            });
        }
        const updatedItem = await knex('inventory').where({
            id: req.params.id,
        });
        res.json(updatedItem[0]);
    } catch (e) {
        res.status(500).json({
            message: `Unable to update user ID:${req.params.id}`
        })
    }
}


module.exports = {
    addInventoryItem,
    getInventoryItems,
    deleteInventoryItem,
    editInventoryItem
};
