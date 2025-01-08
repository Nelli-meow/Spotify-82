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
    },
    year: {
        type: String,
        required: true,
    }
});


const Album = mongoose.model('Album', AlbumSchema);
export default Album;