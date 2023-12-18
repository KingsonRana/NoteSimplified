const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchUser = require('../middleware/fetchUser');


//Route1: Create a user using : Post "/api/auth/"
router.get('/', (req, res) => {
    const obj = {
        name: "kingson"
    }
    res.json(obj)
})


router.post('/createUser', [
    body('email', "Enter a valid email").isEmail(),
    body('name', 'Name should atleast have 5 characters').isLength({ min: 5 }),
    body('password', "Password should be atleast 6 characters").isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    //IN CASE OF ERRORS RETURN BAD REQUEST
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success:success, errors: error.array() });
    }

    //CHECK FOR DUPLICATE ENTERY OF EMAIL
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success:success,error: "Sorry user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email

            //    }).then(user => res.json(user)).catch(error=>{console.log(error)
            //      res.json({error:"Please enter the valid data", message:error.message})
        })
        const data = {
            user: {
                id: user.id
            }
        }
        success=true
        const authToken = jwt.sign(data, process.env.SECRET)
        res.json({success:success, authToken: authToken,user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:success,error:"Internal server error occured"})
    }

    //   if we do not use User.Create the,use this => const user = User(obj);
    //    user.save();

})



//Route2: authenticate a user
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
        return res.status(400).json({success:success,errors: error.array() });
    }
    const { email, password } = req.body;
    try {
    
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success:success, error: "Login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({success:success, error: "Login with correct credentials" })
        }
        success=true
        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, process.env.SECRET)
        
        res.json({success:success , authToken,user })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:"false",error:"Internal server error occured"})
    }
}
)

//Route3: Get logged in user details using post "/api/auth/getUser". LogIn required

router.post('/getUser',fetchUser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured")
    }
})


module.exports = router