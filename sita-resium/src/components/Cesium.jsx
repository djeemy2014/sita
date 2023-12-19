import {useRef, createRef} from 'react'
import testCesiumElemet from './testCesiumElemet'
import { Viewer as CesiumViewer, 
  Cesium3DTileStyle, 
  Math as MathCesium, 
  Cartesian3 as Cartesian3Cesium, 
  Cesium3DTileset as CesiumCesium3DTileset 
} from "cesium";
import { 
  Viewer ,
  Camera,
  Cesium3DTileset,
  Scene
} from 'resium'

export default function Cesium() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const sceneRef = useRef(null);
  const sceneRef2 = useRef(null);
  const cameraRef = useRef(null)
  //const startPosition= Cartesian3Cesium.fromDegrees(-1.3197004795898053, 0.6988582109, 40);
  const startPosition= Cartesian3Cesium.fromRadians(-1.3197004795898053, 0.6988582109, 1000);
//   cameraRef.current?.cesiumElement.setView(
//     {
//         destination : startPosition,
//         orientation : {
//           heading : MathCesium.toRadians(0), // east, default value is 0.0 (north)
//           pitch : MathCesium.toRadians(-90),    // default value (looking down)
//           roll : 0.0 
//         }
//       }
// )
// testCesiumElemet(ref2)
// .then((title)=>{
//   console.log(title.current.cesiumElement)
//   try {
//     CesiumCesium3DTileset.fromUrl(
//        "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
//     ).then((tile)=>{
//       title=tile
//       console.log(title) 
//     });
//     //scen.primitives.add(tileset); 
//   } catch (error) {
//     console.error(`Error creating tileset: ${error}`);
//   }
// }

// )
// .catch(err=>{console.log('cElemRef',err, ref2)})

testCesiumElemet(sceneRef)
.then((scena)=>{
  const scen = scena.current.cesiumElement
  console.log(scen)
  try {
    CesiumCesium3DTileset.fromUrl(
       "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
    ).then((tile)=>{
      scen.primitives.add(tile)
      console.log(tile)
    });
    //scen.primitives.add(tileset);
  } catch (error) {
    console.error(`Error creating tileset: ${error}`);
  }
})
.catch(err=>{console.log('cElemRef',err, sceneRef)})
/* testCesiumElemet(ref2)
          .then((tiles)=>{
            try{
              let tiles3d=tiles.current.cesiumElement
              tiles3d = new CesiumCesium3DTileset.fromUrl(
                'http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json')
              console.log(tiles3d)
            }
            catch{
              console.log(tiles)
            }
            
            //tiles.cu CesiumCesium3DTile.from
          }
          ) */
    //setTimeout(()=>(testCesiumElemet(cameraRef)
    //      .then(async (camera)=>{
    //          //настройка cameraRef
    //          cameraRef.current?.cesiumElement.setView(
    //              {
    //                  destination : startPosition,
    //                  orientation : {
    //                    heading : MathCesium.toRadians(0), // east, default value is 0.0 (north)
    //                    pitch : MathCesium.toRadians(-90),    // default value (looking down)
    //                    roll : 0.0 
    //                  }
    //                }
    //          )          
    //      })),200)
  return (
    <Viewer full ref={ref} >
      {/* <Cesium3DTileset
        ref={ref2}
        url='http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json'
        onTileLoad={tileset=>{
          console.log(tileset)
        }}
        onTileFailed={error=>{
          console.log(error)
        }}
        onLoad={tileset=>{
          console.log(tileset)
        }}
      //onReady={tileset => {
      //  ref.current?.cesiumElement?.zoomTo(tileset);
      //}}
      /> */}
      <Scene ref={sceneRef}/>
      <Camera ref={cameraRef} position={startPosition} />
      
    </Viewer >
  )
}