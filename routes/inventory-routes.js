const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller")

router
    .route("/")
    .get(inventoryController.getInventoryItems)
    .post(inventoryController.addInventoryItem)
router
    .route("/:id")
    .delete(inventoryController.deleteInventoryItem)
    .put(inventoryController.editInventoryItem)

module.exports = router