import express from "express";
import mongoose from "mongoose";
import ArtistRouter from "./routers/Artists";
import AlbumsRouter from "./routers/Albums";
import TracksRouter from "./routers/Tracks";
import UsersRouter from "./routers/Users";

const app = express();
const port =  8000;

app.use(express.json());
app.use('/artists', ArtistRouter);
app.use('/albums', AlbumsRouter);
app.use('/tracks', TracksRouter);
app.use('/users', UsersRouter);

app.use(express.static('public'));

const run = async () => {

    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
