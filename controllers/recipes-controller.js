const knex = require("knex")(require("../knexfile"));


const addRecipe = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.image ||
        !req.body.recipe_ID ||
        !req.body.day ||
        !req.body.meal
    ) {
        res.status(500).send({ message: "All fields must be inputted" })
        return
    }
    try {
        const data = await knex("recipes").insert(req.body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({
            message: `Unable to add recipes: ${error}`
        });
    }
}

const getRecipes = async (req, res) => {
    try {
        const grocerylist = await knex("recipes").select(
            "id",
            "name",
            "image",
            "recipe_ID",
            "day",
            "meal",
        );
        res.json(grocerylist);
    } catch (e) {
        res.status(500).json({
            message: "unable to retrive recipes list"
        });
    }
}

const deleteRecipes = async (req, res) => {
    try {
        const rowDelete = await knex("recipes")
            .where({ id: req.params.id })
            .delete();
        if (rowDelete === 0) {
            return res
                .status(404)
                .json({ message: `recipes with ID: ${req.params.id} not found` })
        }
    } catch (e) {
        res.status(500).json({
            message: `unable to delete recipes: ${error}`
        })
    }
}

module.exports = {
    addRecipe,
    getRecipes,
    deleteRecipes
};