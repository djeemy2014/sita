import { render } from 'react-dom';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Cesium from './components/Cesium.js'
import Test_Scene from './components/TestComponent.js'



function App() {
  return(
  <div>
    <h1>Начнем с нуля</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/startCesium" element={<Cesium />} />
        <Route path="/testCesium" element={<Test_Scene />} />
      </Routes>
    </BrowserRouter>
    
  </div>
  
  )
}

export default App;

function Layout(){
  return(
    <div>

    
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/startCesium">startCesium</Link>
          </li>
        </ul>
      </nav>
      </div>
  )
}