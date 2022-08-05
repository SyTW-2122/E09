const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://usuario:usuario@cluster0.a1unt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  console.log(err)
  //const collection = client.db("test").collection("devices");
 // perform actions on the collection object
  client.close();
});