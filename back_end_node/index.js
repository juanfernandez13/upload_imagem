import Express from "express";
import upload from "./middlewares/uploadimage.js"
import cors from "cors";
import fs from 'fs';
import imagens from "./models/imagensModel.js";

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

app.delete("/delete-image", (req,res) => {
    const {filename} = req.body;
    console.log(imagens)
    const indexImage =  imagens.findIndex( findImage => findImage == filename);
    console.log(indexImage)
    if(indexImage === -1){
        return res.status(404).json({
        filename:filename,
        message:"imagem não encontrada",
        imagensSalvas: imagens
    });
    }

    const pathImg = `C:/Users/Suporte/Downloads/upload_imagem-master/back_end_node/public/upload/users/${filename}`;
    fs.unlinkSync(pathImg);
    imagens.splice(indexImage,1);
    return res.status(200).json({
        message:"exclusão concluida"
    });
}
);


app.listen(PORT, () => {
    console.log(`Servidor inicializado na porta ${PORT}`);
});