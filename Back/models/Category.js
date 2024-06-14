import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = mongoose.Schema({
    englishName:{
        type: String,
        unique: [true,'Category already exists'],
        required:[true,'Category field can not be empty'],
    },
    name:{
        type: String,
        unique: [true,'Category already exists'],
        required:[true,'Category field can not be empty'],
    },
    submenu:{
        type: Array,
        unique: true,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    },
},{timeStamps:true});

CategorySchema.pre('save',(next)=>{
    if(this.slug){
        next();
    }else{
        this.slug = slugify(this.englishName,{'lower':true});
        next();
    };
});

const Category = mongoose.model("Category",CategorySchema);
export default Category;