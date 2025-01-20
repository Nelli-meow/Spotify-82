import express from "express";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";

const TracksHistoryRouter = express.Router();

TracksHistoryRouter.post("/", auth,  async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;

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