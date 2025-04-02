const express = require("express");
const Product = require("../models/product.models");
const router = express.Router();

router
    // Get product by category type
    .get("/", async (req, res) => {
        try {
            const {
                page = 1,
                category = "all",
                rating,
                sort,
                range = 2500,
                searchKeyword,
            } = req.query;

            // Build the query object
            const query = {};
            if (category !== "all") {
                query.category = category;
            }
            if (rating) {
                query.rating = { $gte: rating }; // Assuming you're filtering by minimum rating
            }
            if (range) {
                query.price = { $lte: range }; // Assuming `price` is the field you want to filter by
            }
            if (searchKeyword) {
                query.title = { $regex: searchKeyword, $options: "i" }; // Case-insensitive search
            }
            // Perform the query
            let products = await Product.find(query)
                .skip((page - 1) * process.env.ITEMSPERPAGE)
                .limit(+process.env.ITEMSPERPAGE); // Ensure limit is a number

            // Handle sorting
            if (sort) {
                const sortOrder = sort === "h2l" ? -1 : 1; // Handle descending order with a "-" prefix
                products = await Product.find(query)
                    .sort({ price: sortOrder })
                    .skip((page - 1) * process.env.ITEMSPERPAGE)
                    .limit(+process.env.ITEMSPERPAGE);
            }

            const totalCount = await Product.countDocuments(query);
            if (products) {
                res.status(200).json({
                    message: "Products fetched successfully",
                    data: products,
                    totalCount,
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
