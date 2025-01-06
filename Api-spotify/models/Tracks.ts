import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
        ref: "Albums",
    },
    duration: {
        type: String,
    },
});

const Tracks = mongoose.model('Tracks', TracksSchema);
export default Tracks;