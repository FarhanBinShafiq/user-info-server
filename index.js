const express = require('express');
const ObjectId=require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors')

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());
 




//mongoDB code 
//user -admin ,password-test123


const uri = "mongodb+srv://admin:test123@cluster0.lzm9qq0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        await client.connect()
        const database = client.db('MembersInfo');
        const usersCollection = database.collection('collection');
        //get method

         app.get('/users',async(req,res)=>{
            const getData=usersCollection.find({});
            const getUser=await getData.toArray();
            res.send(getUser);
         })

        app.get('/users/:id',async(req,res)=>{
            const userId=req.params.id;
            const query={_id:ObjectId(userId)}
            const result= await usersCollection.findOne(query);
            console.log('find this id',userId)
            res.json(result);
        }) 

        //Post Api
        app.post('/users', async(req, res) => {
            const newUser=req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log('got the result',result)
            console.log('Hitting the post',req.body)
            res.send(result)
          })

          //Deelete API

          app.delete('/users/:id',async(req,res)=>{
            const userId=req.params.id;
            const query={_id:ObjectId(userId)}
            const result= await usersCollection.deleteOne(query);
            console.log('delete this id',result)
            res.json(result);
          })

    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Running the server')
})


app.listen(port, () => {
    console.log(`Running the server on ${port}`)
})
