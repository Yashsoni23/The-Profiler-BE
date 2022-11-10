const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const student = require("../model/student");
const router = express.Router();








router.get("/:name", (req, res, next) => {
    //  // Get all data from database
    // const getDocument = async () => {
    //     try {
    //         const result = await student.find();
    //         console.log(result);
    //         res.send(result);

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // getDocument();

    //  // Get only One data from database By ID or name
    const getDocument = async ()=>{
        try {
            const name = req.params.name;
            const result = await student.find({name});
            res.json({result});
            console.log(result);
        } catch (error) {
            console.log(error);   
        }
    }
    getDocument();



})
router.post("/", (req, res, next) => {
    // res.send(req.body);
    // console.log(req.body)

    const Student = new student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        gender: req.body.gender,
        degree: req.body.degree,
        Email: req.body.email,
        phone: req.body.phone
    });
    Student.save();
    res.send("save Successful")

})


// Delete request 
router.delete("/:name",(req,res)=>{
    const deleteDocument = async ()=>{
        try {
            const name  = req.params.name;
            const total = await student.find().count();
            console.log(total);
            const result = await student.findOneAndDelete({name})
            res.json({result:result.name,
            Status:"Deleted Successfull"})
            console.log(result.name)
            const totalafter = await student.find().count();
            console.log(totalafter);

        } catch (error) {
            console.log(error);
        }
    }
    deleteDocument();

})


// put request
router.put("/:id",(req,res)=>{
    const updateDocument = async ()=>{
        try {
            console.log(req.params.id);
            const result  = await student.findByIdAndUpdate({_id:req.params.id},{$set:{name:"Rajesh"}});
            res.json({
                status:"updateDone"
            });
            console.log(result.name);
        } catch (error) {
            console.log(object);
        }
    }
    updateDocument();
   
})
module.exports = router
