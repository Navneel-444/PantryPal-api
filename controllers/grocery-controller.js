const knex = require("knex")(require("../knexfile"));

const addGroceryItem = async (req, res) => {
    if (
        !req.body.item ||
        !req.body.quantity
    ) {
        res.status(500).send({ message: "All fields must be inputted" })
        return
    }
    try {
        const data = await knex("grocery").insert(req.body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({
            message: `Unable to add grocery item: ${error}`
        });
    }
}

const getGroceryItems = async (req, res) => {
    try {
        const grocerylist = await knex("grocery").select(
            "id",
            "item",
            "quantity"
        );
        res.json(grocerylist);
    } catch (e) {
        res.status(500).json({
            message: "unable to retrive grocery list"
        });
    }
}

const deleteGroceryItem = async (req, res) => {
    try {
        const rowDelete = await knex("grocery")
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
const editGorgercyItem = async (req, res) => {
    console.log(req.body)
    if (
        !req.body.id ||
        !req.body.item ||
        !req.body.quantity
    ) {
        return res.status(400).json({
            message: 'Please provide neccassary detials for the grocery item'
        });
    }
    try {
        const itemUpdate = await knex('grocery')
            .where({ id: req.params.id })
            .update(req.body)

        if (itemUpdate === 0) {
            return res.status(404).json({
                message: `Grocery item with ID ${req.params.id} not found`,
            });
        }
        const updatedItem = await knex('grocery').where({
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
    addGroceryItem,
    getGroceryItems,
    deleteGroceryItem,
    editGorgercyItem
};
