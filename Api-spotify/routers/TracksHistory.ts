import express from "express";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";

const TracksHistoryRouter = express.Router();

TracksHistoryRouter.get("/:userId", async (req , res) => {
    try {
        const { userId } = req.params;

        const tracks = await TrackHistory.find({ userId: userId }).populate("trackId");

        if (!tracks || tracks.length === 0) {
            res.status(404).send({ message: "Tracks not found" });
            return;
        }

        console.log(tracks);

        res.status(200).send(tracks);
    } catch (error) {
        res.status(500).send({error: 'Something went wrong'});
    }
});


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

        const tracks = await TrackHistory.find({ trackId }).populate("trackId");
        const trackHistory = new TrackHistory({
            userId: user._id,
            trackId: track._id,
        });

        await trackHistory.save();
        const savedTrackHistory = await TrackHistory.findById(trackHistory._id).populate("trackId");

        console.log(savedTrackHistory);

        res.status(201).send(savedTrackHistory);
    }catch (error) {
        res.status(500).send({error: 'An error occurred'});
    }
});


export default TracksHistoryRouter;