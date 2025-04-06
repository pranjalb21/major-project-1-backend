const express = require("express");
const { initializeDB } = require("./db/db.connect");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const wishlistRouter = require("./routes/wishlist.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");

const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => res.status(200).json({ message: "Hi" }));

initializeDB();
app.listen(PORT, async () => {
    console.log(`Server running on port: ${PORT}`);
});
