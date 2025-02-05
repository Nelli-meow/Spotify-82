import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const ArtistRouter = express.Router();

ArtistRouter.get("/" , async (req, res) => {
    try {
        const artist = await Artist.find();

        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
    }
});

ArtistRouter.post("/", imagesUpload.single('image'), auth, permit('user', 'admin'), async (req, res) => {
    try {

        const {name} = req.body;

        if (!name) {
            res.status(400).send('Name is required');
            return;
        }

        const newArtist: ArtistMutation = {
            name: req.body.name,
            photo: req.file ? 'images' + req.file.filename : null,
            information: req.body.information,
        }

        const artist = new Artist(newArtist);
        await artist.save();


        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
    }
});

ArtistRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const artist = await Artist.findById(id);
        if (!artist) {
            res.status(404).send({message: "Artist not found"});
            return;
        }

        await Artist.findByIdAndDelete(id);
        res.status(200).send({message: "Artist deleted successfully"});
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
});


ArtistRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const artist = await Artist.findById(id);
        if (!artist) {
            res.status(404).send({error: "artist not found"});
            return;
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();

        res.status(200).send({message: "artist publication status updated", artist});
    } catch (error) {
        res.status(404).send({error: "something went wrong"});
    }
});

export default ArtistRouter;