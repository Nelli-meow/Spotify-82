import express from "express";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

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
        res.status(500).send({error: 'something went wrong'});
    }
});

TracksRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const tracks = await Track.find({ album: id })
            .sort({ number: 1 })
            .populate({
                path: "album",
                populate: {
                    path: "artist",
                    model: "Artist",
                },
            });

        if (!tracks) {
            res.status(404).send({ message: "Tracks not found" });
            return;
        }

        res.status(200).send(tracks);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});



TracksRouter.post("/" , auth, permit('user', 'admin'), async (req, res) => {
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
        res.status(500).send({error: 'something went wrong'});
    }
});

TracksRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
   try {
       const {id} = req.params;

       const track = await Track.findById(id);
       if (!track) {
           res.status(404).send({message: "track not found"});
           return;
       }

       await Track.findByIdAndDelete(id);
       res.status(200).send({message: "track deleted successfully"});
   } catch(error) {
       res.status(500).send({error: 'something went wrong'});
   }
});

export default TracksRouter;