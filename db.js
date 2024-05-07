const mongoose = require('mongoose')

module.exports = () => {
    try {
        mongoose.connect(process.env.DB)
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error);
        console.log("Failed to connect database")
    }
};