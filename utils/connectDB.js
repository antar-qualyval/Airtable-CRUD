const mongoose = require("mongoose");
let success = false;
require('dotenv').config({ path: "./.env.local" })

module.exports = async () => {
    const result = await mongoose.connect(process.env.DB_URI).then(() => {
        console.log("Database connection established");
        return success = !success
    }).catch(e => console.log(e))

    if (result) {
        return result
    }
}