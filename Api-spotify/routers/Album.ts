import express from "express";
import Albums from "../models/Albums";

const AlbumsRouter = express.Router();

AlbumsRouter.get("/", async (req, res) => {
    try {
        const album = await Albums.find().populate("artist");
        res.status(200).send(album);
    } catch (error) {
        console.log(error);
    }
});

AlbumsRouter.post("/", async (req, res) => {
    try {

        const { artist, year } = req.body;

        if(!artist || !year) {
            res.status(400).send('artist is required');
        }

        const newYear = new Date().toString();

        const newAlbum = {
            name: req.body.name,
            photo: req.body.photo,
            year: newYear,
            artist: req.body.artist,
        }

        const album = new Albums(newAlbum);
        await album.save();

        res.status(200).send(album);
    } catch (error) {
        console.log(error);
    }
});

export default AlbumsRouter;