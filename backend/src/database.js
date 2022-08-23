const mongoose = require("mongoose"); 

const uri = "mongodb+srv://usuario:usuario@cluster0.a1unt.mongodb.net/portfolios?retryWrites=true&w=majority";
mongoose.connect(uri).then(()=>{
  console.log("database conected")
}).catch(err => {
  console.error(err)
})
  