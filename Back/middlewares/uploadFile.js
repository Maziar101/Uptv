import multer from "multer";

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        if(req.headers['path']){
            cb(null,req.headers['path']);
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

