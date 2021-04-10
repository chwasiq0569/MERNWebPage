const express = require("express")

const router = express.Router()

require("../db/conn")

const User = require("../model")

const bcrypt = require("bcrypt")

router.get("/", (req, res) => {

   return res.send("INSIDE AUTH")

})

router.post("/register", (req, res) => {
    console.log(req.body)

    const {name, email, phone, work, password, confirm_password} = req.body;

    if(!name || !email ||!phone ||!work ||!password ||!confirm_password){
      return res.status(422).json({error: "Please fill the required fields."})
    }

    if(password !== confirm_password){
      return res.status(422).json({error: "Please Enter Same Password in both fields."})
    }

    User.findOne({email: email}).then(async (userExists) => {
        if(userExists) {
          return res.status(422).json({error: "User Already Exists"})
        }
       const user = new User({
           name, email, phone, work, password, confirm_password
       })

       user.password = await bcrypt.hash(password, 12) 
       user.confirm_password = await bcrypt.hash(confirm_password, 12) 

       user.save().then(() => {
          return res.status(201).json({message: "User Created Successfully."})
       }).catch(() => {
          return res.status(500).json({error: "Registration Failed."})
       })
    })
})


router.post("/login", (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(422).json({error: "Please fill the required fields."})
    }

    User.findOne({email: email, password: password}).then((userExists) => {
        if(userExists && userExists.email === email && userExists.password === password){
            return res.status(201).json({message: "User LoggedIn Successfully."})
        }
         return res.status(500).json({error: "User not Exists."})
    }).catch(() => {
        return res.status(500).json({error: "User not Exists."})
    })

})

// using async await
// router.post("/register", async (req, res) => {
//     console.log(req.body)
//     const {name, email, phone, work, password, confirm_password} = req.body;
//     if(!name || !email ||!phone ||!work ||!password ||!confirm_password){
//       return res.status(422).json({error: "Please fill the required fields."})
//     }
//     try{
//         const userExists = await User.findOne({email: email})
//         if(userExists){
//                 return res.status(422).json({error: "User Already Exists"})
//         }
//         const user = new User({name, email, phone, work, password, confirm_password})
//         if(user){
//             try{
//                 const savedUser = await user.save();
//                 if(savedUser) return res.status(201).json({message: "User Created Successfully."})
//             } catch(err){
//                   return res.status(500).json({error: "Registration Failed."})
//             }
//         }
//        } catch(err){
//            console.log(err)
//        }
// })

module.exports = router