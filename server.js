import express from 'express';
const app = express();
import Messages from './notesDB.js';
import cors from 'cors'

const PORT = process.env.PORT||9000;

//db connection
import mongoose from 'mongoose';
const url='mongodb+srv://satidiwas:TR49G"We(YUEyQ4@cluster0.is8pr7k.mongodb.net/Note-Taking?retryWrites=true&w=majority';
mongoose.connect(url, { autoIndex: false })
.then(()=>console.log("connection successful")).catch("there was some error");

//middleware
app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","same-origin-allow-popups");
    res.setHeader("Access-Control-Allow-Headers","true");
    next();
})



//functionality
app.get('/',(req,res)=>{
    res.status(200).send("hello bhai log");
});

app.post('/notes/new',(req,res)=>{
        const email=req.body.user;
        const data = Messages.find({user_email:email}).exec()
        .then((data)=>res.status(200).send("bhai server to chlra hai"))
        .catch((e)=>console.log("lo error aa  gaya"));
});

app.post('/notes/add',(req,res)=>{
    const newMessage = req.body;
    console.log("this is"+JSON.stringify(newMessage))
    //console.log("this is "+JSON.stringify(newMessage));
    Messages.create(newMessage).then(res.status(201).send('database updated successfully'))
    .catch((e)=>res.status(501).send(e));
})


//listening port
app.listen(PORT, '0.0.0.0', function(err) {
  console.log("Started listening on %s", PORT);
});
