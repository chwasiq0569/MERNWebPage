const express = require("express")

const router = express.Router()

require("../db/conn")

const User = require("../model")

router.get("/", (req, res) => {

   return res.send("INSIDE AUTH")

})

router.post("/register", (req, res) => {
    console.log(req.body)

    const {name, email, phone, work, password, confirm_password} = req.body;

    if(!name || !email ||!phone ||!work ||!password ||!confirm_password){
      return res.status(422).json({error: "Please fill the required fields."})
    }

    User.findOne({email: email}).then((userExists) => {
        if(userExists) {
          return res.status(422).json({error: "User Already Exists"})
        }
       const user = new User({
           name, email, phone, work, password, confirm_password
       })
       
       user.save().then(() => {
          return res.status(201).json({message: "User Created Successfully."})
       }).catch(() => {
          return res.status(500).json({error: "Registration Failed."})
       })
    })
})

module.exports = router