import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Artist from "../models/Artist";

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
        const {id} = req.params;


        const albums = await Album.find({artist: id})
            .populate("artist")
            .sort({year: -1});

        if (!albums) {
            res.status(404).send("Album not found");
            return;
        }

        if (!id) {
            res.status(404).send("Not Found");
            return;
        }

        res.status(200).send(albums);
    } catch (error) {
        console.log(error);
    }
});

AlbumsRouter.post("/", imagesUpload.single('image'), auth, permit('user', 'admin'), async (req, res) => {
    try {

        const {artist, name} = req.body;

        if (!artist) {
            res.status(400).send('artist is required');
            return;
        }

        const newYear = new Date().toString();

        const existingArtist = await Artist.findById(artist);
        if(!existingArtist) {
            res.status(404).send("Artist Not Found");
            return;
        }

        const newAlbum: AlbumMutation = {
            name: name,
            image: req.file ? 'images' + req.file.filename : null,
            year: newYear,
            artist: artist,
        }


        const album = new Album(newAlbum);
        await album.save();

        res.status(200).send(album);
    } catch (error) {
        console.log(error);
    }
});

AlbumsRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const album = await Album.findById(id);
        if (!album) {
            res.status(404).send({message: "album not found"});
            return;
        }

        await Album.findByIdAndDelete(id);

        res.status(200).send({message: "album deleted successfully"});

    } catch (error) {
        res.status(500).send({error: "Something went wrong"});
    }
});

AlbumsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const album = await Album.findById(id);

        if (!album) {
            res.status(404).send({error: "Album not found"});
            return;
        }

        album.isPublished = !album.isPublished;
        await album.save();

        res.status(200).send({message: "Album publication status updated", album});
    } catch (error) {
        res.status(404).send({error: "something went wrong"});
    }
});

export default AlbumsRouter;