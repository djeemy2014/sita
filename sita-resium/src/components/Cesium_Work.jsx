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
    Matrix4,
    Transforms as TransformsCesium,
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
    SelectionIndicatorViewModel as SelectionIndicatorViewModelCesium,
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
          selectLookSelector:undefined,
          infoBox:false,
          infoBarId:undefined,
          infoBarName:undefined,
          infoBarBody:undefined,
          DOMElementCanvas:false
        }

        this.viewerRef = createRef();
        this.sceneRef = createRef();
        this.cameraRef = createRef();
        //this.pointRef = createRef()
        this.startPosition = Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000);
        this.server = props.server
        this.handler = new ScreenSpaceEventHandlerCesium(this.sceneRef?.current?.cesiumElement.canvas);
        this.handlerAll = new ScreenSpaceEventHandlerCesium(this.sceneRef?.current?.cesiumElement.canvas);
        
        //здание стабильных this
        this.setInfoBox = this.setInfoBox.bind(this)
        this.clickListener=this.clickListener.bind(this)
        document.onclick = this.clickListener;

       
        
        //записываеться в один this как массив дальше циклом со пробегаеться по всем параметром и обявляет создание ссылки и работает с кадым параметром отдельно.
        
        
        
        
        
        
      }

      clickListener(e, arrayWithElements =[], setState=this.setState) {
        let clickedElement;
        if(e == null) {
            clickedElement = e.srcElement;
        } else {
            clickedElement = e.target;
        }
        //console.log(e)
        //console.log(a)
        //console.log(arrayWithElements)
        //console.log(this)
        arrayWithElements.push(clickedElement)
        if (arrayWithElements[0]?.nodeName==="CANVAS"&&arrayWithElements[0]?.parentNode?.className==="cesium-widget"){
          
          this.setState({DOMElementCanvas:true})
          //this.setState({selectLookSelector:false})
          //console.log(this.state.DOMElementCanvas)
        }else{
          this.setState({DOMElementCanvas:false})
          // this.setState({selectLookSelector:true})
          //console.log(this.state.DOMElementCanvas)
          //console.log(document.onclick)
        }
        
        //arrayWithElements.push(clickedElement)
        //alert(arrayWithElements);
        //console.log(arrayWithElements)
        //console.log(this.state.arrayWithElements)
        //return arrayWithElements
      }

      desubleSelect(lookSelector=false,viewerRef=this.viewerRef){
        if((!!this.state.selectLookSelector)!=(!!lookSelector)){
          //console.log(this.state.selectLookSelector)
          this.setState({selectLookSelector:lookSelector})
          //console.log(this.state.selectLookSelector)
          //setTimeout(console.log(this.state.selectLookSelector),500)
        }
        testCesiumElemet(viewerRef)
        .then(async (viewer)=>{
          if (lookSelector){
          viewer.current.cesiumElement.selectedEntity = undefined;
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
        //console.log(entity)
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
      }
      selectedPick(position, scene){
        // const feature = scene.pick(position);
        //   console.log( feature)
      }
      setPickEntity(sceneRef=this.sceneRef,setInfoBox=this.setInfoBox){
        this.handlerAll.setInputAction(function(movement) {
          const feature = sceneRef?.current?.cesiumElement.pick(movement.position);
          const dataJ = new JulianDateCesium.fromDate(new Date())
          //console.log(feature?.id)
          const uid=feature?.id.id
          const name=feature?.id.name
          const htmlData=feature?.id.description.getValue(new JulianDateCesium.fromDate(new Date())) 
          setInfoBox(uid,name,htmlData)
          //console.log(state.DOMElementCanvas)
      }, ScreenSpaceEventTypeCesium.LEFT_CLICK)
      }
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
              //console.log(this.state.DOMElementCanvas)
              setListGeoJSON[index]=<CreateGeoJsonComponent
                obj={elem} 
                server={this.server}
                mousePosition={this.handler}
                DOMElementCanvas={this.state.DOMElementCanvas}
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
          
          //return setListGeoJSON
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
            //let selectorNewViewModel = new SelectionIndicatorViewModelCesium()
                
            // try{
            //   //console.log(!!viewer.current.cesiumElement.selectionIndicator)
            //   let selector = viewer.current.cesiumElement?.selectionIndicator 
              
              
            //   if (!selector.isDestroyed()){
            //     //selector=undefined
                
            //     console.log(selector)
            //     //selector.destroy()
            //   }else{
            //     console.log(0,selector)
            //   }
            //   //console.log(selector)
            // }
            // catch{
            //   //console.log(!!viewer.current.cesiumElement.selectionIndicator) 
            //   console.log('ошибка')
              
            // }
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
          // if (!!scene.current.cesiumElement){
          //   //console.log(1)
          //   new SelectionIndicatorCesium('', scene.current.cesiumElement)
          // }else{
          //   console.log(0)
          // }
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
        if (prevState.DOMElementCanvas!==this.state.DOMElementCanvas){
          //console.log(prevState.DOMElementCanvas)
          //console.log(this.state.DOMElementCanvas)
          //this.updeteScene()
        }
        if (this.props.scene.uid!==this.state.scene.uid){
          console.log('updateScene')
          this.updeteScene()
          //this.setPickEntity()
          
        }
      }
      componentWillUnmount(){
        console.log('размонтирование')
      }
    render(){
      //console.log(this.state)
      //const abc = window
      //console.log(abc)
      //console.log(TransformsCesium.northEastDownToFixedFrame(Cartesian3Cesium.fromDegrees(0,0)))
      //console.log(TransformsCesium.northEastDownToFixedFrame(Cartesian3Cesium.fromDegrees(90,0)))
      //console.log(TransformsCesium.northEastDownToFixedFrame(Cartesian3Cesium.fromDegrees(0,90)))
      //console.log(TransformsCesium.northEastDownToFixedFrame(Cartesian3Cesium.fromDegrees(180,0)))
      //console.log(TransformsCesium.northEastDownToFixedFrame(Cartesian3Cesium.fromDegrees(45,45)))
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
                  
                  setInfoBoxSwith={(elem)=>{this.setState({infoBox:elem})}}
                  //setInfoBoxSwith={this.onClickInfoBox}
              /> 
            </div>
                <InfoBar 
                selectLookSelector={this.state.selectLookSelector}
                infoBoxSwith={this.state.infoBox}
                infoBarId={this.state.infoBarId}
                infoBarName={this.state.infoBarName}
                infoBarBody={this.state.infoBarBody}
                DOMElementCanvas={this.state.DOMElementCanvas}
                setInfoBoxSwith={(elem)=>{this.setState({infoBox:elem})}}
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
                      selectionIndicator={false}
                      animation={false}
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
                        {/* { this.updeteScene()} */}
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