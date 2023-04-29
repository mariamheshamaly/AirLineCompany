
const express = require("express");
const app=express();
const jwt = require('jsonwebtoken')
require('dotenv').config();
app.use(express.json());
console.log("hii")
console.log("mro")
app.listen(4000)
const posts= [
    {
        username: 'miro' ,
        title: 'miro1'
    },
    {
        username: 'miro2' ,
        title: 'miro3' 
    }
]
app.get('/posts',authenticate, (req,res)=>{

    res.json(posts.filter(post=> post.username=== req.user.username))

}

)
app.post('/registration', (req,res)=>{
    const username= req.body.username;
    const user={ username:username}
    const accessToken= jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken : accessToken})

    
})
function authenticate(req,res,next){
    const authHeader=req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        
        req.user=user
        next()
    })
    
   
}



