const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const plantingSchema = new Schema({
    title:
    {type:String,
     required:true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        filename:String,
        url:String
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    reviews:{
        type:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    default:[]
}
});

plantingSchema.post("findOneAndDelete", async(planting)=>{
    if(planting){
   await Review.deleteMany({_id: {$in: planting.reviews}});
    }

})


const Planting = mongoose.model("Planting", plantingSchema);

module.exports = Planting;
