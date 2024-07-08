import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    englishName: {
        type: String,
        unique: [true, 'Category already exists'],
        required: [true, 'Category field can not be empty'],
        trim:true
    },
    name: {
        type: String,
        unique: [true, 'Category already exists'],
        required: [true, 'Category field can not be empty'],
    },
    submenu: {
        type: [Object],
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        trim:true
    },
}, { timestamps: true });

CategorySchema.pre('save', function(next){
    if (this.slug) {
        next();
    } else {
        this.slug = slugify(this.englishName, { 'lower': true });
        next();
    };
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;