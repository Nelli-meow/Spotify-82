import express from "express";
import Artist from "../models/Artists";


const ArtistRouter = express.Router();

ArtistRouter.get("/", async (req, res) => {
    try {
        const artist = await Artist.find();
        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
    }
});

ArtistRouter.post("/", async (req, res) => {
    try {

        const { name } = req.body;

        if(!name) {
            res.status(400).send('Name is required');
        }

        const newArtist = {
            name: req.body.name,
            photo: req.body.photo,
            information: req.body.information,
        }

        const artist = new Artist(newArtist);
        await artist.save();

        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
    }
});

export default ArtistRouter;