//import { render } from 'react-dom';
import './App.css';
import {BrowserRouter, Routes, Route, Link , useSearchParams} from "react-router-dom";
import Cesium from './components/Cesium'
// import './components/css/TestComponent.css'
import Test_Scene from './components/TestComponent.js'
import ExampleComponent from './components/useEfect.js'
import DJeemyComponentCesium from './components/Cesium_Work.jsx'
import CesiumProgert from './components/Cesium_First_project';
import ListProjekt from './components/ListProject.tsx'
import AssetMap from './components/Problem_2020'

const Users =()=>{
  const [searchParams] = useSearchParams();
  
  return <div>{JSON.stringify(Object.fromEntries([...searchParams]))}</div>
}

function App() {
  
  return(
    

    
  <div>
    {/* <h1>Добро пожаловать</h1> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/startCesium" element={<Cesium />} />
        {/* <Route path="/testCesium" element={<Test_Scene />} /> */}
        <Route path="/testCesium" element={
        <CesiumProgert
          
        />
        } />
        <Route path="/params" element={
          <Users />
        } />
        <Route path="/projects" element={
            <ListProjekt url={'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/projects.json'} />
        
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
    <div className='perentStartList'>
    <div className='startList'>
      <div className='img-start'>
        <img src='logo--circle--sita----is-a-hindu-goddess-and-the-f.svg'></img>
      </div>
      <div className='titel'>
      <h1>Добро пожаловать</h1>
      </div>
    
    
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/startCesium">Проект отработки алгоритмов Cesium</Link>
          </li>
          <li>
            <Link to="/useEfect">Проект отработки алгоритмов React</Link>
          </li>
          <li>
            <Link to="/">Проект отработки алгоритмов Аутантификации</Link>
          </li>
          <li>
            <Link to="/projects">Список проектов на Cesium</Link>
          </li>
          <li>
            <Link to="/params?sort=uid">Отработка строкового запроса</Link>
          </li>
          <li>
            <Link to="/testCesium">Первый проект на Cesium, ТРК Каспийский кластер, v0.1</Link>
          </li>
          <li>
            <Link to="/testCesium?uid=26f844ac-33ad-4660-a085-58263d903b20">Первый проект на Cesium, ТРК Каспийский кластер, v0.1.1</Link>
          </li>
          
          <li>
            <Link to="/TVSCesium">Проект на Cesium, ТРК Каспийский кластер, v0.2</Link>
          </li>
          {/* <li>
            <a href='file:///O:/1_%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD/%D0%91%D1%83%D1%85%D0%B0%D1%80%D0%B8%D0%BD%20%D0%98.%D0%90/Cesium/FirstStep/GetStarted.htm'>Проект Бухарин</a>
            <Link to="file:///O:/1_%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD/%D0%91%D1%83%D1%85%D0%B0%D1%80%D0%B8%D0%BD%20%D0%98.%D0%90/Cesium/FirstStep/GetStarted.htm">Проект Бухарин</Link> 
          </li> */}
        </ul>
      </nav>
      </div>
      </div>
  )
}