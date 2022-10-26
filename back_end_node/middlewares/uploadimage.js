import multer from "multer";
import imagens from "../models/imagensModel.js";

const upload = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString().slice(1,8) + "_" + file.originalname)
            imagens.push({
                nome:Date.now().toString().slice(1,8) + "_" + file.originalname,
                visivel:true
            })  
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if(extensaoImg){
            return cb(null, true);
        }

        return cb(null, false);
    }
});

export default upload;
