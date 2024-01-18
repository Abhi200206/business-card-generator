const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const jwtpass="12996765499";
app.use(express.json());
app.use(cors());
const schema=zod.object({
    username:zod.string(),
    password:zod.string(),
});
mongoose.connect("your monodb connection url");
const UserSchema=mongoose.Schema({
    username:String,
    password:String
});
const user_cards= mongoose.Schema({
    username:String,
    cards:Object
});
const user = mongoose.model('user', UserSchema);
const cards=mongoose.model('cards',user_cards);
app.post('/signup',async (req,res)=>{
    let obj=req.body;
    console.log("logged body: ",obj);
    let result=schema.safeParse(obj);
    if(result.success)
    {
        let r =await user.find({username: obj.username}).exec();
        if(!r[0]){
        let u=new user({
            username:obj.username,
            password:obj.password
        })
        u.save().then(()=>{console.log("data saving completed")});
        res.status(200).json({
            "msg":"signup completed. now login"
        })
    }
    else{
        res.status(404).json({
            error: "user already present"
        });
    }
        
    }
    else{
        res.status(404).json({
            error: "invalid input please check"
        });
    }

});
app.post('/login',async (req,res)=>{
    let obj=req.body;
    console.log("logged body: ",obj);
    let result=await user.find({username: obj.username,password:obj.password}).exec();
    if(result[0])
    {
        let token= jwt.sign({username:obj.username,password:obj.password},jwtpass);
        res.status(200).json({msg:"received by server all ok",token:token,name:true});
        
    }
    else{
        res.status(404).json({
            msg:"username not found !!",
            name:false
        })
    }
    
    

});
app.post('/cards',async (req,res)=>{
    let token=req.headers.token;
    let Token=jwt.verify(token,jwtpass);
    console.log("result at jwt: ",Token);
    
        let obj=req.body;
        let card=new cards({
            username:Token.username,
            cards:obj
        })
        card.save().then((data)=>console.log("data saved sucessfully "))
        .then(()=>{
            res.status(200).json({msg:"obj added eyyyy!"});
        })
  

});
app.get('/card',async (req,res)=>{
    let token=req.headers.token;
    let Token=jwt.verify(token,jwtpass);
    console.log("result at jwt: ",Token);
    let result=await cards.find({username:Token.username}).exec();
    console.log("result from retiving: ",result);
    let finalarr=result.map((r)=>{
        return(r.cards)
    });console.log("cards :",finalarr);

    res.send(finalarr);
})
app.listen(3000,()=>console.log("running !!!"));
