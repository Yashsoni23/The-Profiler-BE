const express = require("express");
const mongoose = require("mongoose");
const user = require("../model/user");
const router = express.Router();
const Profile = require("../model/profile");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: 'ddms76vie',
    api_key: '399292649581493',
    api_secret: 'gt0LJPdQ1x35u_F6m4FhquwodfY',
    secure: true
});

router.post("/new-profile", (req, res) => {


    const createProfile = async () => {
        try {
            const file = req.files.photo;
            const result = await cloudinary.uploader.upload(file.tempFilePath, (erro, result) => {
                console.log(result);

            });
            const { name, gender, email, category, about } = req.body;
            const newProfile = new Profile({
                _id: new mongoose.Types.ObjectId,
                name,
                gender,
                email,
                category,            
                url: result.url,
                about
            });

            res.send("new profile created");
            const saveNewProfile = await newProfile.save();
            console.log(saveNewProfile);
            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }
    createProfile();
});


router.delete("/:id",(req,res)=>{
    const DeleteDocument = async()=>{
        try {
            const deleteProfile = await Profile.findByIdAndDelete(req.params.id);
            res.send(deleteProfile);

        } catch (error) {
            console.log(error);
        }
    }
    DeleteDocument();
});
router.get("/all_profile",(req,res)=>{
    const GetProfiles = async ()=>{
        try {
            const GetProfile = await Profile.find();
            res.send(GetProfile);
        } catch (error) {
            console.log(error)
        }
    }
    GetProfiles();
})

module.exports = router;