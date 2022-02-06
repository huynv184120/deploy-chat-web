const { UserModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const login = async (req, res) => {
    
    try{
        const user = await UserModel.findOne({email:req.body.email})
        if(user){
            const validatePassword = await bcrypt.compare(req.body.password, user.password);

            if(validatePassword){
                const accessToken = jwt.sign({
                    email: user.email,
                    _id: user._id
                },process.env.SECRETKEY_JWT_TOKEN,
                {expiresIn:"1d"});
                res.cookie("token",`Bearer ${accessToken}`);
                res.cookie("user_id",user._id);
                res.status(200).json({message : "success"});
            }else{
                res.status(200).json({message : "email or password is incorrect"});
            }
        }else{
            res.status(200).json({message : "email or password is incorrect"});
        }
    }catch(err){
        res.status(500);
    }

}

const signup = async (req, res) => {

    try{
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        res.status(200).json({ message: "email was used" });
    }
    else {

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password , salt);
        UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashed
        }).then(data => {
            res.status(200).json({ message: "success" });
        })
    }}catch(err){       
            res.status(200).json({ message: "email was used" });
    };
}

const verify = (req, res) => {
    res.send("verify");
}

module.exports = { login, signup, verify }