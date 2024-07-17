const express = require('express');
const app = express();

//its use for Client side rendering 
// app.use("/home",express.static("public"))
app.use(express.urlencoded({ extended: true }))  // maiunly use for browser 

// it  use to encrypt the password
const bcrypt = require('bcrypt');

//it is concept of connecting with database
require('./db/connect');
const usermodels = require('./model/model');

//its use for creating template file using ejs 
app.set("view engine", "ejs")

app.use(express.json()) //mainly use for postman 


const cors=require('cors') //its help to connect the frontend and backend 
app.use(cors());  //its very important

//its use for creation a token
const jwt = require('jsonwebtoken');


// <-------------------->
app.listen(3001, () => {
    console.log("runninng");
})
app.get('/message',(req,res)=>{
  res.json({message:"Hello i am happy"}) 
})
// let arr=[1,2,3];
// app.get("/todo",(req,res)=>{
//     res.json(arr)
// })
// app.post('/todo',(req,res)=>{
//     console.log(req.body);
//     let {inp}=req.body;
//     console.log(inp,"arha hai ");
//     let inp2=parseInt(inp);
//     arr.push(inp2)
//     res.send()
// })
// app.get('/',(req,res)=>{
//     res.send("hello serverside")
// }

// const newdata=new  usermodels({Email:"Adarsh",Password:"sadfsdf2434"});
// newdata.save();
app.get('/', async (req, res) => {

    res.render("login")

})
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    // console.log(email);
    let logindata=req.body
    let user = await usermodels.findOne({ email })
    // console.log(user.password);
    let result = await bcrypt.compare(password, user.password)
    if (!user) {
        res.send("user not found")
    }
    else {
//  let logindata=req.body

        if (result) {

            //token generate 
            let data=JSON.stringify(logindata)
let token=jwt.sign(data,'JKNSDAFOIFIWOWECMCCSPEIEIRJFN')

console.log(token,"Token hai ");  
            res.send("Finally login")
        } else {

            res.send("invalid password")
        }
    }
}

)

app.get('/signup', (req, res) => {
    res.render("signup")
})
app.post('/signup', async (req, res) => {
    let { email } = req.body;
    // console.log(email);
    let user = await usermodels.findOne({ email })
    // console.log(user);
    if (user) {
        res.send("ALready existing user ")
    }
    else {
        let { username, number, email, password } = req.body;
        password = await bcrypt.hash(password, 10);
        const newdata = new usermodels({ username, number, email, password });
        console.log(newdata);
        await newdata.save()
        res.send("Done")
        // res.redirect('/')
    }
})



