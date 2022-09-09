import Express from "express";
import upload from "./middlewares/uploadimage.js"
import cors from "cors";

const uploadImage = upload();
const app = Express();
const PORT = 8180;

app.use((req,res,next) => {
    res.header("Acess-Control-Allow-Origin","*");
    res.header("Acess-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.header("Acess-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})


app.post("/upload-image", uploadImage.single("image"), async(req, res) => {
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