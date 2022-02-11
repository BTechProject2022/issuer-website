const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const bcrypt = require("bcryptjs");

const users = require("./routes/api/users");

const app = express();

//to create admin
const User = require("./models/UserSchema");

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());

const dbURL =  "mongodb://localhost:27017/mern-auth";

//connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI || dbURL,
    { useUnifiedTopology:true, useNewUrlParser: true }
    )
    .then(() => {

        User.findOne({email:"admin@admin.com"}).then(user=>{

            if(!user){
                const admin = new User({
                    name:"admin",
                    password:"admin",
                    email:"admin@admin.com",
                    isAdmin : true,
                });

                // Hash password before storing in database
                const rounds  = 10;
                bcrypt.genSalt(rounds, (err, salt) => {
                    bcrypt.hash(admin.password, salt, (err, hash) => {
                    if (err) throw err;
                    admin.password = hash;
                    admin
                        .save()
                        .catch(err => console.log(err));
                    });
                });
            }

        });
        console.log("Admin Details, email : admin@admin.com , password : admin");
        console.log("MongoDB successfully connected")
    })
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

if(process.env.NODE_ENV === 'production') {
   
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get('*',(req, res) => {
      res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
}


const port = process.env.PORT || 4000;

app.listen(port,()=>console.log(`Server up and running on port ${port}`));