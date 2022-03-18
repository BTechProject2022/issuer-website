const express = require("express");
const router = express.Router();
const http = require("http");
const objectHash = require("object-hash");
const secp = require("@noble/secp256k1");

// Load User model
const Schema = require("../models/SchemaModel");
const User = require("../models/UserModel");

require("dotenv").config();
const LOCAL_IP = process.env.LOCAL_IP;
const MAIN_BACKEND_PORT = process.env.MAIN_BACKEND_PORT;

// @route GET api/credential/create
// @desc create the cred , call main server and send did to client
// @access Public
router.post("/create", (req, res) => {
  const reqObject = {
    schemaDid: req.body.schemaDid,
    userDid: req.body.userDid,
    studentId: req.body.studentId,
  };
  Schema.findOne({ did: reqObject.schemaDid })
    .then((schema) => {
      if (!schema) {
        res.status(400).json({ error: "schema doesn't exists" });
      } else {
        console.log(reqObject.studentId);
        User.findOne({ studentId: reqObject.studentId })
          .then((user) => {
            if (!user) {
              res.status(400).json({ error: "user doesn't exists" });
            } else {
              User.findOne({ email: "admin@admin.com" })
                .then(async (admin) => {
                  if (!admin) {
                    res.status(400).json({ error: "admin doesn't exists" });
                  } else {
                    const credentialSubject = {
                      id: user.studentId,
                      emailAddress: user.email,
                      name: user.name,
                      collegeName: "VJTI",
                      universityName: "Mumbai University",
                      branch: "Information Technology",
                      degree: "BTech",
                      CPI: "9.0",
                      birthDate: "01/01/01",
                      collegeID: user.studentId,
                      graduationDate: "20/05/2022",
                      address:
                        "VJTI Hostel,VJTI College, Five Garden Circle,Matunga-40001",
                      guardian: "Parent Name",
                    };
                    const hash = objectHash(credentialSubject);
                    const signHash = await secp.sign(hash, admin.privateKey, {
                      canonical: true,
                    });
                    const sign = secp.Signature.fromDER(signHash);
                    let verifiableCredential = {
                      "@context": [
                        "https://www.w3.org/2018/credentials/v1",
                        "https://www.w3.org/2018/credentials/examples/v1",
                      ],
                      id: reqObject.schemaDid,
                      type: ["VerifiableCredential", "TranscriptCredential"],
                      issuerDID: admin.did,
                      ownerDID: reqObject.userDid,
                      issuanceDate: new Date().toISOString(),
                      credentialSubject: credentialSubject,
                      proof: {
                        type: "RsaSignature2018",
                        created: new Date().toISOString(),
                        proofPurpose: "assertionMethod",
                        verificationMethod: admin.did,
                        sign: sign.toCompactHex(),
                        hash: hash,
                      },
                    };
                    const data = JSON.stringify(verifiableCredential);

                    const options = {
                      hostname: LOCAL_IP,
                      port: MAIN_BACKEND_PORT,
                      path: "/addCredential",
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
                          const credentialDid = JSON.parse(d).did;
                          res
                            .status(200)
                            .json({ credentialDid: credentialDid });
                        });
                      })
                      .on("error", (error) => {
                        console.error(error);
                      });
                    request.write(data);
                    request.end();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res.status(400).json({ error: err });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ error: err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
});

module.exports = router;
