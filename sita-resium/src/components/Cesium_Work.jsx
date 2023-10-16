import "./css/TestComponent.css" 

import testCesiumElemet from './testCesiumElemet'
import InputChekbox from "./workerComponents/InputChecked"
import NavBarLayer from "./workerComponents/NavBarLayer"
//import CreateGeoJsonComponents from "./workerComponents/CreateGeoJsonComponents"
import CreateGeoJsonComponent from "./workerComponents/CreateGeoJsonComponent"
import {listToObj,objToList} from './workerComponents/objList.js'

import {
    createRef, 
    Component, 
    useState, 
    useRef} from 'react'
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


const setingScene = await fetch('http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/testScena2.json')
const setingSceneJSON = await setingScene.json()
//const setingSceneObj = await setingSceneJSON добавить createRef()?
function CameraFlyToProps(positionCam){
    const [once, setOnce] = useState(false);
    return(
            <>
                <button
                    style={{ position: "absolute", bottom:"-40", zIndex:"40" }}
                    onClick={() => setOnce(o => !o)}>
                    Once: {once.toString()}
                  </button>
                  <CameraFlyTo
                    duration={5}
                    destination={Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000)}
                    once={once}
                  />
            </>
    )
}



class DJeemyComponentCesium extends Component{
    constructor(props) {
        super(props);
        this.startPosition = Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
        this.state={
            startOptionPosition:{},
            optionPosition:false,
            startPosition:true
        }
        this.refStartPosition = createRef();
        this.viewerRef = createRef();
        this.sceneRef = createRef();
        this.cameraRef = createRef();
        this.pointRef = createRef()
        this.checked = createRef()
        this.server = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
        this.layersParams=objToList(setingSceneJSON.list)
        this.layers=[]
        this.litLayer=[]
        this.listGeoJSON=[]
        this.layersParams.forEach((elem, index)=>{elem.index=index; elem.ref=createRef(); this.layers[index]=elem.ref;})
        
        //записываеться в один this как массив дальше циклом со пробегаеться по всем параметром и обявляет создание ссылки и работает с кадым параметром отдельно.
        
        
      }
      homeButton(e) {
        console.log(e);
        console.log(this.state.optionPosition);
        e.cancel = true;
        //Where you want to fly	
        this.viewerRef.current.cesiumElement.camera.flyTo({
            destination: this.startPosition
        });
        }
      async componentDidUpdate(prevProps,prevState){
        if (this.state.optionPosition.cancel!==prevState.optionPosition.cancel){
            console.log(this.state.optionPosition)
        }

      }

      async componentDidMount() {
        //console.log(this.layers)
        //this.layersParams.forEach((elem, index)=>{this.layers[index]=createRef();})
        
/*         const litLayer = this.layersParams.map((elem, index)=>
            
            <InputChekbox id={elem.uid} name={elem.name} reff={this.layers[index]} defaultChecked={elem.default} />
        )
        const listGeoJSON = this.layersParams.map((elem, index)=>
            <CreateGeoJsonComponent ref={this.layers[index]} obj={elem} server={this.server}/>
        ) */
        
        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
        testCesiumElemet(this.viewerRef)
        .then(async (viewer)=>{
            //настройка viewer
            //let camera = viewer.current.cesiumElement
            //console.log(viewer.current.cesiumElement.homeButton.viewModel.command)
            //viewer.current.cesiumElement.homeButton.viewModel.command.beforeExecute.addEventListener(e=>{this.homeButton(e)});

            //const extent = RectangleCesium.fromDegrees(117.940573,-29.808406,118.313421,-29.468825);
            //camera.current.cesiumElement.DEFAULT_VIEW_RECTANGLE = extent;
            //camera.current.cesiumElement.DEFAULT_VIEW_FACTOR = 0;
            viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
            viewer.current.cesiumElement.terrainProvider= await CesiumTerrainProviderCesium.fromIonAssetId(2279465)
            
            
            //console.log(viewer.current.cesiumElement)
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
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
            //console.log(camera.current.cesiumElement)
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
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
            //point.current.cesiumElement.show=document.getElementById('chekPoint').checked
            
            //console.log(point.current.cesiumElement)
            //console.log(CartographicCesium.fromCartesian(point.current.cesiumElement.position._value))
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
        })
        .catch(console.log)


        
      }

    render(){
        this.layersParams.forEach((elem, index)=>{
            this.listGeoJSON[index]=<CreateGeoJsonComponent layerRef={this.layers[index]} obj={elem} server={this.server}/>;
            //передавать весь elem и диструктурировать по получению ...elem
        })
        /* let i=0
        setInterval(()=>{
            if (i<20){
                const v = this.cameraRef.current
                console.log(i,v)
                i++
            }
            
        },1 ) */
        return (
            <div className="viewerBox">
                <div className="toolbar">
                    <NavBarLayer 
                        layers={this.layers} 
                        layersParams={this.layersParams}
                        viewerRef={this.viewerRef} 
                        startPosition={this.startPosition}
                    />
                </div>
                <div>
                    <Viewer id="viewerTest"  ref={this.viewerRef} timeline={false} homeButton={false} animation={false}>
                        <Camera ref={this.cameraRef} />
                        {/* <CameraFlyTo
                            duration={10}
                            destination={Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000)}
                            once={false}
                        /> */}
                        {/* <CameraFlyToProps /> */}
                        <Scene ref={this.sceneRef} />
                        <>
                            {this.listGeoJSON}
{/*                             <GeoJsonDataSource ref={this.layer} />
                            <GeoJsonDataSource ref={this.layers.layer2} />
                            <GeoJsonDataSource ref={this.layers.layer3} /> */}
                        </>
                        <Entity ref={this.pointRef} />
                    </Viewer>

                </div>
               
            </div> 
        )
    }
}

export default DJeemyComponentCesium