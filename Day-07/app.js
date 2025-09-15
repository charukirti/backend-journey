import express from 'express';
import mongoose from 'mongoose';

/* 


MongoDB

- NoSQL database.
- contains collections 
- each collections contains documents

👉 Document based: Mongo stores each document in the form of documents
👉 Scalable: Easy to distribute data across multiple machines as amount of data grows
👉 Flexible: No schema required, so each document can have different number and type of fields.
👉 Performant: Embeded data models, indexing, sharding, flexible


* Document Structure
    👉 BSON: data format mogodb uses for data storage. like JSON, but typed. so MongoDB documents are typed
*/


const app = express();
const PORT = process.env.PORT;

// middleware to parse requset body

app.use(express.json());

// connection to mongoDB

mongoose.connect(process.env.MONGODB_STRING).then(() => console.log('Connected to MONGODB')).catch(() => console.error('Unable to connect mongoDB'));


/* creating schema using mongoose */

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    jobTitle: {
        type: String
    },

    gender: {
        type: String
    }
}, { timestamps: true });



/* creating model using schema */

const UserModel = mongoose.model('user', userSchema);

app.get('/', (req, res) => {
    res.send(`Hello and welcome to PORT ${PORT}`);
});


// post data to server

app.post("/api/users", async (req, res) => {
    const body = req.body;

    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ message: 'All fields are required...' });
    }

    const result = await UserModel.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,

    });

    console.log(result);

    return res.status(201).json({ message: "New record created successfully" });

});


/* GET existing users */

app.get("/api/users", async (req, res) => {
    const users = await UserModel.find({});

    return res.status(200).json(users);
});


/* Get individual user */

app.get("/api/users/:id", async (req, res) => {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    console.log(user);

    return res.status(200).json(user);

});

/* patch : updating data */

app.patch("/api/users/:id", async (req, res) => {
    const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
    });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));