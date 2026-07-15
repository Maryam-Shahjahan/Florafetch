const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    plants: [
        {
            type:Schema.Types.ObjectId,
            ref:"Planting",
        },
    ],
});


module.exports = mongoose.model("Cart", cartSchema);