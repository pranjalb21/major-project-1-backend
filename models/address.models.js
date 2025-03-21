const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true,
    },
    isPrimary: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
