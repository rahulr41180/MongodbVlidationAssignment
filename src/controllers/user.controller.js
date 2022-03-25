
const express = require("express");

const router = express.Router();

const User1 = require("../models/user.model");

const {body, validationResult} = require("express-validator");

router.post("",
body("first_name").trim().not().isEmpty().withMessage("First Name Cannot be Empty").isLength({min : 4}).withMessage("First Name must be atleast four characters"),
body("last_name").custom( (value) =>
{
    // console.log('value:', value);
    if(value && value.length < 4)
    {
        throw new Error("Last Name if provided must be at least 4 characters");
    }
    return true;
}),
body("email").isEmail().custom( async(value) =>
{
    const User = await User1.findOne({email : value});
    
    if(User)
    {
        throw new Error("Email is already taken");
    }

    return true;
}),
body("pincode").not().isEmpty().withMessage("pincode cannot be empty").isNumeric().withMessage("pincode must be a number of 6 digit").custom( async(value) =>
{
    value = value.toString();
    console.log('value:', value.length);
    if(value.length != 6)
    {
        throw new Error("Pincode must have 6 digit");
    }
    return true;
}),
body("age").not().isEmpty().withMessage("Age cannot be empty").isNumeric().withMessage("Age must be a number between 1 and 120").custom( async(value) =>
{
    if(value < 1 || value > 100)
    {
        throw new Error("Incorrect age provided");
    }

    return true;
}),
body("gender").not().isEmpty().withMessage("gender should not miss").custom( async(value) =>
{
    if(value != "Male" && value != "Female")
    {
        throw new Error("Incorrect gender provided");
    }
    
    return true;
}),
async(req,res) =>
{
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const User = await User1.create(req.body);

        return res.status(201).send({User : User});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

router.get("", async(req,res) =>
{
    try
    {
        const User = await User1.find().lean().exec();

        return res.status(200).send({User : User});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

module.exports = router;