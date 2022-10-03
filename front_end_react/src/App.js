import { BrowserRouter, Route, Routes } from 'react-router-dom';
import react, {useState} from 'react';
import Home from "../src/pages/Home"
import ListImagens from "../src/pages/ListImagens"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list' element={<ListImagens/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
