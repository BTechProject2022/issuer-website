const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
//const validateRegisterInput = require("../validation/register");
//const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/UserModel");

// @route POST api/did/create
// @desc Store address and public key for user and create DID.
// @access Public
router.post("/create", (req, res) => {

    const userData = {
        email : req.body.email,
        address : req.body.address,
        publicKey : req.body.publicKey,
    }

    //getting did from main server.
    const did = userData.address + userData.publicKey;

    //udpate user details
    User.findOne({email:userData.email}).then(user=>{
        user.address = userData.address;
        user.publicKey = userData.publicKey;
        user.did = did;
        user.save()
            .then(user => res.status(200).json(user))
            .catch(err => {
                res.status(400).json({error:"couldn't update user Details"});
                console.log(err)
            });
    });

});

module.exports = router;