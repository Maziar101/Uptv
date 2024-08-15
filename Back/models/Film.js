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
    trailerPath: {
        type: String,
        required: [true, 'Please Provide Trailer'],
    },
    FilmPath:{
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
    categoriesId: {
        type: [String],
        required: [true, 'Please Provide Category Name'],
    },
    ageLimit: {
        type: Number,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    players: {
        type: String,
        required: true,
    },
    director: {
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
    filmStory: {
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