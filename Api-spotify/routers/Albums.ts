import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../models/Album";

const AlbumsRouter = express.Router();

AlbumsRouter.get("/", async (req, res) => {
    try {
        const album = await Album.find().populate("artist");
        res.status(200).send(album);
    } catch (error) {
        console.log(error);
    }
});

AlbumsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const album = await Album.findById(id).populate("artist");

        if (!id) {
            res.status(404).send("Not Found");
            return;
        }

        res.status(200).send(album);
    } catch (error) {
        console.log(error);
    }
});

AlbumsRouter.post("/", imagesUpload.single('image') , async (req, res) => {
    try {

        const { artist, year } = req.body;

        if(!artist || !year) {
            res.status(400).send('artist is required');
        }

        const newYear = new Date().toString();

        const newAlbum: AlbumMutation = {
            name: req.body.name,
            photo: req.file ? 'images' + req.file.filename : null,
            year: newYear,
            artist: req.body.artist,
        }

        const album = new Album(newAlbum);
        await album.save();


        res.status(200).send(album);
    } catch (error) {
        console.log(error);
    }
});

export default AlbumsRouter;