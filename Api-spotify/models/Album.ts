import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Artist',
    },
    photo: {
        type: String,
        default: null,
    },
    year: {
        type: Date,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});


const Album = mongoose.model('Album', AlbumSchema);
export default Album;