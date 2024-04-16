require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const groceryRoutes = require("./routes/grocery-routes");
const inventoryRoutes = require("./routes/inventory-routes");
const recipesRoutes = require("./routes/recipes_routes");


app.use(express.json());
app.use(cors());

app.use("/grocery", groceryRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/recipes", recipesRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`app listening on port http://localhost:${PORT}`));