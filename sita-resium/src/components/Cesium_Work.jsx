import "./css/TestComponent.css" 

import testCesiumElemet from './testCesiumElemet'
import NavBarLayer from "./workerComponents/NavBarLayer"
//import CreateGeoJsonComponents from "./workerComponents/CreateGeoJsonComponents"
import CreateGeoJsonComponent from "./workerComponents/CreateGeoJsonComponent"
import {listToObj,objToList,objToList2,listToObj2} from './workerComponents/objList.js'

import {
    createRef, 
    Component, 
    useState, 
    useRef,
    useEffect} from 'react'
import { 
    Viewer,
    Scene,
    Camera,
    Entity,
    CameraFlyTo,

    //CustomDataSource,
    GeoJsonDataSource
 } from 'resium'
import{
    Ion,
    //Terrain as TerrainCesium,
    EllipsoidTerrainProvider,
    createWorldTerrainAsync,
    Math as MathCesium,
    Cartesian3 as Cartesian3Cesium,
    PointGraphics as PointGraphicsCesium,
    Color as ColorCesium,
    HeightReference as HeightReferenceCesium,
    Cartographic as CartographicCesium,
    Rectangle as RectangleCesium,
    Camera as CameraCesium,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'
import Button from 'react-bootstrap/Button';

const a = {
  "uid": 1,
  "id":0,
  "type": "scena",
  "name": "testScena",
  "list":
  [
      {
              "id": 1,
              "uid": "001",
              "typecode": 201,
              "type": "layer",
              "name": "testLayer!",
              "path": "/VDC_4326.geojson",
              "defaultChecked": false
      },
      {
              "id": 2,
              "uid": "004",
              "typecode": 201,
              "type": "layer",
              "name": "Здания2",
              "path": "/bild_4326.geojson",
              "defaultChecked": false
      },
      {
              "id": 3,
              "uid": "005",
              "typecode": 201,
              "type": "layer",
              "name": "Здания3",
              "path": "/bild_4326.geojson",
              "defaultChecked": false
      },
      {
              "id": 4,
              "uid": "006",
              "typecode": 201,
              "type": "layer",
              "name": "Здания3",
              "path": "/bild_4326.geojson",
              "defaultChecked": false
      },
      {
              "id":20,
              "type": "class",
              "name": "Тестовый Класс",
              "defaultChecked": true,
              "list": [
                      {
                              "id": 6,
                              "uid": "002",
                              "typecode": 201,
                              "type": "layer",
                              "name": "Дороги",
                              "path": "/road_4326.geojson",
                              "defaultChecked": true,
                              "classname": "Тестовый Класс"
                      },
                      {
                          "id":21,
                          "type": "class",
                          "name": "Тестовый ПодКласс",
                          "defaultChecked": true,
                          "list": [
                                  {
                                      "id": 8,
                                      "uid": "003",
                                      "typecode": 201,
                                      "type": "layer",
                                      "name": "Здания",
                                      "path": "/bild_4326.geojson",
                                      "defaultChecked": false,
                                      "classname": "Тестовый Класс",
                                      "subclassname": "Тестовый ПодКласс"
                                  }
                          ]
                      },
                      {
                          "id":22,
                          "type": "class",
                          "name": "Тестовый ПодКласс2",
                          "defaultChecked": false,
                          "list": [
                                  {
                                          "id": 9,
                                          "uid": "003",
                                          "typecode": 201,
                                          "type": "layer",
                                          "name": "Здания 00",
                                          "path": "/bild_4326.geojson",
                                          "defaultChecked": true,
                                          "classname": "Тестовый Класс",
                                          "subclassname": "Тестовый ПодКласс"
                                  },
                                  {
                                          "id": 10,
                                          "uid": "003",
                                          "typecode": 201,
                                          "type": "layer",
                                          "name": "Здания 00",
                                          "path": "/bild_4326.geojson",
                                          "defaultChecked": true,
                                          "classname": "Тестовый Класс",
                                          "subclassname": "Тестовый ПодКласс"
                                  }
                          ]
                  }
              ]
      }
]
}
//console.log(a)
//const b = objToList2(a)
//console.log(b)
//console.log(...listToObj2(b))
const setingScene = await fetch('http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/testScena2.json')
const setingSceneJSON = await setingScene.json()
//console.log(objToList2(a))

//const setingSceneObj = await setingSceneJSON добавить createRef()?


function  NavListGeoJSON(props){
    const comprops=props.comprops
    const listConnectGeoJSON=props.listConnectGeoJSON
    const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
    //const inputList=objToList(inputObj)//??
    const ref=useRef()
    const proxiUrl = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'//???

    //console.log(ref)
    
    if (Array.isArray(comprops.list)){
        //console.log(comprops.type)
        const contener=(
          <ul>
            <input 
            //checked={props.greny===undefined?listLi:(props.greny&&listLi)} 
            checked={showStat} 
            type="checkbox" 
            onChange={
              ()=>{
                setShowStat(!showStat)
                //console.log(showStat)
              }
    
              }/>
            <button onClick={()=>setShowStat(!showStat)}>Class</button>
            {props.greny===undefined?null:(props.greny&&showStat).toString()}
            {' '+comprops.name}
            {/* listLi.toString() */}
            
            
            {comprops.list.map((ev)=>{
                if (ev.type.indexOf('class')===-1){
            
                    const laeyr = (
                    <CreateGeoJsonComponent 
                    layerRef={ref} 
                    obj={ev} 
                    server={proxiUrl}
                    showStat={props.greny===undefined?showStat:(props.greny&&showStat)}
                    />
                    )
                    listConnectGeoJSON.push(laeyr)
                    //console.log(lk++,comprops);
                    //console.log(laeyr);
                    //console.log(listConnectGeoJSON);
                  }
              const mylticontener=NavListGeoJSON ({
                comprops:ev, 
                greny:props.greny===undefined?showStat:(props.greny&&showStat) ,
                setGreny:setShowStat,
                listConnectGeoJSON:props.listConnectGeoJSON
              })
              const contener= mylticontener[0]
              return [contener,listConnectGeoJSON]
            })}
          </ul>
        )
        //console.log(listConnectGeoJSON)
        return [contener,listConnectGeoJSON]
        
        
      }else {
        //console.log(props.comprops.name, props.greny)
        //console.log(listLi)
        //console.log(comprops.type)
        
        const contener=(<li>
             <input 
            //checked={props.greny===undefined?null:(props.greny&&showStat)} 
            checked={showStat} 
            type="checkbox" 
            onChange={()=>setShowStat(!showStat)}
            />
            <button onClick={()=>setShowStat(!showStat)}>Li</button>
            {props.greny===undefined?null:(props.greny&&showStat).toString()}
            {showStat}
            {' '}
            {/* showStat.toString() */}
           
            
            {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
          </li>)
        return [contener,listConnectGeoJSON]
      }



}

function DJeemyHookCesium(props){
  const startPosition= Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
  const server='http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
  const viewerRef=useRef(null)
  const cameraRef=useRef(null)
  const sceneRef=useRef(null)
  const pointRef=useRef(null)
  
  const layersParams=objToList(setingSceneJSON.list)
  console.log(layersParams)
  let layers=[]
  let listGeoJSON=[]
  layersParams.forEach(
    (elem, index)=>{elem.index=index; 
        elem.ref=createRef(); 
        layers[index]=elem.ref;
    })
  layersParams.forEach((elem, index)=>{
    listGeoJSON[index]=<CreateGeoJsonComponent layerRef={layers[index]} obj={elem} server={server}/>;
    //передавать весь elem и диструктурировать по получению ...elem
  })
  const multi = NavListGeoJSON(({
    comprops:setingSceneJSON,
    listConnectGeoJSON:[]
  }))
  const listNav = multi[0]
  const listGeoJSON2 = multi[1]

  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
      
  testCesiumElemet(viewerRef)
  .then(async (viewer)=>{
      //настройка viewer
      viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
      viewer.current.cesiumElement.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(2279465)

  })
  .catch(console.log)
  testCesiumElemet(cameraRef)
        .then(async (camera)=>{
          camera.current.cesiumElement.setView(
          {
              destination : startPosition,
              orientation : {
                heading : MathCesium.toRadians(0), // east, default value is 0.0 (north)
                pitch : MathCesium.toRadians(-90),    // default value (looking down)
                roll : 0.0 
              }
            }
        )
        })
        .catch(console.log)
    testCesiumElemet(pointRef)
        .then(async (point)=>{
            //настройка pointRef
            const pointGrap=PointGraphicsCesium
            pointGrap.color = ColorCesium.fromRgba('0xFF0000ff')
            pointGrap.pixelSize = 10
            pointGrap.heightReference=HeightReferenceCesium.CLAMP_TO_GROUND
            pointGrap.show = true
            point.current.cesiumElement.position=Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 100)
            point.current.cesiumElement.name="Red Point"

            point.current.cesiumElement.point=pointGrap
            point.current.cesiumElement.description =`<h1>Установленная высота</h1></br><p> ${CartographicCesium.fromCartesian(point.current.cesiumElement.position._value).height}`
            //point.current.cesiumElement.show=document.getElementById('chekPoint').checked
            
            //console.log(point.current.cesiumElement)
            //console.log(CartographicCesium.fromCartesian(point.current.cesiumElement.position._value))
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
        })
        .catch(1, console.log)
  console.log(layersParams)
  return(
    <div className="viewerBox">
        <div className="toolbar">
            <NavBarLayer 
                layersParams={layersParams}
                viewerRef={viewerRef} 
                startPosition={startPosition}
            />
            
        </div>
        {/* NavList({comprops:setingSceneJSON})[0] */}
        {/* {listNav} */}
        <div>
            <Viewer id="viewerTest"  ref={viewerRef} timeline={false} homeButton={false} animation={false}>
                <Camera ref={cameraRef} />
                <Scene ref={sceneRef} />
                <>
                    {listGeoJSON}
                    {/* {listGeoJSON2} */}
                </>
                <Entity ref={pointRef} />
            </Viewer>

        </div>
       
    </div> 
)
}


class DJeemyComponentCesium extends Component{
    constructor(props) {
        super(props);
        this.startPosition = Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
        this.state={}
        this.viewerRef = createRef();
        this.sceneRef = createRef();
        this.cameraRef = createRef();
        this.pointRef = createRef()
        this.server = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
        this.layersParams=objToList(setingSceneJSON.list)
        this.layersParams2=objToList2(setingSceneJSON)//перерработать
        this.layersParams3=listToObj2(this.layersParams2)[0]//перерработать
        this.layers=[]
        this.listGeoJSON=[]
        this.layersParams.forEach(
            (elem, index)=>{elem.index=index; 
                elem.ref=createRef(); 
                this.layers[index]=elem.ref;
            })
        //console.log(this.layersParams)
        //console.log(this.layersParams2)
        //const multiContenet = NavList({comprops:setingSceneJSON})
        //this.test1=NavList({comprops:setingSceneJSON})
        //this.test2
        
        //записываеться в один this как массив дальше циклом со пробегаеться по всем параметром и обявляет создание ссылки и работает с кадым параметром отдельно.
        
        
      }


      async componentDidMount() {
        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
        testCesiumElemet(this.viewerRef)
        .then(async (viewer)=>{
            //настройка viewer
            viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
            viewer.current.cesiumElement.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(2279465)
        })
        .catch(console.log)
        testCesiumElemet(this.sceneRef)
        .then(async (scene)=>{
            //scene.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(1144816)
        }
        )
        testCesiumElemet(this.cameraRef)
        .then(async (camera)=>{
            //настройка cameraRef
            camera.current.cesiumElement.setView(
                {
                    destination : this.startPosition,
                    orientation : {
                      heading : MathCesium.toRadians(0), // east, default value is 0.0 (north)
                      pitch : MathCesium.toRadians(-90),    // default value (looking down)
                      roll : 0.0 
                    }
                  }
            )          
        })
        .catch(console.log)

        testCesiumElemet(this.pointRef)
        .then(async (point)=>{
            //настройка pointRef
            const pointGrap=PointGraphicsCesium
            pointGrap.color = ColorCesium.fromRgba('0xFF0000ff')
            pointGrap.pixelSize = 10
            pointGrap.heightReference=HeightReferenceCesium.CLAMP_TO_GROUND
            pointGrap.show = true
            point.current.cesiumElement.position=Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 100)
            point.current.cesiumElement.name="Red Point"

            point.current.cesiumElement.point=pointGrap
            point.current.cesiumElement.description =`<h1>Установленная высота</h1></br><p> ${CartographicCesium.fromCartesian(point.current.cesiumElement.position._value).height}`
        })
        .catch(console.log)


        
      }
      /* NavList(props){
        const navContener = NavListGeoJSON({
            comprops:props.comprops,
            listConnectGeoJSON:[]
        })
        console.log(navContener[1])
        console.log(navContener[0])
        return navContener
    } */

    render(){
        this.layersParams.forEach((elem, index)=>{
            this.listGeoJSON[index]=<CreateGeoJsonComponent layerRef={this.layers[index]} obj={elem} server={this.server}/>;
            //передавать весь elem и диструктурировать по получению ...elem
        })
        return (
            <div className="viewerBox">
                <div className="toolbar">
                    <NavBarLayer 
                        layers={this.layers} 
                        layersParams={this.layersParams}
                        layersParams3={this.layersParams3}
                        viewerRef={this.viewerRef} 
                        startPosition={this.startPosition}
                    />
                    
                </div>
                <div>
                    <Viewer id="viewerTest"  ref={this.viewerRef} timeline={false} homeButton={false} animation={false}>
                        <Camera ref={this.cameraRef} />
                        <Scene ref={this.sceneRef} />
                        <>
                            {this.listGeoJSON}
                            {/* {this.listGeoJSON2} */}
                        </>
                        <Entity ref={this.pointRef} />
                    </Viewer>

                </div>
               
            </div> 
        )
    }
}

function CollosDJeemy(props){
  const [inputList, setInputList]=useState(setingSceneJSON)
  const mylticontener=NavListGeoJSON({
    comprops:setingSceneJSON,
    listConnectGeoJSON:[]
})
  console.log(mylticontener)
  console.log(inputList)
  return <>
  {inputList.name}
  {inputList.defaultChecked}
  <button onClick={()=>{setInputList(inputList.defaultChecked)}}></button>
  <DJeemyComponentCesium 
    listGeoJSON2={mylticontener[1]}
    listNAV={mylticontener[0]}
  />
</>
}


export default DJeemyComponentCesium