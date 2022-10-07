import react, {useState, useEffect} from 'react';
import api from "../../config/configApi.js"

const Home = () => {
    
  const [image, setImage] = useState('');
  const [imageDelete, setImageDelete] = useState('');

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
    </div>
  );

}

export default Home;