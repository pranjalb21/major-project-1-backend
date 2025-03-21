const express = require("express");
const Address = require("../models/address.models");
const router = express.Router();

router
    .get("/all", async (req, res) => {
        try {
            const addresses = await Address.find();
            if (addresses) {
                res.status(200).json({
                    message: "Addresses fetched successfully.",
                    data: addresses,
                });
            } else {
                res.status(400).json({
                    message: "Unable to fetch address.",
                    error,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch addresses",
                error,
            });
        }
    })

    .post("/add", async (req, res) => {
        try {
            const { street, city, state, pin, isPrimary = false } = req.body;

            if (!street || !city || !state || !pin) {
                res.status(400).json({ error: "All fields are required." });
            } else {
                const newAddress = {
                    street,
                    city,
                    state,
                    pin,
                    isPrimary,
                };
                const addedAddress = await Address.create(newAddress);
                if (addedAddress) {
                    const allAddress = await Address.find();
                    res.status(201).json({
                        message: "Address added successfully.",
                        data: allAddress,
                    });
                } else {
                    res.status(400).json({
                        message: "Unable to add address.",
                        error,
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to add address.",
                error,
            });
        }
    })
    .post("/update/:addressId", async (req, res) => {
        try {
            const { addressId } = req.params;
            const { street, city, state, pin, isPrimary = false } = req.body;

            if (!street || !city || !state || !pin) {
                res.status(400).json({ error: "All fields are required." });
            } else {
                const existingAddress = await Address.findById(addressId);

                if (existingAddress) {
                    const newAddress = {
                        street,
                        city,
                        state,
                        pin,
                        isPrimary,
                    };
                    const updatedAddress = await Address.findByIdAndUpdate(
                        addressId,
                        newAddress,
                        { new: true }
                    );

                    if (updatedAddress) {
                        const newAddresses = await Address.find();
                        res.status(201).json({
                            message: "Address updated successfully.",
                            data: newAddresses,
                        });
                    } else {
                        res.status(400).json({
                            error: "Unable to add address.",
                        });
                    }
                } else {
                    res.status(404).json({
                        error: "Address not found.",
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                error: "Failed to update address.",
            });
        }
    })

    .post("/change/primaryAddress/:addressId", async (req, res) => {
        try {
            const { addressId } = req.params;
            if (!addressId) {
                res.status(404).json({
                    error: "Address not found.",
                });
            }

            const changeAllAddress = await Address.updateMany(
                { _id: { $ne: addressId } },
                { $set: { isPrimary: false } }
            );
            if (changeAllAddress) {
                const updatedPrimaryAddress = await Address.findByIdAndUpdate(
                    addressId,
                    { isPrimary: true }
                );
                if (updatedPrimaryAddress) {
                    const allAddress = await Address.find();
                    res.status(201).json({
                        message: "Primary address changed.",
                        data: allAddress,
                    });
                }
            } else {
                res.status(400).json({
                    error: "Unable to change primary address.",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Failed to update primary address.",
            });
        }
    })

    .delete("/delete/:addressId", async (req, res) => {
        try {
            const { addressId } = req.params;
            const existingAddress = await Address.findById(addressId);
            if (existingAddress) {
                const deletedAddress = await Address.findByIdAndDelete(
                    addressId
                );
                if (deletedAddress) {
                    res.status(200).json({
                        message: "Address deleted successfully.",
                        data: deletedAddress,
                    });
                } else {
                    res.status(400).json({
                        error: "Unable to delete address.",
                    });
                }
            } else {
                res.status(404).json({
                    error: "Address not found.",
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete address.",
                data: deletedAddress,
            });
        }
    });
module.exports = router;
