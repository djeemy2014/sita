
import {Component, useRef, useEffect, createRef, useLayoutEffect } from "react";
import { 
  Viewer, 
  Entity, 
  PointGraphics, 
  EntityDescription, 
  Camera, 
  Scene, 
  Primitive, 
  Cesium3DTileset,
  CameraFlyTo,
  ScreenSpaceEventHandler,
  ScreenSpaceEvent,
  CesiumComponentRef,
  
} from "resium";
import { Cartesian3 } from "cesium";
import {
  Ion, IonResource,
  createWorldTerrainAsync, 
  UrlTemplateImageryProvider, 
  createOsmBuildingsAsync,
  Matrix4,
  Cartographic,
  Camera as Camera_Cesium,
  Viewer as Viewer_Cesium,
  Math as Math_Cesium,
  ScreenSpaceEventHandler as ScreenSpaceEventHandler_Cesium,
  ScreenSpaceEventType as ScreenSpaceEventType_Cesium,
  Scene as Scene_Cesium
} from "cesium"

Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU"
const terrainProvider = await createWorldTerrainAsync();
const osm = UrlTemplateImageryProvider({
  url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
})

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const position_cam = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 10000);
/* const orientation_cam = {
  heading: Cesium.Math.toRadians(20.0),
  pitch: Cesium.Math.toRadians(20.0),
  roll:0
}; */


function Test_Scene() {
  //Camera_0.defaultProps.position=position_cam
  //console.log(Camera_0.defaultProps.direction)

  let position_camera=Cartographic.fromCartesian(position_cam)
  const viewRef = createRef();
  const sceneRef = useRef(null);
  const moveCamRef = useRef(null);
  const moveMouse = useRef(null);
  console.log(1, moveMouse)
  let move_position=null

  function onResize() {
    console.log(2,moveMouse.current)
    setTimeout((ev)=>{
      if (moveMouse.current?.cesiumElement&&sceneRef.current?.cesiumElement) {
        console.log(3,moveMouse)
        moveMouse.current.cesiumElement.setInputAction((ev)=>{
          //console.log(sceneRef.current.cesiumElement.pickPosition(ev))
          let posit=Cartographic.fromCartesian(position_cam)
          console.log("longitude",Math_Cesium.toDegrees (posit.longitude))
          console.log("latitude" ,Math_Cesium.toDegrees (posit.latitude))
          console.log("height",posit.height)
          console.log(ev)
          console.log(sceneRef.current.cesiumElement)
          console.log(Cartographic.fromCartesian(sceneRef.current.cesiumElement.pickPosition(ev.position)))

        },ScreenSpaceEventType_Cesium.LEFT_CLICK)

      } else{}
    },1)
    
    }
    //window.addEventListener("resize", onResize);
   //--> call it after component is rendered
 
  useEffect( () => {
    onResize()
    
    //return window.removeEventListener("resize", onResize);

  },)
  

  return (
    <div>
      <h1>Привет</h1>
    <Viewer full timeline={false} terrainProvider={terrainProvider} baseLayer={osm} ref={viewRef}>
      {/* <Cesium3DTileset url={IonResource.fromAssetId(96188)} /> */}
      <Camera ref={moveCamRef} position={position_cam}>
      </Camera>
      
      <ScreenSpaceEventHandler ref={moveMouse} />
      <Scene pickTranslucentDepth={true} ref={sceneRef}>
      
      <Entity position={position} name="Tokyo">
        <PointGraphics pixelSize={10} />
        <EntityDescription>
          <h1>Hello, world.</h1>
          <p>JSX is available here!</p>
        </EntityDescription>
      </Entity>
      </Scene>
    </Viewer>
    </div>
  );
}

export default Test_Scene;