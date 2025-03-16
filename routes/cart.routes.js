const express = require("express");
const Cart = require("../models/cart.models");
const mongoose = require("mongoose");
const router = express.Router();

router
    // fetch all products from cart
    .get("/all", async (req, res) => {
        try {
            const cartData = await Cart.find().populate("productId");
            if (cartData) {
                res.status(200).json({
                    message: "Cart data fetched successfully.",
                    data: cartData,
                    totalCount: cartData.length,
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
    .post("/add", async (req, res) => {
        try {
            let cartData = req.body;

            // check if product id is provided in req body
            if (!cartData.productId) {
                res.status(400).json({ error: "Product ID is required." });
            }

            // fetch the product if exists or not
            const id = new mongoose.Types.ObjectId(cartData.productId);
            const existingCart = await Cart.findOne({
                productId: id,
            });

            // if product exists in the cart then update the product count
            if (existingCart) {
                existingCart.productCount += 1;
                const updatedCart = await existingCart.save();
                res.status(200).json({
                    message: "Product updated in Cart.",
                    data: updatedCart,
                });
            }
            // if product doesn't exist in the cart then add the product in the cart
            else {
                const cartToBeAdded = new Cart({
                    ...cartData,
                    productCount: 1,
                });
                const newCart = await cartToBeAdded.save();
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
            if(existingProduct){
                
            }
        } catch (error) {}
    });

module.exports = router;
