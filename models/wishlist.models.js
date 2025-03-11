const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    ref: "Product",
});
const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
