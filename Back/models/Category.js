import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    englishName: {
        type: String,
        unique: [true, 'Category already exists'],
        required: [true, 'Category field can not be empty'],
    },
    name: {
        type: String,
        unique: [true, 'Category already exists'],
        required: [true, 'Category field can not be empty'],
    },
    submenu: {
        type: [mongoose.Types.ObjectId],
        ref:'Category',
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
}, { timeStamps: true });

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