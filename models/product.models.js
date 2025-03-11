const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        default:""
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    brand: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        default: 0,
    },
    dimensions: {
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        depth: {
            type: Number,
            default: 0,
        },
    },
    warrantyInformation: { type: String, required: true, default: "" },
    shippingInformation: { type: String, required: true, default: "" },
    availabilityStatus: { type: String, required: true, default: "" },
    reviews: [
        {
            rating: {
                type: String,
                default: 0,
            },
            comment: {
                type: String,
                default: "",
            },
            date: {
                type: Date,
                default: Date.now,
            },
            reviewerName: {
                type: String,
                default: "",
            },
            reviewerEmail: {
                type: String,
                default: "test@email.com",
            },
        },
    ],
    returnPolicy: {
        type: String,
        required: true,
    },
    images: [{ type: String, required: true }],
    thumbnail: { type: String },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
