import express from "express";
import Track from "../models/Track";


const TracksRouter = express.Router();

const getRandomDuration = async () => {
    const minutes = Math.floor(Math.random() * 10) + 1;
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

TracksRouter.get("/", async (req, res) => {
    try {
        const tracks = await Track.find().populate({
            path: "album",
            populate: {
                path: "artist",
                model: "Artist",
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

        const { name, album } = req.body;

        if(!name) {
            res.status(400).send('name is required');
            return;
        }

        const SongDuration = await getRandomDuration();

        const newTrack = {
            name: name,
            album: album,
            duration: SongDuration,
        }

        const track = new Track(newTrack);
        await track.save();


        res.status(200).send(track);
    } catch (error) {
        console.log(error);
    }
});

export default TracksRouter;