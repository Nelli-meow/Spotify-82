import express from "express";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import {TrackMutation} from "../types";
import Album from "../models/Album";

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

        if(!album || !name) {
            res.status(400).send('album, name are required');
            return;
        }

        const newYear = new Date().toString();

        const SongDuration = await getRandomDuration();

        const trackCount = await Track.countDocuments({ album });

        const existingAlbum = await Album.findById(album);
        if(!existingAlbum) {
            res.status(404).send("album Not Found");
            return;
        }

        const newTrack : TrackMutation = {
            name: name,
            album: album,
            duration: SongDuration,
            year: newYear,
            number: trackCount + 1,
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

TracksRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send({error: "track not found"});
            return;
        }
        track.isPublished = !track.isPublished;
        await track.save();

        res.status(200).send({message: "track publication status updated", track});
    } catch (error) {
        res.status(404).send({error: "something went wrong"});
    }
});

export default TracksRouter;