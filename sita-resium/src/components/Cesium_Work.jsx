import "./css/TestComponent.css"
import testCesiumElemet from './testCesiumElemet'
import InputChekbox from "./InputChecked"

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
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'

const setingScene = await fetch('http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/testScena.json')
const setingSceneJSON = await setingScene.json()


class MyComponentCesium extends Component{
    constructor(props) {
        super(props);
        this.viewerRef = createRef();
        this.sceneRef = createRef();
        this.cameraRef = createRef();
        this.pointRef=createRef()
        this.checked=createRef()
        this.layer=createRef()
        this.layer2=createRef()
        this.layer3=createRef()
        //записываеться в один this как массив дальше циклом со пробегаеться по всем параметром и обявляет создание ссылки и работает с кадым параметром отдельно.
        
        
      }
      checkedShow(e){
        
        let shower=e.current.cesiumElement.show
        console.log(e)
        console.log(shower)
        shower?shower=false:shower=true
        console.log(shower)

      }
      async componentDidMount() {
        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
        testCesiumElemet(this.viewerRef)
        .then(async (viewer)=>{
            //настройка viewer
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
                    destination : Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000),
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
        let lay=setingSceneJSON.layer[0]
        testCesiumElemet(this.layer)
        .then(async (layer)=>{
            //console.log(await layer.current.cesiumElement)
            
            let url = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson'+setingSceneJSON.layer[0].path
            fetch(url,{
                            //mode: 'no-cors',
                            method: "get",
                            headers: {
                                 "Content-Type": "application/json"
                            },
                            //body: JSON.stringify(ob)
                        })
                        .then((res) => res.json())
                        .then((ev)=>{layer.current.cesiumElement.load(ev)})
            //layer.current.cesiumElement.show=document.getElementById('chek').checked
                //.then(console.log)
            //let commits = await response.json()
            //console.log(commits)
            //await layer.current.cesiumElement.load(lay)
        })
        testCesiumElemet(this.layer2)
        .then(async (layer)=>{
            //console.log(await layer.current.cesiumElement)
            
            let url = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson'+setingSceneJSON.layer[1].path
            fetch(url,{
                            //mode: 'no-cors',
                            method: "get",
                            headers: {
                                 "Content-Type": "application/json"
                            },
                            //body: JSON.stringify(ob)
                        })
                        .then((res) => res.json())
                        .then((ev)=>{
                            layer.current.cesiumElement.load(ev).then((dataSource)=>{
                                dataSource.entities.values.forEach((elem)=>{
                                    //elem.polygon.extrudedHeight=5
                                    //elem.polygon.extrudedHeightReference =1
                                    elem.polygon.heightReference=1
                                    elem.polygon.material=ColorCesium.fromBytes(
                                        255/elem.properties.fid.valueOf(),
                                        255/elem.properties.fid.valueOf(),
                                        255/elem.properties.fid.valueOf(),
                                        255)
                                })
                            })
                            
                            layer.current.cesiumElement.entities.values.forEach((elem)=>{
                                elem.polygon=undefined
                                /* console.log(elem.properties.fid.valueOf())
                                console.log(elem.polygon.heightReference)
                                elem.polygon.height =5
                                elem.polygon.heightReference='CLAMP_TO_GROUND'
                                console.log(elem.polygon.heightReference)
                                console.log(elem.polygon.material)
                                elem.polygon.material=ColorCesium.BLUE *//* (
                                    1/elem.properties.fid.valueOf(),
                                    1/elem.properties.fid.valueOf(),
                                    1/elem.properties.fid.valueOf(),
                                    1) */
                            })
                            //console.log(layer.current.cesiumElement.entities.values)
                        })
            //layer.current.cesiumElement.show=document.getElementById('chek').checked
                //.then(console.log)
            //let commits = await response.json()
            //console.log(commits)
            //await layer.current.cesiumElement.load(lay)
        })
        testCesiumElemet(this.layer3)
        .then(async (layer)=>{
            //console.log(await layer.current.cesiumElement)
            
            let url = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson'+setingSceneJSON.layer[2].path
            fetch(url,{
                            //mode: 'no-cors',
                            method: "get",
                            headers: {
                                 "Content-Type": "application/json"
                            },
                            //body: JSON.stringify(ob)
                        })
                        .then((res) => res.json())
                        .then((ev)=>{layer.current.cesiumElement.load(ev)})
            //layer.current.cesiumElement.show=document.getElementById('chek').checked
                //.then(console.log)
            //let commits = await response.json()
            //console.log(commits)
            //await layer.current.cesiumElement.load(lay)
        })

        
      }

    render(){

        return (
            <div id="viewer">
                <div id="toolbar">
                    <p>
                        Кнопки
                    </p>
                    <input defaultChecked type="checkbox" id="chekPoint" onChange={()=>{
                        this.pointRef.current.cesiumElement.show=document.getElementById('chekPoint').checked
                        //console.log(this.pointRef);console.log(this.checked)
                        //можно сделать отдельный конмонент/функцию чтобы рисовать основываясь на входных параметрах
                        }}>

                    </input>
                    <label>Red Point</label>
                    <br></br>
                    <InputChekbox id={setingSceneJSON.layer[0].uid} name={setingSceneJSON.layer[0].name} reff={this.layer} defaultChecked={setingSceneJSON.layer[0].default} />
                    <InputChekbox id={setingSceneJSON.layer[1].uid} name={setingSceneJSON.layer[1].name} reff={this.layer2} defaultChecked={setingSceneJSON.layer[1].default} />
                    <InputChekbox id={setingSceneJSON.layer[2].uid} name={setingSceneJSON.layer[2].name} reff={this.layer3} defaultChecked={setingSceneJSON.layer[2].default} />
                </div>
                <div>
                    <Viewer id="viewerTest"  ref={this.viewerRef} timeline={false} homeButton={false} animation={false}>
                        <Camera ref={this.cameraRef} /> 
                        <Scene ref={this.sceneRef} />
                        <>
                            <GeoJsonDataSource ref={this.layer} />
                            <GeoJsonDataSource ref={this.layer2} />
                            <GeoJsonDataSource ref={this.layer3} />
                        </>
                        <Entity ref={this.pointRef} />
                    </Viewer>

                </div>
               
            </div> 
        )
    }
}

export default MyComponentCesium