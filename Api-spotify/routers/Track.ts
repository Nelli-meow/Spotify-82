import express from "express";
import Tracks from "../models/Tracks";


const TracksRouter = express.Router();

const getRandomDuration = async () => {
    const minutes = Math.floor(Math.random() * 10) + 1;
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

TracksRouter.get("/", async (req, res) => {
    try {
        const tracks = await Tracks.find().populate({
            path: "album",
            populate: {
                path: "artist",
            }
        });

        res.status(200).send(tracks);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


TracksRouter.post("/", async (req, res) => {
    try {

        const { name } = req.body;

        if(!name) {
            res.status(400).send('name is required');
        }

        const SongDuration = await getRandomDuration();

        const newTrack = {
            name: req.body.name,
            album: req.body.album,
            duration: SongDuration,
        }

        const track = new Tracks(newTrack);
        await track.save();


        res.status(200).send(track);
    } catch (error) {
        console.log(error);
    }
});

export default TracksRouter;