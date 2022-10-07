import react, {useEffect, useState} from 'react';
import api from "../../config/configApi.js"


const ListImagens = () => {

    const [image,setImage] = useState();
    const set = async (response) => {
        setImage(response.data);
        console.log(image);
    }
    const getImages = async () => {

        const headers = {
            'headers': {
              'Content-Type': 'application/json',
              "Accept":"*/*"
            }
          }

    await api.get("/list-imagens",headers)
    .then((response) => {
      console.log(response);
    }).catch((err) => {

      if(err.response){
        console.log(err.response);
      }
      else{
        console.log("Erro: Tente mais tarde!");
      }

    });
    }

    useEffect(() =>{
        getImages()
    });

    return (
        <div>
            <h1>oi</h1>
            <button onClick={getImages()}> clique aqui</button>
        </div>
    
    );
}

export default ListImagens;