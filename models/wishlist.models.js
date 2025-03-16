const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
    { timestamps: true }
);
const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
