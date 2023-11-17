//import "./css/TestComponent.css" 

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
    createOsmBuildingsAsync,
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
    Cesium3DTileset as Cesium3DTilesetCesium,
    Credit as CesiumCredit,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'
import Button from 'react-bootstrap/Button';

//console.log(a)
//const b = objToList2(a)
//console.log(b)
//console.log(...listToObj2(b))
const setingScene = await fetch('http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/testScena.json')
const setingSceneJSON = await setingScene.json()
//console.log(objToList2(a))

//const setingSceneObj = await setingSceneJSON добавить createRef()?


// function  NavListGeoJSON(props){
//     const comprops=props.comprops
//     const listConnectGeoJSON=props.listConnectGeoJSON
//     const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
//     //const inputList=objToList(inputObj)//??
//     const ref=useRef()
//     const proxiUrl = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'//???

//     //console.log(ref)
    
//     if (Array.isArray(comprops.list)){
//         //console.log(comprops.type)
//         const contener=(
//           <ul>
//             <input 
//             //checked={props.greny===undefined?listLi:(props.greny&&listLi)} 
//             checked={showStat} 
//             type="checkbox" 
//             onChange={
//               ()=>{
//                 setShowStat(!showStat)
//                 //console.log(showStat)
//               }
    
//               }/>
//             <button onClick={()=>setShowStat(!showStat)}>Class</button>
//             {props.greny===undefined?null:(props.greny&&showStat).toString()}
//             {' '+comprops.name}
//             {/* listLi.toString() */}
            
            
//             {comprops.list.map((ev)=>{
//                 if (ev.type.indexOf('class')===-1){
            
//                     const laeyr = (
//                     <CreateGeoJsonComponent 
//                     layerRef={ref} 
//                     obj={ev} 
//                     server={proxiUrl}
//                     showStat={props.greny===undefined?showStat:(props.greny&&showStat)}
//                     />
//                     )
//                     listConnectGeoJSON.push(laeyr)
//                     //console.log(lk++,comprops);
//                     //console.log(laeyr);
//                     //console.log(listConnectGeoJSON);
//                   }
//               const mylticontener=NavListGeoJSON ({
//                 comprops:ev, 
//                 greny:props.greny===undefined?showStat:(props.greny&&showStat) ,
//                 setGreny:setShowStat,
//                 listConnectGeoJSON:props.listConnectGeoJSON
//               })
//               const contener= mylticontener[0]
//               return [contener,listConnectGeoJSON]
//             })}
//           </ul>
//         )
//         //console.log(listConnectGeoJSON)
//         return [contener,listConnectGeoJSON]
        
        
//       }else {
//         //console.log(props.comprops.name, props.greny)
//         //console.log(listLi)
//         //console.log(comprops.type)
        
//         const contener=(<li>
//              <input 
//             //checked={props.greny===undefined?null:(props.greny&&showStat)} 
//             checked={showStat} 
//             type="checkbox" 
//             onChange={()=>setShowStat(!showStat)}
//             />
//             <button onClick={()=>setShowStat(!showStat)}>Li</button>
//             {props.greny===undefined?null:(props.greny&&showStat).toString()}
//             {showStat}
//             {' '}
//             {/* showStat.toString() */}
           
            
//             {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
//           </li>)
//         return [contener,listConnectGeoJSON]
//       }



// }

// function DJeemyHookCesium(props){
//   const startPosition= Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
//   const server='http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
//   const viewerRef=useRef(null)
//   const cameraRef=useRef(null)
//   const sceneRef=useRef(null)
//   const pointRef=useRef(null)
  
//   const layersParams=objToList(setingSceneJSON.list)
//   console.log(layersParams)
//   let layers=[]
//   let listGeoJSON=[]
//   layersParams.forEach(
//     (elem, index)=>{elem.index=index; 
//         elem.ref=createRef(); 
//         layers[index]=elem.ref;
//     })
//   layersParams.forEach((elem, index)=>{
//     listGeoJSON[index]=<CreateGeoJsonComponent layerRef={layers[index]} obj={elem} server={server}/>;
//     //передавать весь elem и диструктурировать по получению ...elem
//   })
//   const multi = NavListGeoJSON(({
//     comprops:setingSceneJSON,
//     listConnectGeoJSON:[]
//   }))
//   const listNav = multi[0]
//   const listGeoJSON2 = multi[1]

//   Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
      
//   testCesiumElemet(viewerRef)
//   .then(async (viewer)=>{
//       //настройка viewer
//       viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
//       viewer.current.cesiumElement.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(2279465)

//   })
//   .catch(console.log)
//   testCesiumElemet(cameraRef)
//         .then(async (camera)=>{
//           camera.current.cesiumElement.setView(
//           {
//               destination : startPosition,
//               orientation : {
//                 heading : MathCesium.toRadians(0), // east, default value is 0.0 (north)
//                 pitch : MathCesium.toRadians(-90),    // default value (looking down)
//                 roll : 0.0 
//               }
//             }
//         )
//         })
//         .catch(console.log)
//     testCesiumElemet(pointRef)
//         .then(async (point)=>{
//             //настройка pointRef
//             const pointGrap=PointGraphicsCesium
//             pointGrap.color = ColorCesium.fromRgba('0xFF0000ff')
//             pointGrap.pixelSize = 10
//             pointGrap.heightReference=HeightReferenceCesium.CLAMP_TO_GROUND
//             pointGrap.show = true
//             point.current.cesiumElement.position=Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 100)
//             point.current.cesiumElement.name="Red Point"

//             point.current.cesiumElement.point=pointGrap
//             point.current.cesiumElement.description =`<h1>Установленная высота</h1></br><p> ${CartographicCesium.fromCartesian(point.current.cesiumElement.position._value).height}`
//             //point.current.cesiumElement.show=document.getElementById('chekPoint').checked
            
//             //console.log(point.current.cesiumElement)
//             //console.log(CartographicCesium.fromCartesian(point.current.cesiumElement.position._value))
//             //viewer.ref.current.cesiumElement.ConstructorOptions
            
//         })
//         .catch(1, console.log)
//   console.log(layersParams)
//   return(
//     <div className="viewerBox">
//         <div className="toolbar">
//             <NavBarLayer 
//                 layersParams={layersParams}
//                 viewerRef={viewerRef} 
//                 startPosition={startPosition}
//             />
            
//         </div>
//         {/* NavList({comprops:setingSceneJSON})[0] */}
//         {/* {listNav} */}
//         <div>
//             <Viewer id="viewerTest"  ref={viewerRef} timeline={false} homeButton={false} animation={false}>
//                 <Camera ref={cameraRef} />
//                 <Scene ref={sceneRef} />
//                 <>
//                     {listGeoJSON}
//                     {/* {listGeoJSON2} */}
//                 </>
//                 <Entity ref={pointRef} />
//             </Viewer>

//         </div>
       
//     </div> 
// )
// }


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
            createWorldTerrainAsync().then(elem=>{viewer.current.cesiumElement.terrainProvider=elem})
            console.log(viewer.current.cesiumElement.bottomContainer)
            //console.log()
            //inner
            //viewer.current.cesiumElement.bottomContainer.addStaticCredit( new CesiumCredit('<p>Привет МИР</p>', true))
            //viewer.current.cesiumElement.bottomContainer.innerHTML('<p>Привет МИР</p>')
            const bottomContainer = document.createElement("div")
            bottomContainer.className='cesium-viewer-bottom'
            //viewer.current.cesiumElement.bottomContainer=bottomContainer
            //viewer.current.cesiumElement.bottomContainer=undefined
            //document.querySelector()
            const myText = new CesiumCredit('<p>Привет МИР</p>', true)
            console.log(myText)
            console.log(bottomContainer)
            console.log(viewer.current.cesiumElement)
            console.log(viewer.current.cesiumElement.constructor)
            //createOsmBuildingsAsync().then(elem=>{viewer.current.cesiumElement.scene.primitives.add(elem)})
            //CesiumTerrainProviderCesium.fromIonAssetId(2279465).then(elem=>console.log(viewer.current.cesiumElement.terrainProvider=elem))
            //console.log(await createWorldTerrainAsync())
            //viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
            //viewer.current.cesiumElement.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(2279465)
        })
        .catch(console.log)
        testCesiumElemet(this.sceneRef)
        .then(async (scene)=>{
            //scene.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(1144816)
            //scene.terrainProvider= await Cesium3DTilesetCesium.fromIonAssetId(75343)
            //const osm = await createOsmBuildingsAsync()
            //scene.current.cesiumElement.primitives.add(osm)
            //createOsmBuildingsAsync().then(elem=>{scene.current.cesiumElement.primitives.add(elem)})
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
            //console.log(point)
            //console.log(pointGrap)
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
            this.listGeoJSON[index]=<CreateGeoJsonComponent obj={elem} server={this.server}/>;
            //передавать весь elem и диструктурировать по получению ...elem
        })
        return (
          <>
            <header>
              <div className="customer">
                <div  className="div-href">
                  <a href="https://xn--80aafvlc.xn--p1ai/">АО "КАВКАЗ РФ"</a>
                </div>
              </div>
              <div className="titel-header">
                <div  className="div-href">
                  <a href='#'>Проект</a>
                </div>
              </div>
              <div className="contractor" >
                <div  className="div-href">
                  <a href="https://mirproekt.ru/">ООО Градостроительный Институт "МИРПРОЕКТ"</a>
                </div>
              </div>
              
            </header>
            <div className="toolbar">
                    <NavBarLayer 
                        layers={this.layers} 
                        layersParams={this.layersParams}
                        layersParams3={this.layersParams3}
                        viewerRef={this.viewerRef} 
                        startPosition={this.startPosition}
                    />
                    
                </div>
            <div className="viewerBox">
              <div>
                
              </div>
                
                <div>
                    <Viewer 
                      className="viewer-class"
                      id="viewer"  
                      ref={this.viewerRef} 
                      animation={false}
                      baseLayerPicker={false}
                      fullscreenButton={false}
                      geocoder={false}
                      homeButton={false} 
                      timeline={false} 
                      //shadows={true}
                      //projectionPicker={true} //включение и выключение ортогональности
                      //infoBox={false} //бокс отображения информакции об объекте
                      sceneModePicker={false}
                      navigationHelpButton={false}
                      //creditContainer='<p>dsfdfsdc</p>'

                      //navigationInstructionsInitiallyVisible={false}
                    >
                        <Camera ref={this.cameraRef} />
                        <Scene ref={this.sceneRef} />
                        <Entity ref={this.pointRef} /> 
                        <>
                            {this.listGeoJSON}
                            {/* {this.listGeoJSON2} */}
                        </>
                        
                    </Viewer>

                </div>
               
            </div> 
            <footer>
              
            </footer>
            </>
        )
    }
}

/* function CollosDJeemy(props){
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
} */


export default DJeemyComponentCesium