if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Planting = require("./models/plant.js"); 
const path = require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const Review = require("./models/review.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/plant";
const dbUrl = process.env.MONGODB_ATLAS;
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy =require("passport-local");
const Cart = require("./models/cart.js"); 
const User = require("./models/user.js");
const {isAdmin}=require("./middleware/admin.js");
const multer = require("multer");
const {storage}= require("./cloudConfig.js");
const upload = multer({storage});
 



console.log(isAdmin);


main().then(() =>{
    console.log("connected to DB");
})
.catch((e)=>{
    console.log(e);
})
async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret:"mysupersecretstring", 
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge:1000 * 60 * 60 * 24 * 3,
        httpOnly:true,
    }
     
}

app.use(session(sessionOptions));
app.use(flash());


//passport for login credentials
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//admin middleware
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});


//cart middleware
app.use(async (req,res,next)=>{
    res.locals.cartCount = 0;
    if(req.user){
        let user = await User.findById(req.user._id)
        .populate("cart");

        if(user.cart){
            res.locals.cartCount= user.cart.plants.length;
        }

    }
    next();
})



//flash session
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})





//admin route
app.get("/admin-test",
isAdmin, async(req,res)=>{
 let users = await User.countDocuments({});
    let plants = await Planting.countDocuments({});
    let carts = await Cart.countDocuments({});

    res.render("admin/dashboard.ejs",{
        users,
        plants,
        carts
    });

});


//login route

app.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
})

app.post("/signup", async(req,res)=>{
    try{
    let{username, email,password} = req.body;
    const newUser = new User({email,username});
   const registeredUser =  await User.register(newUser, password);
    req.flash("success", "Welcome to Florafetch");
    res.redirect("/plantings");
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
})

app.get("/login", (req,res)=>{
    res.render("users/login.ejs");
})

app.post("/login",passport.authenticate("local", 
    {failureRedirect:'/login', 
    failureFlash:true})
,async(req,res)=>{
req.flash("success", "Welcome to Florafetch! You are logged in!");
res.redirect("/plantings");
})


//logout
app.get("/logout", (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged Out!");
        res.redirect("/plantings");
    })
})


app.get("/", (req,res)=>{
    res.send("Hi I am root");
})

//index route
app.get("/plantings", async(req,res)=>{
    let allPlantings = await Planting.find({});
    res.render("./plantings/index.ejs", {allPlantings});
})


//new route
app.get("/plantings/new", async(req,res) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "you must be logged in!");
        return res.redirect("/login");
    }
    res.render("./plantings/new.ejs");
})

//create route
app.post("/plantings", 
    upload.single('planting[image]'),async(req,res,next)=>{
    try{
        console.log(req.file);
    const newPlanting = new Planting(req.body.planting);
    newPlanting.image = {
        url:req.file.path,
        filename:req.file.filename,
    };

    await newPlanting.save();
    req.flash("success", "New plant listing created!");
    res.redirect("/plantings");
    }catch(e){
        next(e);
    }
})

// CART SECTION

//add to cart route

app.post("/cart/:plantId", async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "Please login first!");
        return res.redirect("/login");
    }
    let{plantId} = req.params;
    let user = await User.findById(req.user._id).populate("cart");

    let cart = user.cart;

    //Create a cart if the user doesn;t have one yet
    if(!cart){
        cart = new Cart({
            user: user._id,
            plants:[],
        });
        user.cart = cart._id;
        await user.save();
    }
    if(!cart.plants.includes(plantId)){
        cart.plants.push(plantId);
        await cart.save();
    }
    req.flash("success", "Plant added to cart!");
    res.redirect("/plantings");
})


//view cart route
app.get("/cart", async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "Please login first!");
        return res.redirect("/login");
    }

    let user = await User.findById(req.user._id).populate({
        path:"cart",
        populate:{
            path:"plants",
        },
    });
    res.render("cart/index.ejs", {cart:user.cart});
})


//add to cart route
app.post("/cart/:id",async(req,res)=>{

})


//edit route
app.get("/plantings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const planting = await Planting.findById(id);
    res.render("./plantings/edit.ejs", {planting});
})


//update route
app.put("/plantings/:id", async (req,res)=>{
    let {id} = req.params;
    await Planting.findByIdAndUpdate(id, {...req.body.planting});
    res.redirect("/plantings");
})


//delete route
app.delete("/plantings/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedPlanting = await Planting.findByIdAndDelete(id);
    res.redirect("/plantings");
})


//show route
app.get("/plantings/:id", async(req,res)=>{
let {id} = req.params;
const planting = await Planting.findById(id).populate("reviews");
if(!planting){
    req.flash("error", "Plant you requested doest not exist!");
    return res.redirect("/plantings");
}
res.render("./plantings/show.ejs", {planting});
})

//reviews
//POST ROUTE
app.post("/plantings/:id/reviews", async (req, res) => {
    let planting = await Planting.findById(req.params.id);
    let newReview = new Review(req.body.review);

    await newReview.save();

    if (!planting.reviews) {
        planting.reviews = [];
    }

    planting.reviews.push(newReview._id);
    await planting.save();

    res.redirect(`/plantings/${planting._id}`);
});

//delete review route
app.delete("/plantings/:id/reviews/:reviewId", async(req,res)=>{
    let {id,reviewId} = req.params;
    await Planting.findByIdAndUpdate(id, {pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/plantings/${id}`);
})

// app.get("/testPlanting", async(req,res)=>{
// let samplePlanting = new Planting({
//     title:"Lavender Plant",
//     description:"A fragrant flowering okant known for its relaxing aroma",
//     price:1200,
//     location:"Lahore",
//     country:"Pakistan",
// });
// await samplePlanting.save();
// console.log("sample was saved");
// res.send("successfull testing");
// })

app.use((err,req,res,next)=>{
    console.log(err);
res.send("something went wrong");
});


app.listen(8000, ()=>{
    console.log("app is listening on this port 8000");
})



    