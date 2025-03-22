const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: Number,
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                productCount: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                cost: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalOrderPrice: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
