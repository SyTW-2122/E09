const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const saltRounds = 10;

 //schema que debe cumpplir los usuarios de la bbdd
 const userSchema = new mongoose.Schema ({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true}
});

userSchema.pre('save', function(next){
  if(this.isNew || this.isModified('password')){
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if(err) {
        next(err);
      }
      else {
        document.password = hashedPassword; next();
        next();
      }
    });
  }
  else {
    next();
  }
});


userSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same){
    if(err){
      callback(err);
    }
    else{
      callback(err,same);
    }
  })
}

const userModel= mongoose.model('Usuario',userSchema)
module.exports = userModel