module.exports=()=>{
const mongoose=require("mongoose");

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Database Connected");
})
.catch((error)=>console.log(error));
}
