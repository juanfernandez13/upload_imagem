import express from "express";
import upload from "./middlewares/uploadimage.js"
import cors from "cors";
import fs from 'fs';
import imagens from "./models/imagensModel.js";
import path from "path";

const uploadImage = upload();
const app = express();
const PORT = 8180;


app.use(express.json());
app.use('/file', express.static(path.resolve("C:/Users/Suporte/Documents/programacao/upload_imagem/back_end_node/public/")));
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use((req,res,next) => {
    res.header("Acess-Control-Allow-Origin","*");
    res.header("Acess-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.header("Acess-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization");
    
    next();
})

app.get("/list-imagens", async(req,res) =>{
    return res.json({
        imagens
    });
});

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
    console.log(req.body)
    const indexImage =  imagens.findIndex( findImage => findImage.nome == filename);
    console.log(indexImage)
    if(indexImage === -1){
        return res.status(404).json({
        filename:filename,
        message:"imagem não encontrada",
        imagensSalvas: imagens
    });
    }

    const pathImg = `C:/Users/Suporte/Documents/programacao/upload_imagem/back_end_node/public/${filename}`;
    fs.unlinkSync(pathImg);
    imagens.splice(indexImage,1);
    return res.status(200).json({
        message:"exclusão concluida"
    });
    }
);

app.patch("/vizualizacao",(req,res) =>{
    const {filename} = req.body;
    const indexImage =  imagens.findIndex( findImage => findImage.nome == filename);
    if(indexImage === -1){
        return res.status(404).json({
        filename:filename,
        message:"imagem não encontrada",
        imagensSalvas: imagens
    });
    }
    imagens[indexImage].visivel = !imagens[indexImage].visivel; 

    return res.status(200).json({
        filename:filename,
        message:"visualização alterada",
        imagensSalvas: imagens
    });

});

app.listen(PORT, () => {
    console.log(`Servidor inicializado na porta ${PORT}`);
});