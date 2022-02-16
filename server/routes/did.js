const express = require("express");
const http = require("http");
const axios = require("axios");
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
  console.log("create request");
  const userData = {
    email: req.body.email,
    address: req.body.address,
    publicKey: req.body.publicKey,
  };

  //getting did from main server.
  const reqObject = {
    address: userData.address,
    publicKey: userData.publicKey,
  };
  const data = JSON.stringify(reqObject);

  const options = {
    hostname: "localhost",
    port: 8080,
    path: "/createDID",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const request = http
    .request(options, (response) => {
      console.log(`statusCode: ${response.statusCode}`);

      response.on("data", (d) => {
        const { did } = JSON.parse(d);
        User.findOne({ email: userData.email }).then((user) => {
          user.address = userData.address;
          user.publicKey = userData.publicKey;
          user.did = did;
          user
            .save()
            .then((user) => res.status(200).json(user))
            .catch((err) => {
              res.status(400).json({ error: "couldn't update user Details" });
              console.log(err);
            });
        });
      });
    })
    .on("error", (error) => {
      console.error(error);
    });
  request.write(data);
  request.end();
});

module.exports = router;
