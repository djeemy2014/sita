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
  Cesium3DTileset 
} from "resium";
import { Cartesian3 } from "cesium";
import {
  Ion, IonResource,
  createWorldTerrainAsync, 
  UrlTemplateImageryProvider, 
  createOsmBuildingsAsync } from "cesium"

Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU"
const terrainProvider = await createWorldTerrainAsync();
const osm = UrlTemplateImageryProvider({
  url: 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
})

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const position_cam = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 10000);

function App() {
  
  return (
    <Viewer  full  timeline={false} terrainProvider={terrainProvider} baseLayer={osm} >
      <Cesium3DTileset url={IonResource.fromAssetId(96188)} />
      <Scene>
      <Camera position={position_cam}>
      </Camera>
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