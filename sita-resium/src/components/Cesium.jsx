import {useRef, createRef, useEffect} from 'react'
import testCesiumElemet from './testCesiumElemet'
import { Viewer as CesiumViewer, 
  Cesium3DTileStyle, 
  Math as MathCesium, 
  Cartesian3 as Cartesian3Cesium, 
  Cesium3DTileset as CesiumCesium3DTileset,
  Transforms as TransformsCesium,
  Cartographic,
  ImageryLayer as CesiumImageryLayer,
  UrlTemplateImageryProvider,
  GeographicTilingScheme,
  OpenStreetMapImageryProvider,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType
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
  //let lon = 37.62144589;
  //let lat = 55.75252130;
  //let h = 149.02;
  const startPosition= Cartesian3Cesium.fromDegrees(37.62144589, 55.75252130, 1000000  ); 
  //const startPosition= Cartesian3Cesium.fromRadians(-1.3197004795898053, 0.6988582109, 1000);
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
  const handler = new ScreenSpaceEventHandler(scen.canvas);
  console.log(handler)
  handler.setInputAction((elem)=>{
    console.log(elem)
    scen.pick(elem);
  }, ScreenSpaceEventType.LEFT_CLICK)
  /* try {
    CesiumCesium3DTileset.fromUrl(
       "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
    ).then((tile)=>{
      scen.primitives.add(tile)
      console.log(tile)
    });
    //scen.primitives.add(tileset);
  } catch (error) {
    console.error(`scena Error creating tileset: ${error}`);
  } */
})
.catch(err=>{console.log('cElemRef',err, sceneRef)})
testCesiumElemet(ref)
          .then((viewer)=>{
            const osm = new OpenStreetMapImageryProvider({
              url : 'https://a.tile.openstreetmap.org/'
          });
          const tms = new UrlTemplateImageryProvider({
            url :'http://localhost:18077/cesium_test/geodata/gdal_tiles2/{z}/{x}/{reverseY}.png',
            tilingScheme : new GeographicTilingScheme(),
            maximumLevel : 8
        });
          viewer.current.cesiumElement.imageryLayers.addImageryProvider(osm);
          viewer.current.cesiumElement.imageryLayers.addImageryProvider(tms);
          
          
        })
          .catch(err=>{console.log('camera',err, cameraRef)})
testCesiumElemet(ref2)
          .then((tiles)=>{
            console.log(tiles)
            try {
              const TILESET_OPTIONS = {
                show: true,
                cacheBytes: 536870912,
                skipLevelOfDetail: true,
                immediatelyLoadDesiredLevelOfDetail: true,
                maximumCacheOverflowBytes: 636870912,
                dynamicScreenSpaceErrorDensity: 0.0002,
                dynamicScreenSpaceErrorFactor: 24,
                dynamicScreenSpaceError: true,
              }
              const optionTile = {
                ...TILESET_OPTIONS,
                maximumScreenSpaceError: 16,
                //featureIdLabel: uniqueId(ID_PREFIX.TILE),
                skipLevelOfDetail: true,
                foveatedScreenSpaceError: true,
                foveatedTimeDelay: 0.0,
                baseScreenSpaceError: 64,
                skipLevels: 4,
                immediatelyLoadDesiredLevelOfDetail: false,
                dynamicScreenSpaceError: true,
                dynamicScreenSpaceErrorDensity: 2.0e-4,
                dynamicScreenSpaceErrorFactor: 24.0,
                dynamicScreenSpaceErrorHeightFalloff: 0.25,
                debugShowBoundingVolume: true,
              }
              /* const osm = new Cesium.OpenStreetMapImageryProvider({
                url : 'https://a.tile.openstreetmap.org/'
            }); */
              /* const tms = new UrlTemplateImageryProvider({
                url :'http://localhost:18077/cesium_test/geodata/gdal_tiles2/{z}/{x}/{reverseY}.png',
                tilingScheme : new GeographicTilingScheme(),
                maximumLevel : 8
            });
              const baseLayer = new CesiumImageryLayer.fromProviderAsync(tms);
              ref.current.cesiumElement.imageryLayers.addImageryProvider(tms); */
              
              CesiumCesium3DTileset.fromUrl(
                 //"http://localhost:18077/cesium_test/geodata/tileset_17792_6/tileset_6.json",
                 //"http://localhost:18077/cesium_test/geodata/tileset_17768/tileset.json",
                 "http://localhost:18077/cesium_test/geodata/tileset_18824/tileset_6.json",
                 optionTile
                 ).then((tile)=>{
                const scen = sceneRef.current.cesiumElement
                scen.primitives.add(tile)
                console.log(tile)
                tile.debugColorizeTiles = true;
              });
              CesiumCesium3DTileset.fromUrl(
                 //"http://localhost:18077/cesium_test/geodata/tileset_17792_6/tileset_6.json",
                 //"http://localhost:18077/cesium_test/geodata/tileset_17768/tileset.json",
                 "http://localhost:18077/cesium_test/geodata/tileset_18830/tileset_6.json",
                 optionTile
                 ).then((tile)=>{
                const scen = sceneRef.current.cesiumElement
                scen.primitives.add(tile)
                console.log(tile)
                console.log(ref.current.cesiumElement)
                //viewer.scene.primitives.add(tileset);
                tile.debugColorizeTiles = true;
                ref.current.cesiumElement.scene.camera.moveEnd.addEventListener(() => {
                ref.current.cesiumElement.scene.camera.moveStart.addEventListener(() => {
                  tile.debugFreezeFrame = true;
                });
                 
                ref.current.cesiumElement.scene.camera.moveEnd.addEventListener(() => {
                  tile.debugFreezeFrame = false;
                });
             });
              });
              
              //scen.primitives.add(tileset);
            } catch (error) {
              console.error(`scena Error creating tileset: ${error}`);
            }
            /* try {
              CesiumCesium3DTileset.fromUrl(
                 "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/MyTileCreat_3DTILES/tileset.json",
                  {debugShowBoundingVolume: true,}
                 ).then((tile)=>{
                //tile.modelMatrix = TransformsCesium.eastNorthUpToFixedFrame(
                //  Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 0)
                //);
                console.log(tile.modelMatrix)
                console.log(Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 0))
                console.log(Cartographic.fromDegrees(48.20366195893176, 42.19013569656324, 0))
                const scen = sceneRef.current.cesiumElement
                scen.primitives.add(tile)
                console.log(tile)
              });
              //scen.primitives.add(tileset);
            } catch (error) {
              console.error(`scena Error creating tileset: ${error}`);
            }
            try{
             // CesiumCesium3DTileset.fromUrl(
             //   "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
             //).then((tile)=>{
             // //tiles.current.cesiumElement = tile
             // //tiles.current.cesiumElement=tile
             //  //scen.primitives.add(tile)
             //  //console.log(tile)
             //});
            //   console.log(tiles3d)
                //let tiles3d=tiles.current.cesiumElement
                //tiles3d._url="http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
                
                //    console.log(tiles3d)
            //    tiles3d.fromUrl(
            //     "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
            //  )//.then((tile)=>{
            //   //sceneRef.primitives.add(tile)
            //    console.log(tile)
            //  });
              // tiles3d = new CesiumCesium3DTileset.fromUrl(
              //   'http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json')
              // console.log(tiles3d)
              console.log(tiles?.current?.cesiumElement)
            }
            catch{
              console.log(tiles)
            } */
            
            //tiles.cu CesiumCesium3DTile.from
          }
          )
          .catch(err=>{console.log('tiles3d',err, ref2)})
    testCesiumElemet(cameraRef)
          .then((camera)=>{
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
          .catch(err=>{console.log('camera',err, cameraRef)})
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
    // useEffect(()=>{
    //   testCesiumElemet(ref2)
    //       .then((tiles)=>{
    //         //console.log(tiles)
    //         try{
    //           CesiumCesium3DTileset.fromUrl(
    //             "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
    //          ).then((tile)=>{
    //           //tiles.current.cesiumElement = tile
    //           //tiles.current.cesiumElement=tile
    //            //scen.primitives.add(tile)
    //            //console.log(tile)
    //          });
    //         //   console.log(tiles3d)
    //             //let tiles3d=tiles.current.cesiumElement
    //             //tiles3d._url="http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
                
    //             //    console.log(tiles3d)
    //         //    tiles3d.fromUrl(
    //         //     "http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json"
    //         //  )//.then((tile)=>{
    //         //   //sceneRef.primitives.add(tile)
    //         //    console.log(tile)
    //         //  });
    //           // tiles3d = new CesiumCesium3DTileset.fromUrl(
    //           //   'http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json')
    //           // console.log(tiles3d)
    //           console.log(tiles?.current?.cesiumElement)
    //         }
    //         catch{
    //           console.log(tiles)
    //         }
            
    //         //tiles.cu CesiumCesium3DTile.from
    //       }
    //       )
    //       .catch(err=>{console.log('tiles3d',err, ref2)})
    // },[])
  return (
    <Viewer full ref={ref} 
      imageryProvider = {new OpenStreetMapImageryProvider({
        url : 'https://a.tile.openstreetmap.org/'
      })} 
      >
      <Cesium3DTileset
        ref={ref2}
        //url='http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json'
        //uri='http://10.0.5.190:18077/cesium_test/geodata/testModel/3dtiles/TilesetWithTreeBillboards/tileset.json'
        //  onTileLoad={()=>{
        //    console.log(111)
        //  }}
        //  onTileFailed={()=>{
        //   console.log(222)
        //  }}
        //  onReady ={()=>{
        //   console.log(333)
        //  }}
        // onLoad={tileset=>{
        //   console.log(tileset)
        // }}
        // onReady={tileset => {
        //  ref.current?.cesiumElement?.zoomTo(tileset);
        // }}
      />
      <Scene ref={sceneRef}/>
      <Camera ref={cameraRef} position={startPosition}  />
      
    </Viewer >
  )
}