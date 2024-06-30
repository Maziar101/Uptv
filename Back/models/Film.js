import mongoose from "mongoose";
import slugify from "slugify";

const filmSchema = new mongoose.Schema({
    posterX: {
        type: String,
        required: [true, 'Please Provide an PosterX For Film'],
    },
    posterY:{
        type: String,
        required: [true, 'Please Provide an PosterY For Film'],
    },
    filmPath: {
        type: String,
        required: [true, 'Please Provide Film'],
    },
    englishName: {
        type: String,
        required: [true, 'Please Provide an English Name'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please Provide a Name'],
        unique: true,
    },
    CategoriesId: {
        type: [String],
        required: [true, 'Please Provide Category Name'],
    },
    ageLimit: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    players: {
        type: [String],
        required: true,
    },
    Director: {
        type: String,
        required: true,
    },
    imdbRate: {
        type: Number,
        required: true,
    },
    imdbLink: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        mex: 4,
    },
    like: {
        type: String,
        required: true,
    },
    dislike: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
}, { timeStamps: true });

filmSchema.pre('save', function (next) {
    if (this.slug) {
        next();
    } else {
        this.slug = slugify(this.englishName, { 'lower': true });
    }
});

const Film = mongoose.model('Film', filmSchema);
export default Film;