import "./css/TestComponent.css"

import {
  //Component, 
  useRef, useEffect, createRef, useState } from "react";
import { 
  Viewer, 
  Entity, 
  PointGraphics, 
  EntityDescription, 
  Camera, 
  Scene, 
  //Primitive, 
  //Cesium3DTileset,
  //CameraFlyTo,
  ScreenSpaceEventHandler,
  //ScreenSpaceEvent,
  //CesiumComponentRef,
  
} from "resium";
import { Cartesian3 } from "cesium";
import {
  Ion, 
  //IonResource,
  createWorldTerrainAsync, 
  UrlTemplateImageryProvider, 
  //createOsmBuildingsAsync,
  //Matrix4,
  Cartographic,
  //Camera as Camera_Cesium,
  //Viewer as Viewer_Cesium,
  Math as Math_Cesium,
  //ScreenSpaceEventHandler as ScreenSpaceEventHandler_Cesium,
  ScreenSpaceEventType as ScreenSpaceEventType_Cesium,
  //Scene as Scene_Cesium,
  PointGraphics as PointGraphics_Cesium,
  Color as Color_Cesium
} from "cesium"



Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU"
//const terrainProvider = await createWorldTerrainAsync();
const osm = UrlTemplateImageryProvider({
  url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
})

const position = Cartesian3.fromDegrees(37.83286602793491,44.73759821071079, 100);
const positionRedPoint = Cartesian3.fromDegrees(37.83286602793491,44.73759821071079, 1000);
const position_cam = Cartesian3.fromDegrees(37.83286602793491, 44.73759821071079, 10000);
const position_orient={
  destination : position_cam,
  orientation : {
    heading : Math_Cesium.toRadians(0), // east, default value is 0.0 (north)
    pitch : Math_Cesium.toRadians(-90),    // default value (looking down)
    roll : 0.0 
  }
}
/* const orientation_cam = {
  heading: Cesium.Math.toRadians(20.0),
  pitch: Cesium.Math.toRadians(20.0),
  roll:0
}; */


function Test_Scene() {
  //Camera_0.defaultProps.position=position_cam
  //console.log(Camera_0.defaultProps.direction)

  //let position_camera=Cartographic.fromCartesian(position_cam)
  const viewRef = createRef();
  const sceneRef = useRef(null);
  const positCamRef = useRef(null);
  const moveMouse = useRef(null);
  const redPoint = useRef(null);
  const [seconds, setSeconds] = useState(new Date().toString());
  //const [move_position, setMove_position]=useState(0)
  let move_position=10

  function redPointF(){
    if (redPoint.current?.cesiumElement){
      const pointGrap=new PointGraphics_Cesium
      pointGrap.color = Color_Cesium.fromRgba('0xFF0000ff')
      pointGrap.pixelSize = 10
      redPoint.current.cesiumElement.position=positionRedPoint
      redPoint.current.cesiumElement.name="Red Point"

      redPoint.current.cesiumElement.point=pointGrap
      console.log(11,redPoint.current.cesiumElement)
    }
  }

  function camPosition(){
    
    if (positCamRef.current?.cesiumElement){
      positCamRef.current.cesiumElement.setView(position_orient)
      console.log(positCamRef.current.cesiumElement)
    }
  }

  function pickPositionCam() {
      if (moveMouse.current?.cesiumElement&&sceneRef.current?.cesiumElement) {
        moveMouse.current.cesiumElement.setInputAction((ev)=>{
          //console.log(sceneRef.current.cesiumElement.pickPosition(ev))
          let posit=Cartographic.fromCartesian(sceneRef.current.cesiumElement.camera.position)
          let parametr={
            "longitude":Math_Cesium.toDegrees (posit.longitude),
            "latitude":Math_Cesium.toDegrees (posit.latitude),
            "height":posit.height,
            heading : Math_Cesium.toDegrees (sceneRef.current.cesiumElement.camera.heading), 
            pitch : Math_Cesium.toDegrees (sceneRef.current.cesiumElement.camera.pitch), 
            roll : Math_Cesium.toDegrees (sceneRef.current.cesiumElement.camera.roll), 
          }

          //console.log(ev)
          console.log(parametr)
          //setMove_position(move_position=>Math_Cesium.toDegrees (sceneRef.current.cesiumElement.camera.heading))
          move_position=Math_Cesium.toDegrees (sceneRef.current.cesiumElement.camera.heading)
          console.log(move_position)
          //console.log(Cartographic.fromCartesian(sceneRef.current.cesiumElement.pickPosition(ev.position)))

        },ScreenSpaceEventType_Cesium.LEFT_CLICK)

      } 
    
    }
    //window.addEventListener("resize", onResize);
   //--> call it after component is rendered
   /* useEffect(()=>{
    
    const timer = setInterval(() => {
      setSeconds(seconds => new Date().toString());
    }, 500);
   }) */
  useEffect( () => {
    setTimeout(()=>{
      pickPositionCam();
      camPosition();
      
      //redPointF()
    },1)
    setTimeout(()=>{
      redPointF();
    },500)
    
    //return window.removeEventListener("resize", onResize);

  },)
  

  return (
    <div>
      
      
      <div id="viewer" >
      <Viewer 
        full
        /* style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} */ 
        timeline={false}  
        baseLayer={osm} 
        ref={viewRef}
      >
          <div id="toolbar">
            <h1>Привет</h1>
            <h3>{seconds}</h3>
            <input type="checkbox"></input>
            <p>{move_position}</p>
          </div>
      {/* <Cesium3DTileset url={IonResource.fromAssetId(96188)} /> */}
      <Camera ref={positCamRef} />      
      <ScreenSpaceEventHandler ref={moveMouse} />
      <Scene pickTranslucentDepth={true} ref={sceneRef}>
      
      <Entity position={position} name="Tokyo">
        <PointGraphics pixelSize={10} />
        <EntityDescription>
          <h1>Hello, world.</h1>
          <p>JSX is available here!</p>
        </EntityDescription>
      </Entity>
      <Entity ref={redPoint}>

      </Entity>
      </Scene>
    </Viewer>
        </div>
    
    </div>
  );
}

export default Test_Scene;