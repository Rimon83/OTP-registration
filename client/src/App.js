import {Toaster} from "react-hot-toast"
import './App.css';
import Register from './components/(register)/Register';
import { Route, Routes } from "react-router-dom";
import Verify from "./components/(verification)/Verify";
import HomePage from "./components/(homePage)/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
      <Toaster/>
      
    </div>
  );
}

export default App;
