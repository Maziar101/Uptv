import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    englishName: {
        type: String,
        unique: [true, 'Category already exists'],
        require: [true,'englishName field is required'],
        trim:true
    },
    name: {
        type: String,
        unique: [true, 'Category already exists'],
        require: [true,'name field is required'],
        
    },
    submenu: {
        type: [],
        default: null,
        unique: false,
        index:false
    },
    slug: {
        type: String,
        unique: true,
        trim:true
    },
}, { timestamps: true });

CategorySchema.pre('save', function(next) {
    if (this.englishName) {
        this.slug = slugify(this.englishName, { lower: true });
        if(this.submenu){
            this.submenu.map((sub)=>{
                sub.slug = this.slug + "/" + sub.englishName;
            });
        }else{
            next();
        }
    }
    next();
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;