const mongoose = require("mongoose")

mongoose.set("strictQuery", false);
const connentDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connentDB
}