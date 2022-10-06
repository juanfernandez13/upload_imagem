import react, {useEffect, useState} from 'react';
import api from "../../config/configApi.js"


const ListImagens = () => {

    const [image,setImage] = useState();
    const set = async (response) => {
        setImage(response.data);
        console.log(image);
    }
    const getImages = async () => {

        

        const response = await api.get("/list-imagens",{headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          }});
          console.log(response);
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