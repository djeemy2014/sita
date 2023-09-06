import './App.css';

import { useRef, useEffect } from "react";
import { 
  Viewer, 
  Entity, 
  PointGraphics, 
  EntityDescription, 
  Camera, 
  Scene, 
  Primitive, 
  Cesium3DTileset,
  CameraFlyTo 
} from "resium";
import { Cartesian3 } from "cesium";
import {
  Ion, IonResource,
  createWorldTerrainAsync, 
  UrlTemplateImageryProvider, 
  createOsmBuildingsAsync,
  Matrix4 
} from "cesium"

Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU"
const terrainProvider = await createWorldTerrainAsync();
const osm = UrlTemplateImageryProvider({
  url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
})

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const position_cam = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 10000000);
const position_cam_2 = Cartesian3.fromDegrees(90,90,90);
const position_cam_3 = Cartesian3.fromDegrees(-90,-90,-90);
/* const orientation_cam = {
  heading: Cesium.Math.toRadians(20.0),
  pitch: Cesium.Math.toRadians(20.0),
  roll:0
}; */

function App() {
  let Camera_0=Camera
  //Camera_0.defaultProps.position=position_cam
  //console.log(Camera_0.defaultProps.direction)
  return (
    <Viewer  full  timeline={false} terrainProvider={terrainProvider} baseLayer={osm} >
      {/* <Cesium3DTileset url={IonResource.fromAssetId(96188)} /> */}
      <Scene>
      <Camera_0 position={position_cam}>
      </Camera_0>
      <Entity position={position} name="Tokyo">
        <PointGraphics pixelSize={10} />
        <EntityDescription>
          <h1>Hello, world.</h1>
          <p>JSX is available here!</p>
        </EntityDescription>
      </Entity>
      </Scene>
    </Viewer>
  );
}

export default App;