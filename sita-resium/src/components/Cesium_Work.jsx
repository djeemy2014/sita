//import "./css/TestComponent.css" 

import testCesiumElemet from './testCesiumElemet'
import NavBarLayer from "./workerComponents/NavBarLayer"
//import CreateGeoJsonComponents from "./workerComponents/CreateGeoJsonComponents"
import CreateGeoJsonComponent from "./workerComponents/CreateGeoJsonComponent"
import {objToList,objToList2,listToObj2} from './workerComponents/objList.js'

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
    Cesium3DTileset,
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
    Cesium3DTileStyle,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'
import Button from 'react-bootstrap/Button';


class DJeemyComponentCesium extends Component{
    constructor(props) {
        super(props);
        this.state={
          scene:props.scene,
          layersParams:listToObj2(objToList2(props.scene))[0],
          layers:[],
          listGeoJSON:[]
        }

        this.viewerRef = createRef();
        this.sceneRef = createRef();
        this.cameraRef = createRef();
        //this.pointRef = createRef()
        this.startPosition = Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
        this.server = props.server
        //this.layersParams=
        //this.layersParams2=objToList2(props.scene)//перерработать!!
        //this.layersParams=listToObj2(objToList2(props.scene))[0]//перерработать!!
        //this.layers=[]
        //this.listGeoJSON=[]
        //console.log(props.scene)
        //console.log(listToObj2(objToList2(props.scene))[0])
        /* objToList2(this.props.scene.list).forEach(
          (elem, index)=>{elem.index=index; 
              elem.ref=createRef(); 
              this.state.layers[index]=elem.ref;
              this.state.listGeoJSON[index]=<CreateGeoJsonComponent
              obj={elem} 
              server={this.server} 
              sceneRef={this.sceneRef} 
              onClicker={(elem)=>{this.desubleSelect(elem)}}
              />;
          }) */
        console.log(props)
        
        //записываеться в один this как массив дальше циклом со пробегаеться по всем параметром и обявляет создание ссылки и работает с кадым параметром отдельно.
        
        
      }
      desubleSelect(lookSelector=false,viewerRef=this.viewerRef){
        //lookSelector=false
        testCesiumElemet(viewerRef)
        .then(async (viewer)=>{
          //console.log(viewer.current.cesiumElement)
          if (lookSelector){
          //  console.log('блокирован')
          //viewer.current.cesiumElement.selectedEntityChanged.addEventListener(function(entity){
          //    
          ////  //console.log(entity.properties.CLASSID._value===900000050)
          ////  if (entity.properties.CLASSID._value===900000050) {
          ////    //console.log(entity)
          ////    console.log(viewer.current.cesiumElement.selectedEntity)
          viewer.current.cesiumElement.selectedEntity = undefined;
          ////    //return
          //
          //  }
          ////}
          //
          //);
          }
          
        }).catch(err=>{console.log('desubleSelect',err)})
        //.catch(console.log(316, 'desubleSelect'))
      }
      updeteScene(setState=this.setState){
        const setLayers=[]
        const setListGeoJSON=[]
        const setLayersParams = listToObj2(objToList2(this.props.scene))[0]
        objToList2(this.props.scene.list).forEach(
          
          (elem, index)=>{
            
            elem.index=index; 
              elem.ref=createRef(); 
              setLayers[index]=elem.ref;
              setListGeoJSON[index]=<CreateGeoJsonComponent
              obj={elem} 
              server={this.server} 
              sceneRef={this.sceneRef} 
              onClicker={(elem)=>{this.desubleSelect(elem)}}
              />;
          })
          
          this.setState({
            layers:setLayers, 
            listGeoJSON:setListGeoJSON, 
            scene:this.props.scene, 
            layersParams:setLayersParams
          })
          console.log(setLayers)
          console.log(setListGeoJSON)
          console.log(setLayersParams)
      }

      componentDidMount() {
        this.updeteScene()

        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
        testCesiumElemet(this.viewerRef)
        .then(async (viewer)=>{
            //настройка viewer
            //createWorldTerrainAsync().then(elem=>{viewer.current.cesiumElement.terrainProvider=elem})
            //viewer.current.cesiumElement.shadows
            //настройка тени
            //console.log(viewer.current.cesiumElement)
            //viewer.current.cesiumElement.resolutionScale =4.0
            //viewer.current.cesiumElement.resolutionScale =1.5
            //viewer.current.cesiumElement.resolutionScale =0.5
            const shadowMap = viewer.current.cesiumElement.shadowMap
            shadowMap.softShadows=false
            shadowMap.maximumDistance=5000
            shadowMap.size=1024*5
            shadowMap.darkness=0.4
            //viewer.current.cesiumElement.shadowMap.softShadows=true
            //viewer.current.cesiumElement.shadowMap.softShadows=true
            //console.log()
            //inner
            //viewer.current.cesiumElement.bottomContainer.addStaticCredit( new CesiumCredit('<p>Привет МИР</p>', true))
            //viewer.current.cesiumElement.bottomContainer.innerHTML('<p>Привет МИР</p>')
            const bottomContainer = document.createElement("div")
            bottomContainer.className='cesium-viewer-bottom'
            //viewer.current.cesiumElement.selectedEntityChanged.addEventListener(function(entity){
            //  //console.log(entity.properties.CLASSID._value===900000050)
            //  if (entity.properties.CLASSID._value===900000050) {
            //    //console.log(entity)
            //    console.log(viewer.current.cesiumElement.selectedEntity)
            //    //viewer.current.cesiumElement.selectedEntity = undefined;
            //    //return
            //  }
            //});
            //viewer.current.cesiumElement.bottomContainer=bottomContainer
            //viewer.current.cesiumElement.bottomContainer=undefined
            //document.querySelector()
            //const myText = new CesiumCredit('<p>Привет МИР</p>', true)
            //console.log(myText)
            //console.log(bottomContainer)
            //console.log(viewer.current.cesiumElement)
            //console.log(viewer.current.cesiumElement.constructor)
            //createOsmBuildingsAsync().then(elem=>{viewer.current.cesiumElement.scene.primitives.add(elem)})
            //CesiumTerrainProviderCesium.fromIonAssetId(2279465).then(elem=>console.log(viewer.current.cesiumElement.terrainProvider=elem))
            //console.log(await createWorldTerrainAsync())
            //viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
            //viewer.current.cesiumElement.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(2279465)
        }).catch(err=>{console.log('viewerRef',err)})
        //.catch(console.logconsole.log(316)
        testCesiumElemet(this.sceneRef)
        .then(async (scene)=>{
            //scene.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(1144816)
            //scene.terrainProvider= await Cesium3DTilesetCesium.fromIonAssetId(75343)
            //const osm = await createOsmBuildingsAsync()
            //scene.current.cesiumElement.primitives.add(osm)
            //createOsmBuildingsAsync().then(elem=>{scene.current.cesiumElement.primitives.add(elem)})
        }
        ).catch(err=>{console.log('sceneRef',err)})
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
        .catch(err=>{console.log('cameraRef',err)})

        // testCesiumElemet(this.pointRef)
        // .then(async (point)=>{
        //     //настройка pointRef
        //     const pointGrap=PointGraphicsCesium
        //     pointGrap.color = ColorCesium.fromRgba('0xFF0000ff')
        //     pointGrap.pixelSize = 10
        //     //pointGrap.heightReference=HeightReferenceCesium.CLAMP_TO_GROUND
        //     //pointGrap.show = true
        //     point.current.cesiumElement.position=Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 100)
        //     point.current.cesiumElement.name="Red Point"

        //     point.current.cesiumElement.point=pointGrap
        //     point.current.cesiumElement.description =`<h1>Установленная высота</h1></br><p> ${CartographicCesium.fromCartesian(point.current.cesiumElement.position._value).height}`
        //     //console.log(point.current.cesiumElement.description)
        //     //console.log(point)
        //     //console.log(pointGrap)
        //   })
        //   .catch(err=>{console.log('pointRef',err)})


        
      }
      componentDidUpdate(prevProps, prevState){
        //if ()
        
        if (this.props.scene.uid!==this.state.scene.uid){
          /* console.log(this.props.scene)
          console.log(this.state.scene)
          console.log(prevState.scene)
          console.log(prevProps.scene) */
          this.updeteScene()
          
        }

        //console.log(this.props.scene)
      //   if (false){
      //     console.log(this.state.scene)
      //     console.log(prevState.scene)
      //     console.log(prevProps.scene)


      //     /* objToList2(this.props.scene.list).forEach(
      //       (elem, index)=>{elem.index=index; 
      //           elem.ref=createRef(); 
      //           this.state.layers[index]=elem.ref;
      //           this.state.listGeoJSON[index]=<CreateGeoJsonComponent
      //           obj={elem} 
      //           server={this.server} 
      //           sceneRef={this.sceneRef} 
      //           onClicker={(elem)=>{this.desubleSelect(elem)}}
      //           />;
      //       }) */
      //   }
      //   if (false){

        
      //   console.log('обновление')
      //   console.log(this.props.scene)
      //   console.log(prevProps)
      //   console.log(prevState)
      //   console.log(this.state.layersParams)

      //   console.log(this.layers)
      //   this.layersParams=listToObj2(objToList2(this.props.scene))[0]//перерработать!!
      //   this.layers=[]
      //   this.listGeoJSON=[]
      //   objToList2(this.props.scene.list).forEach(
      //       (elem, index)=>{elem.index=index; 
      //           elem.ref=createRef(); 
      //           this.layers[index]=elem.ref;
      //           this.listGeoJSON[index]=<CreateGeoJsonComponent
      //           obj={elem} 
      //           server={this.server} 
      //           sceneRef={this.sceneRef} 
      //           onClicker={(elem)=>{this.desubleSelect(elem)}}/>;
      //       })
      //   console.log(this.layers)
      //   console.log(this.listGeoJSON)
      // }
      }
      componentWillUnmount(){
        console.log('размонтирование')
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
        return (
          <>
            <div className="toolbar">
                    <NavBarLayer 
                        layers={this.state.layers} 
                        //layersParams={this.layersParams}
                        layersParams={this.state.layersParams}
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
                      //animation={false}
                      baseLayerPicker={false}
                      fullscreenButton={false}
                      geocoder={false}
                      homeButton={false} 
                      //timeline={false} 
                      shadows={true}
                      terrainShadows={3}
                      //projectionPicker={true} //включение и выключение ортогональности
                      //infoBox={false} //бокс отображения информакции об объекте
                      sceneModePicker={false}
                      navigationHelpButton={false}
                      //creditContainer='<p>dsfdfsdc</p>'

                      //navigationInstructionsInitiallyVisible={false}
                    >
                        <Camera ref={this.cameraRef} />
                        <Scene ref={this.sceneRef} shadows={true}/>
                        <Cesium3DTileset 
                        //ref={this.tileset}
                        url={'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/geojson_tilesets/tileset.json'} 
                        style={
                          new Cesium3DTileStyle({
                            color: {
                              conditions: [["true", "color('red')"]],
                            },
                          })
                        }
                        //onReady={tileset => {
                        //  //this.tileset.current?.cesiumElement?.zoomTo(tileset);
                        //}}
                        />
                        {/* <Entity ref={this.pointRef} />  */}
                        <>
                            {this.state.listGeoJSON}
                            {/* {this.listGeoJSON2} */}
                        </>
                        
                    </Viewer>

                </div>
               
            </div> 
            </>
        )
    }
}



export default DJeemyComponentCesium