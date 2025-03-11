const express = require("express");
const { initializeDB } = require("./db/db.connect");
const cors = require("cors");
require("dotenv").config();
const productSchema = require("./routes/product.routes");

const PORT = process.env.PORT;
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/products", productSchema);

app.listen(PORT, () => {
    initializeDB();
    console.log(`Server running on port: ${PORT}`);
});
