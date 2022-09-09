import Express from "express";
import uploadImage from "./middlewares/uploadimage.js";
import multer from "multer";
import cors from "cors";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/upload/users')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)  
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

const app = Express();
const PORT = 8180;

app.use((req,res,next) => {
    res.header("Acess-Control-Allow-Origin","*");
    res.header("Acess-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.header("Acess-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})


app.post("/upload-image", upload.single("image"), async(req, res) => {
    console.log(req.file);
    if(req.file){
        return res.json({
            erro:false,
            mensagem:"upload realizado com sucesso!"
       });
    }
    return res.status(400).json({
        erro:true,
        mensagem:"upload não realizado!"

    });

});

app.listen(PORT, () => {
    console.log(`Servidor inicializado na porta ${PORT}`);
});