const mongoose = require('mongoose')

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
        type: String,
        required: true
    },
    tokens:[
        {
            type: String,
            required: true
        }
    ]
})

// userSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 12)
//     }
//     if(this.isModified("confirm_password")){
//          this.confirm_password = await bcrypt.hash(this.confirm_password, 12)
//     }
//     next();
// })

userSchema.methods.generateAuthToken = async function (){
    try{
        const generatedToken = await jwt.sign({
                _id: this._id
            }, process.env.SECRET_KEY);
        this.token = this.tokens.concat({ token: generatedToken })
        await this.save()
        return generatedToken
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER', userSchema)

module.exports = User