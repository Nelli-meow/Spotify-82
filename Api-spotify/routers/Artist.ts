import express from "express";
import Artist from "../models/Artists";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../types";

const ArtistRouter = express.Router();

ArtistRouter.get("/", async (req, res) => {
    try {
        const artist = await Artist.find();
        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
    }
});

ArtistRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    try {

        const { name } = req.body;

        if(!name) {
            res.status(400).send('Name is required');
        }

        const newArtist: ArtistMutation = {
            name: req.body.name,
            photo: req.file ? req.file.filename : null,
            information: req.body.information,
        }

        const artist = new Artist(newArtist);
        await artist.save();

        console.log(artist);

        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
    }
});

export default ArtistRouter;