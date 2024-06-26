const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uhsqmgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const userCollection = client.db('collegeDB').collection('users');
        const collegeCollection = client.db('collegeDB').collection('colleges');
        const researchPaperCollection = client.db('collegeDB').collection('researchPapers');
        const reviewCollection = client.db('collegeDB').collection('reviews');
        const admissionCollection = client.db('collegeDB').collection('admissions');

        // READ all documents
        app.get('/user', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/colleges', async (req, res) => {
            const cursor = collegeCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/research-papers', async (req, res) => {
            const cursor = researchPaperCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/reviews', async (req, res) => {
            const cursor = reviewCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/admissions', async (req, res) => {
            const cursor = admissionCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // READ a document 
        app.get('/user/:uid', async (req, res) => {
            console.log(req.params.uid);
            const uid = req.params.uid;
            const query = { uid: uid };
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        app.get('/colleges/:id', async (req, res) => {
            console.log(req.params.id);
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await collegeCollection.findOne(query);
            res.send(result);
        })
        app.get('/research-papers/:id', async (req, res) => {
            console.log(req.params.id);
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await researchPaperCollection.findOne(query);
            res.send(result);
        })
        app.get('/reviews/:uid', async (req, res) => {
            console.log(req.params.uid);
            const uid = req.params.uid;
            const query = { uid: uid };
            const result = await reviewCollection.findOne(query);
            res.send(result);
        })
        app.get('/admissions/:uid', async (req, res) => {
            console.log(req.params.uid);
            const uid = req.params.uid;
            const query = { uid: uid };
            const result = await admissionCollection.findOne(query);
            res.send(result);
        })

        // send one product to database s
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.json(result);
        })
        app.post('/colleges', async (req, res) => {
            const newColleges = req.body;
            const result = await collegeCollection.insertOne(newColleges);
            res.json(result);
        })
        app.post('/research-papers', async (req, res) => {
            const newResearchPaper = req.body;
            const result = await researchPaperCollection.insertOne(newResearchPaper);
            res.json(result);
        })
        app.post('/reviews', async (req, res) => {
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.json(result);
        })
        app.post('/admissions', async (req, res) => {
            const newAdmission = req.body;
            const result = await admissionCollection.insertOne(newAdmission);
            res.json(result);
        })

        // update 
        app.put('/user/:uid', async (req, res) => {
            const uid = req.params.uid;
            const filter = { uid: uid };
            const options = { upsert: true };
            const updatedUser = req.body;
            const newUser = {
                $set: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    image: updatedUser.image,
                    university: updatedUser.university,
                    address: updatedUser.address,
                    uid
                }
            }
            const result = await userCollection.updateOne(filter, newUser, options);
            res.send(result);
        })
        app.put('/colleges/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedCollege = req.body;
            const newCollege = {
                $set: {
                    title: updatedCollege.title,
                    quantity: updatedCollege.quantity,
                    author: updatedCollege.author,
                    category: updatedCollege.category,
                    detail: updatedCollege.detail,
                    rating: updatedCollege.rating,
                    img: updatedCollege.img,
                    detail_img: updatedCollege.detail_img,
                }
            }
            const result = await collegeCollection.updateOne(filter, newCollege, options);
            res.send(result);
        })
        app.put('/reviews/:uid', async (req, res) => {
            const uid = req.params.uid;
            const filter = { uid: uid };
            const options = { upsert: true };
            const updatedReview = req.body;
            const newReview = {
                $set: {
                    college: updatedReview.college,
                    reviewer: updatedReview.reviewer,
                    image: updatedReview.image,
                    rating: updatedReview.rating,
                    feedback: updatedReview.feedback,
                    uid
                }
            }
            const result = await reviewCollection.updateOne(filter, newReview, options);
            res.send(result);
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('College finder server is running');
})

app.listen(port, () => {
    console.log(`College finder server is running on port: ${port}`);
})


