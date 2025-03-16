const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        productCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
