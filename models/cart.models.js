const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    ref: "Product",
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
