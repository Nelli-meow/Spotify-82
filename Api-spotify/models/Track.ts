import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Album",
    },
    duration: {
        type: String,
    },
    number: {
        type: Number,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;