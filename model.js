const mongoose = require('mongoose')

const bcrypt = require("bcrypt");

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
    }
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

const User = mongoose.model('USER', userSchema)

module.exports = User