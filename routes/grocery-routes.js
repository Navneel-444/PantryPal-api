const router = require("express").Router();
const groceryController = require("../controllers/grocery-controller")

router
    .route("/")
    .get(groceryController.getGroceryItems)
    .post(groceryController.addGroceryItem)


module.exports = router