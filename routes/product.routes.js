const express = require("express");
const Product = require("../models/product.models");
const router = express.Router();

router
    .get("/", async (req, res) => {
        try {
            console.log("hi");
            const products = await Product.find();
            if (products) {
                res.status(200).json({
                    message: "Products fetched successfully",
                    data: products,
                    totalCount: products.length,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch products",
                error,
            });
        }
    })

    .post("/all", async (req, res) => {
        try {
            const newProducts = req.body;
            for (const product of newProducts) {
                await Product.create(product);
            }
            res.status(201).json({
                message: "Products inserted successfully.",
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch products",
                error,
            });
        }
    });
module.exports = router;
