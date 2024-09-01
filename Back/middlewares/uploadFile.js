import multer from "multer";
import fs from "fs";

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        if(req.headers['path']){
            let path;
            if (!fs.existsSync(req.headers['path'])){
                path = fs.mkdirSync(req.headers['path'],{recursive:true});
            }else{
                path = req.headers['path'];
            }
            cb(null,path);
        }else{
            cb('Please Send me path in headers',null);
        }
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
});

export const uploadFile = multer({
    storage: fileStorage,
    limits: {fileSize: 5000 * 1024 * 1024}
})

