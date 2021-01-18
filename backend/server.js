const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
const session = require("express-session");
const cors = require("cors");
const e = require("express");
const ejs = require("ejs");
const flash = require("connect-flash");
const bodyParser = require("body-parser");

var https_redirect = function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] != 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};

app.use(https_redirect);
app.use(flash());

const PORT = process.env.PORT || 1000

const connectionString = "mongodb+srv://crystal_ball:oUjlptAi4b6d@cluster0.nj3ox.mongodb.net/streammeters";
mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const meterSchema = new mongoose.Schema({
  dateRec: String,
  originalSN: String,
  manYear: String,
  dateAdded: String,
  dateStamped: String,
  faceToFace: String,
  electricals: String,
  meterType: String,
  oldModel: String,
  flangeSize: String,
  flangeType: String,
  newModel: String,
  refurbSN: String,
  repairCat: String,
  itronPO: String,
  invNo: String,
  servReport: String
});

const dformSchema = new mongoose.Schema({
  dateRec: String,
  siteName: String,
  actionTaken: String,
  mprnRef: String,
});

//Configure session
app.use(session({
  secret: "my little secret",
  resave: false,
  saveUninitialized: false
}));

//Use passport 
app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose);

const Meter = new mongoose.model("Meter",meterSchema);

const DForm = new mongoose.model("Dform",dformSchema);

const User = new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//parsing inbound data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Configure bodyparser
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.get("/",function(req,res){
  //User.register(new User({username: 'calum@jwfltd.com',resetPasswordToken: '',resetPasswordExpires: new Date()}),'abcdefg',function(err){
  //console.log('error while user register!',err);
  //   });
  //console.log("user registered");
 const errors = req.flash().error || [];

  res.render('login.ejs',{errors});
});


app.post("/login",(req,res,next)=>{
  var response = 500;
  passport.authenticate("local",function(err,user,info){
    if (err){
      console.log(err);
      response = 500;
    }
    if (!user){
      response=204
    }else{
      req.logIn(user,function(err){
        if (err) {
          console.log(err);
          response=500;
        }else{
          response=200;
        }
      });
    }
    res.sendStatus(response);
  })(req,res);
});

 
app.get("/save",function(req,res){
  res.send("server is working");
})


app.post("/serverinventory",function(req,res){
  var status = 500;
  if (req.isAuthenticated()){
    mongoose.connection.dropCollection("meters");
    const meters = req.body;
    for (var i=0;i<meters.length;i++){
      const meterObject = new Meter(meters[i])
      meterObject.save();
    }
    status = 200;
  }
  else{
    status = 204;
  }
  res.sendStatus(status);
});

app.get("/serverinventory",function(req,res){
  if (req.isAuthenticated()){
    var query = Meter.find().select('-_id dateRec originalSN manYear dateAdded dateStamped faceToFace electricals meterType oldModel flangeSize flangeType newModel refurbSN repairCat itronPO invNo servReport');
    query.exec(function(err,result){
    res.send(result);
    });
  }
  else{
    res.sendStatus(204);
  }
});

app.post("/serverdforms",function(req,res){
  var status = 500;
  if (req.isAuthenticated()){
    mongoose.connection.dropCollection("dforms");
    const dforms = req.body;
    for (var i=0;i<dforms.length;i++){
      const dformObject = new DForm(dforms[i])
      dformObject.save();
    }
    status = 200;
  }
  else{
    status = 204;
  }
  res.sendStatus(status);
});

app.get("/serverdforms",function(req,res){
  if (req.isAuthenticated()){
    var query = DForm.find().select('-_id dateRec siteName actionTaken mprnRef');
    query.exec(function(err,result){
    res.send(result);
    });
  }
  else{
    res.sendStatus(204);
  }
});



app.get("/isauthenticated",function(req,res){
  var status = 500;
  if (req.isAuthenticated()){
    status = 200;
  }else{
    status = 204;
  }
  res.sendStatus(status);
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
