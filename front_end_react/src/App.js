import logo from './logo.svg';
import './App.css';
import react, {useState} from 'react';
import api from './config/configApi';

function App() {

  const [image, setImage] = useState('');

  const uploadImage = async e => {
    e.preventDefault();
    console.log("uploadimage");
    const formData = new FormData();
    formData.append('image',image);

    const headers = {
      'headers': {
        'Content-Type': 'application/json'
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

  return (
    <div className="App">
      <h1>Upload</h1>
      <form onSubmit={uploadImage}>
      <label htmlFor="">imagem: </label>
      <input type="file" name="imagem" onChange={e => setImage(e.target.files[0])}/> <br /> <br />

      {image && <img alt="imagem enviada" src={URL.createObjectURL(image)}/>}

      <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default App;
