import express from "express";
import mongoose from "mongoose";

const app = express();
const port =  8000;

app.use(express.json());

const run = async () => {

    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
