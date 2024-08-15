import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: [true, 'Please Provide text for Comment'] },
    author: { type: String, required: [true, 'Please Provide Author Name For Comment'] },
    authorId: { type: String, required: [true, 'Please Send Me Author Id'] },
    filmId: {
        type: mongoose.Types.ObjectId,
        ref: 'Film',
        required: [true, 'Please Provide Film Id For Comment']
    },
    seriesId: {
        type: mongoose.Types.ObjectId,
        ref: 'Series',
        required: [true, 'Please Provide Film Id For Comment']
    }
}, { timestamps: true });

const Comments = mongoose.model('Comments', commentSchema);
export default Comments;