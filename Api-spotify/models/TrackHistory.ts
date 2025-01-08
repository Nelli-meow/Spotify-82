import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    trackId: {
        type: Schema.Types.ObjectId,
        ref: "Track",
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;