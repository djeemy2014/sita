import { render } from 'react-dom';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Cesium from './components/Cesium.js'
import Test_Scene from './components/TestComponent.js'
import ExampleComponent from './components/useEfect.js'
import AssetMap from './components/Problem_2020'



function App() {
  return(
  <div>
    <h1>Начнем с нуля</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/startCesium" element={<Cesium />} />
        <Route path="/testCesium" element={<Test_Scene />} />
        <Route path="/useEfect" element={<ExampleComponent />} />
        <Route path="/problen" element={<AssetMap />} />
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
          <li>
            <Link to="/testCesium">testCesium</Link>
          </li>
          <li>
            <Link to="/useEfect">useEfect</Link>
          </li>
          <li>
            <Link to="/problen">useEfect</Link>
          </li>
        </ul>
      </nav>
      </div>
  )
}