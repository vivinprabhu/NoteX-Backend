const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:[String],
        enum:["user" , "admin"],
        default:["user"]
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'note' }]
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id , role: this.role}, process.env.JWTPRIVATEKEY, { expiresIn: '7d' })
    return token;
}

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

const User = mongoose.model("user", userSchema)

module.exports = { User, validate } 