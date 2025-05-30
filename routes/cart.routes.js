const express = require("express");
const Cart = require("../models/cart.models");
const mongoose = require("mongoose");
const router = express.Router();

router
    // fetch all products from cart
    .get("/all", async (req, res) => {
        try {
            const { page = 1 } = req.query;
            const cartData = await Cart.find().populate("productId");
            const totalCount = await Cart.countDocuments();
            if (cartData) {
                res.status(200).json({
                    message: "Cart data fetched successfully.",
                    data: cartData,
                    totalCount,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch cart data.",
                error,
            });
        }
    })

    // add or update product in the cart
    .post("/add/:productId", async (req, res) => {
        try {
            let { productId } = req.params;

            // check if product id is provided in req body
            if (!productId) {
                res.status(400).json({ error: "Product ID is required." });
            }

            // fetch the product if exists or not
            const id = new mongoose.Types.ObjectId(productId);
            const existingCart = await Cart.findOne({
                productId: id,
            });

            // if product exists in the cart then update the product count
            if (existingCart) {
                existingCart.productCount += 1;
                const updatedCart = await existingCart.save();
                await updatedCart.populate("productId");
                res.status(200).json({
                    message: "Product updated in Cart.",
                    data: updatedCart,
                });
            }
            // if product doesn't exist in the cart then add the product in the cart
            else {
                const cartToBeAdded = new Cart({
                    productId,
                    productCount: 1,
                });
                const newCart = await cartToBeAdded.save();
                await newCart.populate("productId");
                res.status(201).json({
                    message: "Product added in Cart.",
                    data: newCart,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to add cart data.",
                error,
            });
        }
    })

    // add product with quantity in the cart
    .post("/addQuantity/:productId", async (req, res) => {
        try {
            let { productId } = req.params;
            let { quantity } = req.body;

            // check if product id is provided in req body
            if (!productId) {
                res.status(400).json({ error: "Product ID is required." });
            }

            // fetch the product if exists or not
            const id = new mongoose.Types.ObjectId(productId);
            const existingCart = await Cart.findOne({
                productId: id,
            });

            // if product exists in the cart then update the product count
            if (existingCart) {
                existingCart.productCount += quantity;
                const updatedCart = await existingCart.save();
                await updatedCart.populate("productId");
                res.status(200).json({
                    message: "Product updated in Cart.",
                    data: updatedCart,
                });
            }
            // if product doesn't exist in the cart then add the product in the cart
            else {
                const cartToBeAdded = new Cart({
                    productId,
                    productCount: quantity,
                });
                const newCart = await cartToBeAdded.save();
                await newCart.populate("productId");
                res.status(201).json({
                    message: "Product added in Cart.",
                    data: newCart,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to add cart data.",
                error,
            });
        }
    })

    // delete product from cart
    .delete("/remove/:productId", async (req, res) => {
        try {
            const { productId } = req.params;
            const id = new mongoose.Types.ObjectId(productId);
            const existingProduct = await Cart.findOne({ productId: id });
            if (existingProduct) {
                if (existingProduct.productCount > 1) {
                    existingProduct.productCount -= 1;
                    await existingProduct.save();
                    const updatedExistingProduct =
                        await existingProduct.populate("productId");
                    res.status(200).json({
                        message: "Item removed.",
                        data: updatedExistingProduct,
                    });
                } else {
                    const deletedProduct = await existingProduct.deleteOne();
                    res.status(200).json({
                        message: "Product removed from cart.",
                        data: deletedProduct,
                    });
                }
            } else {
                res.status(404).json({ error: "Product not added to cart." });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to remove cart data.",
                error,
            });
        }
    })

    // delete product from cart
    .delete("/delete/:productId", async (req, res) => {
        try {
            const { productId } = req.params;
            const id = new mongoose.Types.ObjectId(productId);
            const existingProduct = await Cart.findOne({ productId: id });
            if (existingProduct) {
                const deletedProduct = await existingProduct.deleteOne();
                res.status(200).json({
                    message: "Product removed successfully.",
                    data: deletedProduct,
                });
            } else {
                res.status(404).json({ error: "Product not found." });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete cart data.",
                error,
            });
        }
    })
    .delete("/all", async (req, res) => {
        try {
            const emptyCart = await Cart.deleteMany();
            if (emptyCart.deletedCount > 0) {
                res.status(200).json({ message: "All cart items removed." });
            } else {
                res.status(400).json({
                    error: "No items found to delete in the cart.",
                });
            }
        } catch (error) {
            res.status(400).json({
                error: "Failed to delete all items in cart.",
            });
        }
    });

module.exports = router;
