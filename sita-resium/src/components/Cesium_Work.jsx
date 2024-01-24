//import "./css/TestComponent.css" 

import testCesiumElemet from './testCesiumElemet'
import NavBarLayer from "./workerComponents/NavBarLayer"
//import CreateGeoJsonComponents from "./workerComponents/CreateGeoJsonComponents"
import CreateGeoJsonComponent from "./workerComponents/CreateGeoJsonComponent"
import InfoBar from "./workerComponents/InfoBar"
import {objToList,objToList2,listToObj2} from './workerComponents/objList.js'
//import asss from './css/InfoBox.css'
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
import {
    Ion,
    //Terrain as TerrainCesium,
    createOsmBuildingsAsync,
    EllipsoidTerrainProvider,
    createWorldTerrainAsync,
    Math as MathCesium,
    Globe as GlobeCesium,
    Cartesian3 as Cartesian3Cesium,
    Cartesian2 as Cartesian2Cesium,
    HorizontalOrigin as HorizontalOriginCesium,
    VerticalOrigin as VerticalOriginCesium,
    ScreenSpaceEventHandler as ScreenSpaceEventHandlerCesium,
    ScreenSpaceEventType as ScreenSpaceEventTypeCesium,
    PointGraphics as PointGraphicsCesium,
    Color as ColorCesium,
    HeightReference as HeightReferenceCesium,
    Cartographic as CartographicCesium,
    Rectangle as RectangleCesium,
    Camera as CameraCesium,
    Cesium3DTileset as Cesium3DTilesetCesium,
    Credit as CesiumCredit,
    Entity as EntityCesium,
    EntityCollection as EntityCollectionCesium,
    PostProcessStageLibrary as PostProcessStageLibraryCesium,
    Cesium3DTileStyle,
    InfoBox as InfoBoxCesium,
    InfoBoxViewModel as InfoBoxViewModelCesium,
    GeoJsonDataSource as GeoJsonDataSourceCesium,
    CesiumTerrainProvider as CesiumTerrainProviderCesium,
    SelectionIndicator as SelectionIndicatorCesium,
    defined as definedCesium,
    Resource as ResourceCesium,
    ModelGraphics as CesiumModelGraphics,
    DistanceDisplayCondition as DistanceDisplayConditionCesium,
    buildModuleUrl as buildModuleUrlCesium,
    JulianDate as JulianDateCesium,
    //Resource as ResourceCesium,
    Color,
} from 'cesium'
import {autobind} from "core-decorators"
//import Button from 'react-bootstrap/Button';



class DJeemyComponentCesium extends Component{
    constructor(props) {
        super(props);
        this.state={
          scene:props.scene,
          layersParams:listToObj2(objToList2(props.scene))[0],
          layers:[],
          listGeoJSON:[],
          mousePosition:undefined,
          infoBox:true,
          infoBarId:undefined,
          infoBarName:undefined,
          infoBarBody:undefined
        }

        this.viewerRef = createRef();
        this.sceneRef = createRef();
        this.cameraRef = createRef();
        //this.pointRef = createRef()
        this.startPosition = Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
        this.server = props.server
        this.handler = new ScreenSpaceEventHandlerCesium(this.sceneRef?.current?.cesiumElement.canvas);
        this.handlerAll = new ScreenSpaceEventHandlerCesium(this.sceneRef?.current?.cesiumElement.canvas);
        //this.layersParams=
        //this.layersParams2=objToList2(props.scene)//перерработать!!
        //this.layersParams=listToObj2(objToList2(props.scene))[0]//перерработать!!
        //this.layers=[]
        //this.listGeoJSON=[]
        //console.log(props.scene)
        //console.log(listToObj2(objToList2(props.scene))[0])
        //здание стабильных this
        this.setInfoBox = this.setInfoBox.bind(this)


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
          //this.handler = new ScreenSpaceEventHandlerCesium(this.sceneRef?.current?.cesiumElement.canvas);
          //this.handlerAll = new ScreenSpaceEventHandlerCesium(this.sceneRef?.current?.cesiumElement.canvas);
          //console.log(sceneRef.current.cesiumElement)
          // handler?.setInputAction((elem)=>{
          //   //this.setMousePosition(elem)
          //   //console.log(elem)
          // }, ScreenSpaceEventTypeCesium.MOUSE_MOVE)
          // console.log(handler)
        //console.log(props)
        
        //записываеться в один this как массив дальше циклом со пробегаеться по всем параметром и обявляет создание ссылки и работает с кадым параметром отдельно.
        
        
      }
      desubleSelect(lookSelector=false,viewerRef=this.viewerRef){
        //lookSelector=false
        testCesiumElemet(viewerRef)
        .then(async (viewer)=>{
          //console.log(viewer.current.cesiumElement)
          if (lookSelector){
          //console.log(viewer.current.cesiumElement)
          viewer.current.cesiumElement.selectedEntity = undefined;
                   //  console.log('блокирован')
          //viewer.current.cesiumElement.selectedEntityChanged.addEventListener(function(entity){
          //    
          ////  //console.log(entity.properties.CLASSID._value===900000050)
          ////  if (entity.properties.CLASSID._value===900000050) {
          ////    //console.log(entity)
          ////    //return
          //
          //  }
          ////}
          //
          //);
          }else{
            //console.log(viewer.current.cesiumElement.selectedEntity)
          }
          
        }).catch(err=>{console.log('desubleSelect',lookSelector,err)})
        //.catch(console.log(316, 'desubleSelect'))
      }
      functionMouse(elem=this.state.mousePosition){
        //console.log(elem)
        return elem
      }
      
      setDataInfoBox(entity){
        console.log(entity)
        /* this.setState({
          infoBox:!this.state.infoBox
        }) */
      }
      updateinfoBar(){}
      setInfoBox(id,name,inform,state=this.state, setState=this.setState){
        this.setState({
          infoBarId:id,
          infoBarName:name,
          infoBarBody:inform
        })
        console.log(state.infoBarBody)
        //console.log('1234')
      }
      selectedPick(position, scene){
        // const feature = scene.pick(position);
        //   console.log( feature)
      }
      setPickEntity(sceneRef=this.sceneRef,setInfoBox=this.setInfoBox){
        // function Pick(elem,sceneRef){
        //   console.log(sceneRef)
        //   const entityPick = sceneRef.current.cesiumElement.pick(elem)
        //   console.log(entityPick)
        // }
        // testCesiumElemet(this.sceneRef).then((scene)=>{
          
        //   this.handler.setInputAction((elem)=>{
        //     console.log(elem)
        //     Pick(elem, scene)
        //     //this.setDataInfoBox()
            
        //     console.log(scene)
        //     //console.log(this.setDataInfoBox)
        //     console.log(elem)
        //     }, ScreenSpaceEventTypeCesium.RIGHT_CLICK)
        // })
        
        this.handlerAll.setInputAction(function(movement) {
          //console.log(sceneRef)
          //const feature = sceneRef?.current?.cesiumElement.pick(movement.position);
          //console.log( feature.id)
          const feature = sceneRef?.current?.cesiumElement.pick(movement.position);
          const dataJ = new JulianDateCesium.fromDate(new Date())
          //console.log(feature?.id.description.valueOf())
          //console.log(feature?.id.description)
          //console.log(dataJ)
          console.log(feature?.id)
          const uid=feature?.id.id
          const name=feature?.id.name
          const htmlData=feature?.id.description.getValue(new JulianDateCesium.fromDate(new Date()))
          setInfoBox(uid,name,htmlData)
          
          //if(!!selectedPick){
          //  selectedPick(movement.position, sceneRef?.current?.cesiumElement)
          //}
          
          // if (feature instanceof Cesium.Cesium3DTileFeature) {
          //     feature.color = Cesium.Color.YELLOW;
          // }
      }, ScreenSpaceEventTypeCesium.LEFT_CLICK)
      }
      // onClickInfoBox(){
      //   console.log(this.state)
      //   //setInfoBox()
      // }
      updeteScene(setState=this.setState){
        const setLayers=[]
        const setListGeoJSON=[]
        const setListLyer=objToList2(this.props.scene)
        const setLayersParams = listToObj2(setListLyer)[0]
        //console.log(this.state)
        //console.log(this.props.scene)
        this.setState({
          layers:setLayers, 
          listGeoJSON:setListGeoJSON, 
          scene:this.props.scene, 
          layersParams:setLayersParams
        })
        this.functionMouse()
        // let position
        // let handler = new ScreenSpaceEventHandlerCesium(this.props.scene?.current?.cesiumElement.canvas);
        //   console.log(this.props.scene?.current?.cesiumElement)
        //   handler?.setInputAction((elem)=>{
        //     this.setMousePosition(elem)
        //     position=elem
        //     console.log(position)
        //   }, ScreenSpaceEventTypeCesium.MOUSE_MOVE)
        setListLyer.forEach(
          
          
          (elem, index)=>{
            
            elem.index=index; 
              elem.ref=createRef(); 
              setLayers[index]=elem.ref;
              //console.log(this.state.mousePosition)
              setListGeoJSON[index]=<CreateGeoJsonComponent
                obj={elem} 
                server={this.server}
                mousePosition={this.handler}
                //classifiers={this.props.scene.classifiers}
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RedLIne
                classifier={(this.props.scene.classifiers.filter(
                  (classElem)=>{
                    if (classElem.prototype===elem.prototype){
                      //console.log(classElem)
                      //console.log(elem)
                    }
                  return classElem.prototype===elem.prototype
                })[0]??this.props.scene.classifiers.classifiers)} 
                sceneRef={this.sceneRef} 
                onClicker={(elem)=>{this.desubleSelect(elem)}}
              />;
          })
          
          
          //console.log(setLayers)
          //console.log(setListGeoJSON)
          //console.log(setLayersParams)
      }
      setMousePosition(elem, setState=this.setState){
        this.setState({
          mousePosition:elem
        })
        //console.log(this.state.mousePosition)
        //return elem
      }
      
      // selectedEntityChangedSetColor(entity){//,viewerRef=this.viewerRef
      //   //console.log(entity)
      //   //testCesiumElemet(viewerRef)
      //   //.then((viewer)=>{console.log(viewer)})
      //   //console.log(viewerRef)
      //   try{
      //     if (entity.entityCollection.owner.name==="dptOKS"){
            
      //       //console.log(entity)
      //       let selectOKS=entity.entityCollection.values.filter((elem)=>{
      //         //console.log(elem.properties.NUMBER.valueOf())
      //         //let a = GlobeCesium.clone(elem)
      //         //console.log(elem)
      //         return elem.properties.NUMBER.valueOf()===entity.properties.NUMBER.valueOf()
      //       })
            
      //       selectOKS.forEach((elem)=>{
      //         //console.log(elem)
      //         elem.polygon.outline=true
      //         elem.polygon.outlineColor=ColorCesium.RED
      //       })
      //       //let a = new GlobeCesium.clone(selectOKS)
      //       //console.log(a)
      //     }
      //   }
      //   catch{
      //     console.log(`err 'selectedEntityChangedSetColor'`)
      //   }
        

      // }
      /* onMouseMove(movement) {
        //console.log(movement.endPosition)
        //const pickedFeature = viewer.current.cesiumElement.scene.pick(movement.endPosition);
        // If a feature was previously highlighted, undo the highlight
        silhouetteBlue.selected = [];
        const pickedFeature = viewer.current.cesiumElement.scene.pick(movement.endPosition);
        // Pick a new feature
        //const pickedFeature = viewer.current.cesiumElement.scene.pick(movement.endPosition);
    
        updateNameOverlay(pickedFeature, movement.endPosition);
    
        if (!definedCesium(pickedFeature)) {
          return;
        }
    
        // Highlight the feature if it's not already selected.
        if (pickedFeature !== selected.feature) {
          silhouetteBlue.selected = [pickedFeature];
        }
      }
 */
      componentDidMount() {
        this.updeteScene()
        //this.setPickEntity()

        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU";
        testCesiumElemet(this.viewerRef)
        .then(async (viewer)=>{
            //настройка viewer
            //createWorldTerrainAsync().then(elem=>{viewer.current.cesiumElement.terrainProvider=elem})
            //viewer.current.cesiumElement.shadows
            //настройка тени
            //console.log(viewer.current.cesiumElement)
            // viewer.current.cesiumElement.resolutionScale =4.0
            // viewer.current.cesiumElement.resolutionScale =1.5
            // viewer.current.cesiumElement.resolutionScale =0.5
            const shadowMap = viewer.current.cesiumElement.shadowMap
            shadowMap.softShadows=false
            shadowMap.maximumDistance=5000
            shadowMap.size=1024*5
            shadowMap.darkness=0.4
            //console.log(this.state.scene.id)
            // if (this.state.scene.id===3){
            //   console.log(this.state.scene.id)
            // }
            //viewer.current.cesiumElement.shadowMap.softShadows=true
            //viewer.current.cesiumElement.shadowMap.softShadows=true
            //console.log()
            //inner
            //viewer.current.cesiumElement.bottomContainer.addStaticCredit( new CesiumCredit('<p>Привет МИР</p>', true))
            //viewer.current.cesiumElement.bottomContainer.innerHTML('<p>Привет МИР</p>')
            // const bottomContainer = document.createElement("div")
            // bottomContainer.className='cesium-viewer-bottom'
            // const silhouetteBlue = PostProcessStageLibraryCesium.createEdgeDetectionStage();
            //   silhouetteBlue.uniforms.color = ColorCesium.BLUE;
            //   silhouetteBlue.uniforms.length = 0.01;
            //   silhouetteBlue.selected = [];
            
            // const selected = {
            //   feature: undefined,
            //   originalColor: new ColorCesium(),
            // };
            //viewer.current.cesiumElement.selectedEntityChanged.addEventListener(this.selectedEntityChangedSetColor)
            //viewer.current.cesiumElement.screenSpaceEventHandler.setInputAction(,
            //ScreenSpaceEventTypeCesium.MOUSE_MOVE);
            //viewer.current.cesiumElement.selectedEntityChanged.removeEventListener(this.selectedEntityChangedSetColor)
            //"Show Cartographic Position on Mouse Over",
            //function a () {
              
              
              
              // Mouse over the globe to see the cartographic position
               
            //}

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
            //viewer.current.cesiumElement.selectionIndicator 
            try{
              //console.log(!!viewer.current.cesiumElement.selectionIndicator)
              let selector = viewer.current.cesiumElement?.selectionIndicator 
              if (!selector.isDestroyed()){
                //selector.destroy()
              }
            }
            catch{
              //console.log(!!viewer.current.cesiumElement.selectionIndicator) 
              console.log('ошибка')
              
            }
           //.info-bar
           try{
            //const info = new InfoBoxCesium(document.querySelector('div.info-bar'))
            //const infoView = new InfoBoxViewModelCesium()
            //viewer.current.cesiumElement.infoBox=info
            //console.log(info)
            //console.log(viewer.current.cesiumElement.infoBox._element)
            //viewer.current.cesiumElement.infoBox._element=document.querySelector('div.info-bar')
            const frame=viewer.current.cesiumElement.infoBox.frame
            frame.addEventListener('load', function (elem) {
                //console.log(elem)
                const infoBar=document.querySelector('div.info-bar')
                console.log(frame)
                console.log(infoBar)
                //console.log(frame.children )
                //frame.appendChild(infoBar)
          //     var cssLink = frame.contentDocument.createElement('link');
          //     cssLink.href = buildModuleUrlCesium('./components/css/InfoBox.css');
          //     cssLink.rel = 'stylesheet';
          //     cssLink.type = 'text/css';
          //     frame.contentDocument.head.appendChild(cssLink);
           }, false)
            
            //console.log(viewer.current.cesiumElement.infoBox)

          }
          catch{console.log('ошибка2')}
            //console.log(viewer.current.cesiumElement.infoBox)
          }).catch(err=>{console.log('viewerRef',err)})
        //.catch(console.logconsole.log(316)
        testCesiumElemet(this.sceneRef)
        .then(async (scene)=>{
          //SelectionIndicatorCesium()
          this.setPickEntity()
          // if (PostProcessStageLibraryCesium.isSilhouetteSupported(scene.current.cesiumElement)){
            
          //   console.log() 
          //   const silhouetteBlue = PostProcessStageLibraryCesium.createEdgeDetectionStage();
          //   silhouetteBlue.uniforms.color = ColorCesium.BLUE;
          //   silhouetteBlue.uniforms.length = 0.01;
          //   silhouetteBlue.selected = [];

          //   const silhouetteGreen = PostProcessStageLibraryCesium.createEdgeDetectionStage();
          //   silhouetteGreen.uniforms.color = ColorCesium.LIME;
          //   silhouetteGreen.uniforms.length = 0.01;
          //   silhouetteGreen.selected = [];

          //  /*  scene.current.cesiumElement.postProcessStages.add(
          //     PostProcessStageLibraryCesium.createSilhouetteStage([
          //       silhouetteBlue,
          //       silhouetteGreen,
          //     ])
          //   ); */
          // }else{
          //   console.log(
          //     false
          //     ) 
          // }
          

          // const selected = {
          //   feature: undefined,
          //   originalColor: new ColorCesium(),
          // };
          //const pickedEntities = new EntityCollectionCesium()
          //console.log(this.pointRef)
          //console.log(1)
          // const selectedEntity = new EntityCesium();
          // const silhouetteBlue = PostProcessStageLibraryCesium.createEdgeDetectionStage();
          //   silhouetteBlue.uniforms.color = ColorCesium.BLUE;
          //   //silhouetteBlue.uniforms.length = 0.01;
          //   silhouetteBlue.selected = [];

          //   const silhouetteGreen = PostProcessStageLibraryCesium.createEdgeDetectionStage();
          //   silhouetteGreen.uniforms.color = ColorCesium.LIME;
          //   //.;silhouetteGreen.uniforms.length = 0.01;
          //   silhouetteGreen.selected = [];

          // // draw edges around feature0 and feature1 
          // scene.current.cesiumElement.postProcessStages.add(
          //   PostProcessStageLibraryCesium.createSilhouetteStage([silhouetteBlue,silhouetteGreen])
          //   );

         /*  let handler = new ScreenSpaceEventHandlerCesium(scene.current.cesiumElement.canvas);
          //console.log(scene.current.cesiumElement)
          handler?.setInputAction((elem)=>{
            this.setMousePosition(elem)
          }, ScreenSpaceEventTypeCesium.MOUSE_MOVE) */
           /* handler.setInputAction(function (movement) {
            console.log(movement)
           }) */
            
          //   /* // get an array of all primitives at the mouse position
          //   const pickedObjects = scene.current.cesiumElement.drillPick(movement.endPosition);
          //   //console.log(pickedObjects)
          //   console.log(pickedObjects) 
          //   silhouetteBlue.selected = [];

          //   // Pick a new feature
          //   const pickedFeature = scene.current.cesiumElement.pick(movement.endPosition);
          //   if (pickedFeature !== selected.feature) {
          //     silhouetteBlue.selected = [pickedFeature];

          //   } */

            
          //     // If a feature was previously highlighted, undo the highlight
          //     silhouetteBlue.selected = [];

          //     // Pick a new feature
          //     const pickedFeature = scene.current.cesiumElement.pick(movement.endPosition);
          //     console.log(pickedFeature)
          // })
          //     //updateNameOverlay(pickedFeature, movement.endPosition);
              
          //     /* if (!Cesium.defined(pickedFeature)) {
          //       return;
          //     } */
          //     //console.log(pickedEntities)
          //     //console.log(pickedFeature)
          //     //console.log(pointRef)
          //     // testCesiumElemet(this.pointRef)
          //   // .then(async (point)=>{
          //   //     //настройка pointRef
          //   //     const pointGrap=PointGraphicsCesium
          //   //     pointGrap.color = ColorCesium.fromRgba('0xFF0000ff')
          //   //     pointGrap.pixelSize = 10
          //   //     //pointGrap.heightReference=HeightReferenceCesium.CLAMP_TO_GROUND
          //   //     //pointGrap.show = true
          //   //     point.current.cesiumElement.position=Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 100)
          //   //     point.current.cesiumElement.name="Red Point"
                
          //   //     point.current.cesiumElement.point=pointGrap
          //   //     point.current.cesiumElement.description =`<h1>Установленная высота</h1></br><p> ${CartographicCesium.fromCartesian(point.current.cesiumElement.position._value).height}`
          //   //     //console.log(point.current.cesiumElement.description)
          //   //     //console.log(point)
          //   //     //console.log(pointGrap)
          //   //   })
          //   //   .catch(err=>{console.log('pointRef',err)})

          //     // Highlight the feature if it's not already selected.
              
          //     //console.log(pickedEntities.values)
          //     if (!!pickedFeature) { //&&(pickedFeature !== selected.feature)
          //       //silhouetteBlue.selected = pickedFeature;
          //       //selected.feature=pickedFeature.id;
          //       //selected.feature.outline=true
          //       //selected.feature.outlineColor=silhouetteBlue.uniforms.color
          //       //console.log(scene.current.cesiumElement)
          //       //console.log(pickedFeature.id)
          //       //selectedEntity=pickedFeature.id
          //       //pickedEntities.removeAll()
          //       //pickedEntities.add(pickedFeature.id)
          //       //pickedEntities.values.forEach((elem)=>{
          //       //  elem.polygon.material=ColorCesium.BLUE;
          //       //})
          //       //console.log(pickedEntities)
          //       //console.log(selected)
          //       //!!pickedFeature.id?{selected.feature=pickedFeature.id}:{}
                

          //       //pickedFeature.id.show=!pickedFeature.id.show
          //     }
            
          //   //console.log(definedCesium(pickedObjects))
          //   //if (definedCesium(pickedObjects)) {
          //   //  //Update the collection of picked entities.
          //   //  pickedEntities.removeAll();
          //   //  for (let i = 0; i < pickedObjects.length; ++i) {
          //   //    const entity = pickedObjects[i].id;
          //   //    pickedEntities.add(entity);
          //   //  }
          //   //}
          //   //pickedEntities.removeAll()
          // }, ScreenSpaceEventTypeCesium.MOUSE_MOVE);
          /* setTimeout(()=>{
            const camera = this.cameraRef.current.cesiumElement
            //console.log(1)
            //console.log({
            //  show: false,
            //  showBackground: true,
            //  font: "14px monospace",
            //  //horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            //  //verticalOrigin: Cesium.VerticalOrigin.TOP,
            //  //pixelOffset: new Cesium.Cartesian2(15, 0),
            //})
            //console.log(this.cameraRef.current.cesiumElement)
            const entity = this.viewerRef.current.cesiumElement.entities.add({
              label: {
                show: false,
                showBackground: true,
                font: "14px monospace",
                horizontalOrigin: HorizontalOriginCesium.LEFT,
                verticalOrigin: VerticalOriginCesium.TOP,
                pixelOffset: new Cartesian2Cesium(15, 0),
              },
            });
            let handler
                handler = new ScreenSpaceEventHandlerCesium(scene.current.cesiumElement.canvas);
                handler.setInputAction(function (movement) {
                  //console.log(this)
                  const cartesian = camera.pickEllipsoid(
                    movement.endPosition,
                    scene.current.cesiumElement.globe.ellipsoid
                  );
                  if (cartesian) {
                    const cartographic = CartographicCesium.fromCartesian(
                      cartesian
                    );
                    const longitudeString = MathCesium.toDegrees(
                      cartographic.longitude
                    ).toFixed(6);
                    const latitudeString = MathCesium.toDegrees(
                      cartographic.latitude
                    ).toFixed(6);
            
                    entity.position = cartesian;
                    entity.label.show = true;
                    entity.label.text =
                      `Lon: ${`   ${longitudeString}`.slice(-10)}\u00B0` +
                      `\nLat: ${`   ${latitudeString}`.slice(-10)}\u00B0`+
                      `\nH: ${cartographic.height.toFixed(2)}`;
                    //console.log(`Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
                    //`\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`)
                  } else {
                    entity.label.show = false;
                    entity.zIndex=4
                  }
                }, ScreenSpaceEventTypeCesium.MOUSE_MOVE);
          },2000) */
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
          console.log('updateScene')
          this.updeteScene()
          //this.setPickEntity()
          
        }
        //this.setPickEntity()
        // if (this.state.scene.id===3){
        //   function setClassifer3DTrees(classifier3d){
            
        //     classifier3d.description?.map((elem)=>{
        //       //console.log(elem)
        //       const resource = new ResourceCesium({
        //         url:elem.urlmodel
                
        //       })
        //       //console.log(resource)
        //       elem.model3d=new CesiumModelGraphics({
        //         uri:resource,
        //         heightReference:1,
        //         minimumPixelSize: 128, 
        //         maximumScale: 1,
        //         shadows:0,
        //         distanceDisplayCondition:new DistanceDisplayConditionCesium(100.0, 2000.0)
        //       })
        //       //console.log(elem) 
              
        //     })
        //     //console.log(classifier3d)
        //     return classifier3d
        //   }
        //   function set3DTrees(params, classifier, obj){
        //     //console.log(classifier.description)
        //     //console.log(params.entities.values[0])
        //     //console.log(params.entities.values[0].properties.type._value)
        //     //console.log(classifier.description.find((elem)=>elem.name===params.entities.values[0].properties.type._value))
        //     //console.log(obj)
          
        //     params.entities.values.forEach((elem)=>{
        //       try{
        //         //const modelData = Class3DTree(elem.properties.type._value)
        //         //elem.billboard=modelData.billboard //undefined//
        //         const classObj=classifier.description.find((elemclass)=>elemclass.name===elem.properties.type._value)
        //         elem.model=classObj.model3d
        //         console.log(elem.model)
        //         //elem.point = undefined
        //         //elem.billboard = undefined;
        //         //elem.billboard.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 2000.0);
        //       }
        //       catch{
        //         console.log('err',elem)
        //       }
        //     })  
          
        //   }
        //   console.log(this.state.scene.id)
        //   const viewer = this.viewerRef.current.cesiumElement
        //   const url = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/project_1/layer/3DTrees.geojson'
        //   const data=fetch(url)
        //     .then((res) => res.json())
        //   let laeyrTree  
        //   let classifer = setClassifer3DTrees((this.props.scene.classifiers.filter(
        //     (classElem)=>{
        //       if (classElem.prototype==='3DTrees'){
        //         //console.log(classElem)
        //         //console.log(elem)
        //       }
        //     return classElem.prototype==='3DTrees'
        //   })[0]??this.props.scene.classifiers.classifiers))
          
        //   new GeoJsonDataSourceCesium.load(data).then((res) => {
        //     console.log(res)
        //     laeyrTree=res
        //     set3DTrees(laeyrTree, classifer, undefined)
        //     viewer.dataSources.add(laeyrTree)
        //     console.log(res)
        //   })

        //   console.log(laeyrTree)

        // }
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
    render(){
      //console.log(this.state)
        return (
          <>
            <div className="toolbar">
              <NavBarLayer 
                  project={this.props.project}
                  layers={this.state.layers} 
                  classifiers={this.state.scene.classifiers} 
                  //layersParams={this.layersParams}
                  layersParams={this.state.layersParams}
                  viewerRef={this.viewerRef} 
                  startPosition={this.startPosition}
                  infoBoxSwith={this.state.infoBox}
                  //setInfoBoxSwith={this.onClickInfoBox}
              /> 
            </div>
                <InfoBar 
                infoBarId={this.state.infoBarId}
                infoBarName={this.state.infoBarName}
                infoBarBody={this.state.infoBarBody}
                //setInfoBar={this.setState}
                />
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
                      infoBox={false} //бокс отображения информакции об объекте
                      sceneModePicker={false}
                      navigationHelpButton={false}
                      //creditContainer='<p>dsfdfsdc</p>'

                      //navigationInstructionsInitiallyVisible={false}
                    >
                      
                        <Camera ref={this.cameraRef} />
                        <Scene ref={this.sceneRef} shadows={true}/>
                        {/* <Cesium3DTileset 
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
                        /> */}
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