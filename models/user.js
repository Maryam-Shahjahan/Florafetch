const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    cart:{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);