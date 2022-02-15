const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const Schema = require("../models/SchemaModel");

// @route GET api/schema/getAll
// @desc Get all the schema(name , desc, did) from the schema db
// @access Public
router.get("/getAll", (req, res) => {
  Schema.find()
    .then((allSchemas) => {
      for (ind = 0; ind < allSchemas.length; ind++) {
        let newSchema = {
          name: allSchemas[ind].name,
          description: allSchemas[ind].description,
          did: allSchemas[ind].did,
        };
        allSchemas[ind] = newSchema;
      }
      res.status(200).json({ schemas: allSchemas });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
});

// @route POST api/schema/create
// @desc Store the schema in blockchain and database.
// @access Public
router.post("/create", (req, res) => {
  const schemaData = req.body;

  //making api call to main server and get schema DID.
  const schemaDid = "did:" + schemaData.name;

  //store schema (name , description , DID) in database
  Schema.findOne({ name: schemaData.name }).then((schema) => {
    if (schema) {
      return res
        .status(400)
        .json({ error: "Schema with the same name already exists" });
    } else {
      const newSchema = new Schema({
        name: schemaData.name,
        description: schemaData.description,
        did: schemaDid,
      });
      console.log(newSchema);

      newSchema
        .save()
        .then((data) => {
          console.log(data);
          res.status(200).json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ error: "Error in updating Schema DB" });
        });
    }
  });
});

module.exports = router;
