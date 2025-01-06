import express from "express";
import mongoose from "mongoose";
import ArtistRouter from "./routers/Artist";
import AlbumsRouter from "./routers/Album";
import TracksRouter from "./routers/Track";

const app = express();
const port =  8000;

app.use(express.json());
app.use('/artists', ArtistRouter);
app.use('/albums', AlbumsRouter);
app.use('/tracks', TracksRouter);

const run = async () => {

    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
