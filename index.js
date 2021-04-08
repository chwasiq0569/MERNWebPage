const mongoose = require('mongoose');

const express = require("express")

const app = express()

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const DB = process.env.CONNECTIONSTRING;

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("CONNECTION SUCCESSFULL")).catch((err) => console.log(err, "ERROR OCCURED"))


app.get("/", (req, res) => {
    res.send('<html> <head> <style> body{ border: 15px solid #00C7CB; font-size:20px; } header h1{ text-align:center; color:gray; font-size:30px; } .content{ width: 90%; margin: 0 auto; } header .header{ padding:80px 100px; background: #84FED4; } header .header:hover{ background:#D9AF7C; } .title{ padding:100px 100px; background: #304F4F; color: #20C2C4; } .another h1{ font-size:30px; color:grey; text-transform:uppercase; } .title:hover{ background: #5E5E5E; } .another h1:hover{ text-decoration:none; letter-spacing:2px; padding-left:5%; padding-right:5%; text-transform:lowercase; text-transform: capitalize; color:#FF8100; } .another div:hover{ color:#FF8100; } .another div p{ letter-spacing:2px; } .another{ padding-top: 40px; } nav img:first-child{ margin-left:0px; } nav img:last-child{ margin-right:0px; } nav img{ margin-right:9%; margin-bottom:100px; margin-top:100px; } nav img:hover{ border:5px dotted #FF8100; } </style> <body> <div class = "content"> <Header> <h1>Learning How to Code</h1> <section class = "header"> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aperiam earum mollitia enim pariatur atque asperiores, deserunt fuga iure distinctio! Amet iste facilis odio rerum maiores neque laboriosam non aliquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit eius officia reprehenderit dicta molestiae, excepturi inventore aut officiis! Perspiciatis, molestias tempora et nesciunt amet sint blanditiis eos voluptatibus ut facilis!</p> </section> </Header><section = class= "title"> <h2>')
})
app.get("/about", (req, res) => {
    res.send("About Page")
})
app.get("/contact", (req, res) => {
    res.json([{
        myname: "Wasiq"
    },{
        yourname: "Abdullah"
    }])
})
app.get("/temp", (req, res) => {
    res.send("Temp Page")
})


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening at PORT: ${port}`))