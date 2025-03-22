const express = require("express");
const Order = require("../models/order.models");
const router = express.Router();

router
    .get("/all", async (req, res) => {
        try {
            const orders = await Order.find();
            if (orders) {
                res.status(200).json({
                    message: "Orders fetched successfully.",
                    data: orders,
                });
            } else {
                res.status(400).json({
                    error: "Unable to fetch orders.",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch the orders." });
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const orders = await Order.findOne({ orderId: id }).populate(
                "items.productId"
            );
            if (orders) {
                res.status(200).json({
                    message: "Orders fetched successfully.",
                    data: orders,
                });
            } else {
                res.status(400).json({
                    error: "Unable to fetch orders.",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch the orders." });
        }
    })

    .post("/add", async (req, res) => {
        try {
            const { items, totalOrderPrice, shippingAddress } = req.body;
            if (!items || !totalOrderPrice || !shippingAddress) {
                res.status(400).json({ message: "All details are required." });
            }

            const timestamp = Date.now();
            const uniqueNumber = timestamp % 100000;
            const newOrder = {
                orderId: uniqueNumber,
                items,
                totalOrderPrice,
                shippingAddress,
            };
            const postedOrder = await Order.create(newOrder);
            if (postedOrder) {
                res.status(201).json({
                    message: "Order created successfully.",
                    data: postedOrder,
                });
            } else {
                res.status(400).json({
                    error: "Unable to add order.",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Failed to add order.",
            });
        }
    });
module.exports = router;
