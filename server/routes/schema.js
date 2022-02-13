const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const Schema = require("../models/SchemaModel");

// @route POST api/schema/create
// @desc Store the schema in blockchain and database.
// @access Public
router.post("/create", (req, res) => {

    const schemaData = req.body;

    //making api call to main server and get schema hexcode.
    const schemaHex = "hexcode";
    //store schema (name , description , hexcode) in database
    Schema.findOne({name:schemaData.name}).then(schema=>{
        if(schema){
            return res.status(400).json({error:"Schema with the same name already exists"});
        } else{
            const newSchema = new Schema({
                name : schemaData.name,
                description : schemaData.description,
                hexcode : schemaHex
            });
            console.log(newSchema);

            newSchema
                .save()
                .then(data =>{
                    console.log(data);
                    res.status(200).json(data)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({error : "Error in updating Schema DB"});
                });
        }
    });
});

module.exports = router;