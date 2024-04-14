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

module.exports = {
    addGroceryItem
};
