const express = require("express");
const mongoose = require("mongoose");
const Wishlist = require("../models/wishlist.models");
const router = express.Router();

router
    // fetch all products from wishlist
    .get("/all", async (req, res) => {
        try {
            const { page = 1 } = req.query;
            const wishlistData = await Wishlist.find().populate("productId");
            const totalCount = await Wishlist.find().countDocuments();
            if (wishlistData) {
                res.status(200).json({
                    message: "Wishlist data fetched successfully.",
                    data: wishlistData,
                    totalCount,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch wishlist data.",
                error,
            });
        }
    })

    // Add product in the wishlist
    .post("/add/:productId", async (req, res) => {
        try {
            let { productId } = req.params;

            // check if product id is provided in req body
            if (!productId) {
                res.status(400).json({ error: "Product ID is required." });
            }

            // check if the product already exists in wishlist or not
            const id = new mongoose.Types.ObjectId(productId);
            const existingWishlist = await Wishlist.findOne({
                productId: id,
            });
            if (existingWishlist) {
                res.status(404).json({
                    error: "Product already added into wishlist.",
                });
            } else {
                // Add the product into wishlist
                const newWishlistProduct = await Wishlist.create({ productId });
                if (newWishlistProduct) {
                    const newWishlist = await Wishlist.findById(
                        newWishlistProduct._id
                    ).populate("productId");
                    res.status(201).json({
                        message: "Products added to wishlist.",
                        data: newWishlist,
                    });
                } else {
                    res.status(400).json({
                        error: "Failed to add product into wishlist.",
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to add wishlist data.",
                error,
            });
        }
    })

    // delete product from wishlist
    .delete("/remove/:productId", async (req, res) => {
        try {
            const { productId } = req.params;
            // check if product id is provided in req body
            if (!productId) {
                res.status(400).json({ error: "Product ID is required." });
            }

            // check if the product already exists in wishlist or not
            const id = new mongoose.Types.ObjectId(productId);
            const existingProduct = await Wishlist.findOne({ productId: id });
            if (existingProduct) {
                const deletedProduct = await Wishlist.findOneAndDelete({
                    productId,
                });
                res.status(200).json({
                    message: "Product removed from wishlist.",
                    data: deletedProduct,
                });
            } else {
                res.status(400).json({
                    error: "Product not in wishlist.",
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete wishlist data.",
                error,
            });
        }
    });

module.exports = router;
