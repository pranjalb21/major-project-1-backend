const express = require("express");
const Product = require("../models/product.models");
const router = express.Router();

router
    // Get product by category type
    .get("/category/:category", async (req, res) => {
        try {
            const { category } = req.params;
            const products =
                category === "all"
                    ? await Product.find()
                    : await Product.find({ category: category });
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
    .get("/id/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (product) {
                res.status(200).json({
                    message: "Product fetched successfully",
                    data: product,
                    totalCount: product.length,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch product",
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
