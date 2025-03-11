const mongoose = require("mongoose");

require("dotenv").config();
const URI = process.env.MONGODBURI;

const initializeDB = async () => {
    await mongoose
        .connect(URI)
        .then(() => console.log("DB connected successfully."))
        .catch((err) => console.log("Error: ", err));
};
module.exports = { initializeDB };
