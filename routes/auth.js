const router = require("express").Router();

const {User,vaidate} = require("../model/user")

const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const bcrypt = require("bcrypt")

router.post("/" , async (req,res)=>{
    try {

        const {error} = validate(req.body)
        if(error)
        {
            return res.status(400).send({message:error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        if(!user)
        {
            return res.status(401).send({message:"Invalid username or password"})
        }   
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
        {
            return res.status(401).send({message:"Invalid username or Password"});
        }

        const token = user.generateAuthToken();

        return res.status(200).cookie('token', token,{
            sameSite: 'strict' , 
            path:'/' , 
            httpOnly: true,
            expires: new Date(new Date().getTime()+86400*1000)
          }).send({data: token , message: "Loggedin successfully"});
        } 
    catch (error) {
        console.error(error)
        res.status(500).send({message:"Internal server error"})
    }
})

const validate =(data)=>{
    const schema = joi.object({
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = router