//import { render } from 'react-dom';
import './App.css';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cesium from './components/Cesium'
// import './components/css/TestComponent.css'
import Test_Scene from './components/TestComponent.js'
import ExampleComponent from './components/useEfect.js'
import DJeemyComponentCesium from './components/Cesium_Work.jsx'
import CesiumProgert from './components/Cesium_First_project';
import AssetMap from './components/Problem_2020'



function App() {
  return(
  <div>
    {/* <h1>Начнем с нуля</h1> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/startCesium" element={<Cesium />} />
        {/* <Route path="/testCesium" element={<Test_Scene />} /> */}
        <Route path="/testCesium" element={
        <CesiumProgert
          
        />
        } />
        <Route path="/useEfect" element={<ExampleComponent />} />
        {/* <Route path="/problen" element={<AssetMap />} />
        <Route path="/layer" /> */}
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
            <Link to="/startCesium">Проект отработки алгоритмов Cesium</Link>
          </li>
          <li>
            <Link to="/testCesium">Первый проект на Cesium</Link>
          </li>
          <li>
            <Link to="/useEfect">Проект отработки алгоритмов React</Link>
          </li>
          <li>
            <a href='file:///O:/1_%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD/%D0%91%D1%83%D1%85%D0%B0%D1%80%D0%B8%D0%BD%20%D0%98.%D0%90/Cesium/FirstStep/GetStarted.htm'>Проект Бухарин</a>
            {/* <Link to="file:///O:/1_%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD/%D0%91%D1%83%D1%85%D0%B0%D1%80%D0%B8%D0%BD%20%D0%98.%D0%90/Cesium/FirstStep/GetStarted.htm">Проект Бухарин</Link> */}
          </li>
        </ul>
      </nav>
      </div>
  )
}