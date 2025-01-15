import express from "express";
import mongoose from "mongoose";
import ArtistRouter from "./routers/Artists";
import AlbumsRouter from "./routers/Albums";
import TracksRouter from "./routers/Tracks";
import UsersRouter from "./routers/Users";
import TracksHistoryRouter from "./routers/TracksHistory";
import config from "./config";
import cors from 'cors';

const app = express();
const port =  8000;

app.use(express.json());
app.use(cors());
app.use('/artists', ArtistRouter);
app.use('/albums', AlbumsRouter);
app.use('/tracks', TracksRouter);
app.use('/users', UsersRouter);
app.use('/track_history', TracksHistoryRouter);

app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
