const express = require("express");
const mongoose = require("mongoose");
const user = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            res.status(500).json({ error });
        } else {

            const User = new user({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                usertype: req.body.usertype,
                email: req.body.email
            })
            User.save().then((result) => {
                res.json({ new_user: result });
            }).catch((error) => {
                console.log(error);
            });
        }
    });

})


router.post("/login", (req, res) => {
    user.find({ username: req.body.username }).then(user => {
        if (user.length < 1) {
            res.json({
                msg: "user not found"
            })
            console.log("errorfromthis");
        } else {
            console.log(user[0]);
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (!result) {
                    return res.json({
                        msg: "password not match",
                        error: error
                    }), console.log(error)


                }
                if (result) {
                    console.log(result)
                    const token = jwt.sign({
                        username: user[0].username,
                        usertype: user[0].usertype,
                        email: user[0].email,
                        phone: user[0].phone
                    }, "This is dummy text",
                        { expiresIn: "24h" });

                    res.status(200).json({
                        _id: user[0]._id,
                        username: user[0].username,
                        usertype: user[0].usertype,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                };
            })
        }
    }).catch(error => {
        console.log(error);
    });

})
router.patch("/:_id", (req, res) => {
    const _id = req.params._id;

    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            console.log(err);
            res.json({
                msg:"password not updated"
            });
        }else{
            const UpdateDocument = async () => {
                try {
                    const updateDetail = await user.findByIdAndUpdate({ _id: _id }, {
                        $set: {
                            username: req.body.username,
                            password: hash
                        }
                    }, { new: true });
                    console.log(updateDetail);
                    res.send(updateDetail);
        
                } catch (error) {
                    console.log(error)
                }
            }
            UpdateDocument();
        }
    })
   
})
router.get("/:_id", (req, res) => {
    const getAllUsers = async () => {
        const _id = req.params._id;
        try {
            const getUsers = await user.findById(_id);
            res.send(getUsers);
        } catch (error) {
            console.log(error)
        }
    }
    getAllUsers();
})
module.exports = router
