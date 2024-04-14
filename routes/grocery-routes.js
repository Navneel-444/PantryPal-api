const router = require("express").Router();
const groceryController = require("../controllers/grocery-controller")

router
    .route("/")
    .post(groceryController.addGroceryItem)

module.exports = router