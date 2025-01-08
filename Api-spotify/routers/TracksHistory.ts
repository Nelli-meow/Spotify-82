import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";

const TracksHistoryRouter = express.Router();

TracksHistoryRouter.post("/", async (req, res) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            res.status(401).send({ error: "Unauthorized: Token is missing" });
            return;
        }

        const user = await User.findOne({ token });
        if (!user) {
             res.status(401).send({ error: "Unauthorized: Invalid token" });
            return;
        }

        const { trackId } = req.body;
        if (!trackId) {
             res.status(400).send({ error: "Track ID is missing" });
            return;
        }


        const track = await Track.findById(trackId);
        if (!track) {
             res.status(404).send({ error: "Track not found" });
            return;
        }

        const trackHistory = new TrackHistory({
            userId: user._id,
            trackId: track._id,
        });

        await trackHistory.save();

        res.status(201).send(trackHistory);
    }catch (error) {
        res.status(500).send({error: 'An error occurred'});
    }
});

export default TracksHistoryRouter;