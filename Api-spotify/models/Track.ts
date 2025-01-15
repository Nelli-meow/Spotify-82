import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
        ref: "Album",
    },
    duration: {
        type: String,
    },
    number: {
        type: Number,
        required: true,
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;