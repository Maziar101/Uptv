import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/media/Images');
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
});

const uploadImage = multer({
    storage: imageStorage,
});

export default uploadImage;