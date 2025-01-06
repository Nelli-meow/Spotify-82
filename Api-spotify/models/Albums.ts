import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumsSchema = new Schema({
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


const Albums = mongoose.model('Albums', AlbumsSchema);
export default Albums;