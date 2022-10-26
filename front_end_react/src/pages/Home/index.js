import react, {useState, useEffect} from 'react';
import api from "../../config/configApi.js"
import "./styles.css"

const Home = () => {
    
  const [image, setImage] = useState('');
  const [imageMap, setImageMap] = useState([]);
  const [imageDelete, setImageDelete] = useState('');

  useEffect(() => {
    getImages()
  },[])

  const uploadImage = async e => {
    e.preventDefault();
    console.log("uploadimage");
    const formData = new FormData();
    formData.append('image',image);

    const headers = {
      'headers': {
        'Content-Type': 'application/json',
        "Acess-Control-Allow-Origin":"*"
      }
    }

    await api.post("/upload-image",formData, headers)
    .then((response) => {
      console.log(response);
    }).catch((err) =>{
      if(err.response){
        console.log(err.response);
      }
      else{
        console.log("Erro: Tente mais tarde!");
      }
    })
  }

  const DeleteImage = async (name) =>{
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }

    const params = {
      'filename':name
    }

    await api.delete("/delete-image",{data:params},headers)
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

  const getImages = async () => {
    const headers = {
        'headers': {
          'Content-Type': 'application/json',
        }
      }

  await api.get("/list-imagens",headers)
  .then((response) => {
    setImageMap(response.data.imagens);
    console.log(response.data.imagens)
  }).catch((err) => {

    if(err.response){
      console.log(err.response);
    }
    else{
      console.log("Erro: Tente mais tarde!");
    }

  });
}

const alterar = async (nome) => {
  const headers = {
    'headers': {
      'Content-Type': 'application/json'
    }
  }

  const data = {
    'filename':nome
  }
  await api.patch("/vizualizacao",data,headers)
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

  const handleChange = async (event) => {
    setImageDelete(event.target.value);
  }

  return (
    <div className="App">
      <h1>Upload</h1>
      <form onSubmit={uploadImage}>
      <label htmlFor="">imagem: </label>
      <input type="file" name="imagem" onChange={e => setImage(e.target.files[0])}/> 

      <button type="submit">Salvar</button>
      <br /><br />
      {image && <img alt="imagem enviada" src={URL.createObjectURL(image)}/>}

      </form>
      <h1>Delete</h1>
      <form onSubmit={e => e.preventDefault(e)}>
          <label>Digite o nome da imagem: </label>
          <input onChange={e => handleChange(e)} ></input>
          <button type='submit' onClick={() => DeleteImage(imageDelete)}>deletar</button>
      </form>

      <div>
        <h1>Imagens</h1>
        {imageMap.map((foto) => {
         return foto.visivel === true?
           <div className='cardImage'>
            <img
              style={{height:"80px"}}
              src={`http://localhost:8180/file/${foto.nome}`}
            />
            <button onClick={() => {
              alterar(foto.nome)
              getImages()
            }}>
                arquivar
            </button>
          </div>
          :
          (<div className='cardImage'>
            <img
              style={{height:"80px"}}
              src={`http://localhost:8180/file/${foto.nome}`}
            />
            <button onClick={() => {
              alterar(foto.nome)
              getImages()
            }}>
                desaquivar
            </button>
          </div>
          )
        })}
      </div>
    </div>
  );

}

export default Home;