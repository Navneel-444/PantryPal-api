const router = require("express").Router();

const recipesController = require("../controllers/recipes-controller")

router
    .route("/")
    .post(recipesController.addRecipe)
    .get(recipesController.getRecipes)
router
    .route("/:id")
    .delete(recipesController.deleteRecipes)

module.exports = router