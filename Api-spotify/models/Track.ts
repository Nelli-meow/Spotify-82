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
        ref: "Album",
    },
    duration: {
        type: String,
    },
});

const Track = mongoose.model('Track', TracksSchema);
export default Track;