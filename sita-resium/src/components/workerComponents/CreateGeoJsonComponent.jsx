//import "./css/TestComponent.css"
import testCesiumElemet from '../testCesiumElemet'

import React, {
    //createRef, 
    Component, useEffect, 
    //useState, 
    //useRef
} from 'react'
import  { 
    //Viewer,
    //Scene,
    //Camera,
    //Entity,
    //CustomDataSource,
    GeoJsonDataSource
 } from 'resium'
import{
    //Ion,
    //Terrain as TerrainCesium,
    //EllipsoidTerrainProvider,
    //createWorldTerrainAsync,
    //Math as MathCesium,
    Cartesian3 as CesiumCartesian3,
    Cartesian2 as CesiumCartesian2,
    //PointGraphics as PointGraphicsCesium,
    Transforms as CesiumTransforms,
    HeadingPitchRoll as CesiumHeadingPitchRoll,
    Color as CesiumColor, //CesiumColor
    HeightReference as CesiumHeightReference,
    ModelGraphics as CesiumModelGraphics,
    BillboardGraphics as CesiumBillboardGraphics,
    Math as CesiumMath,
    WallGraphics as CesiumWallGraphics,
    PolylineGraphics as CesiumPolylineGraphics,
    PolylineVolumeGraphics as CesiumPolylineVolumeGraphics,
    //HeightReference as HeightReferenceCesium,
    Cartographic as CesiumCartographic,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    //CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'


class CreateGeoJsonComponent3 extends Component{
constructor(props){
    super(props);
    this.inputObj=props.obj
    this.server=props.server
    //this.ref= props.ref
    this.layerRef= props.layerRef
}
async componentDidMount() {
    //switch
    testCesiumElemet( this.layerRef)
        .then(async (layer)=>{
            let url = this.server+this.inputObj.path
            fetch(url)
                .then((res) => res.json())
                .then((ev)=>{layer.current.cesiumElement.load(ev)})
        })
}
render(){
  console.log(this.inputObj)
    return(
            <GeoJsonDataSource ref={this.layerRef}/>
        )
}
}
//export  CreateGeoJsonComponent
function Class3DTree(nameClass){
  const class3DTree=[
    {
      id:1,
      name:"береза",
      url:"http://10.0.5.190:18077/cesium_test/geodata/testModel/3dmodel/tree_6/06tree03.glb",
      //model: new CesiumModelGraphics({
      //  uri:"http://10.0.5.190:18077/cesium_test/geodata/testModel/3dmodel/tree_6/06tree03.glb",
      //  heightReference:1,
      //  minimumPixelSize: 128, 
      //  maximumScale: 1,
      //  shadows:0
//
      //}),
      billboard2:undefined,
      billboard:new CesiumBillboardGraphics({
        //image: "http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/clipboard-svgrepo-com.svg",
        image: "http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/tree/free-cut-out-tree-007.png",
        color: CesiumColor.fromCssColorString('#008000bb'),
        
        //alignedAxis:new CesiumCartesian3(0.0,0.0,1.0),
        //alignedAxis:
        //new CesiumCartesian3(
        //  0.49530486396945006,
        //  0.5540396047640442,
        //  0.6691137482380005),
        verticalOrigin: 1,
        sizeInMeters:true,
        height:20,
        width:15
      }),

    },
    {
      id:2,
      name:"ель",
      url:"http://10.0.5.190:18077/cesium_test/geodata/testModel/3dmodel/tree_1/01tree.glb",
      //model: new CesiumModelGraphics({
      //  uri:"http://10.0.5.190:18077/cesium_test/geodata/testModel/3dmodel/tree_1/01tree.glb",
      //  heightReference:1,
      //  minimumPixelSize: 128,
      //  maximumScale: 1,
      //  shadows:0
      //}),
      billboard2:undefined,
      billboard:new CesiumBillboardGraphics({
        //image: "http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/clipboard-svgrepo-com.svg",
        image: "http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/tree/pngegg2.png",
        color: CesiumColor.fromCssColorString('#00FF00bb'),
        verticalOrigin: 1,
        sizeInMeters:true,
        height:20,
        width:15
      }),
    },
    {
      id:3,
      name:"сосна",
      url:"http://10.0.5.190:18077/cesium_test/geodata/testModel/3dmodel/tree_5/05tree.glb",
      //model: new CesiumModelGraphics({
      //  uri:"http://10.0.5.190:18077/cesium_test/geodata/testModel/3dmodel/tree_5/05tree.glb",
      //  heightReference:1,
      //  minimumPixelSize: 128, 
      //  maximumScale: 1,
      //  shadows:0
      //}),
      billboard2:undefined,
      billboard:new CesiumBillboardGraphics({
        //image: "http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/clipboard-svgrepo-com.svg",
        image: "http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/tree/free-cut-out-tree-002.png",
        color: CesiumColor.fromCssColorString('#ADFF2Fbb'),
        verticalOrigin: 1,
        sizeInMeters:true,
        height:20,
        width:15
      }),
    }
  ]
  return class3DTree.filter((obj)=>obj.name===nameClass)[0]
}

function ClassificationTerritorySketch(numClass){
  const classMatirial=[
    {
      CLASSID:900000010,	
      nameClass:"Застройка",
      color:"(RGB 250, 250, 250)"	,
      colorCSS:"rgb(250, 250, 250)",
    },
    {
      CLASSID:900000011,	
      nameClass:"Пятно застройки капитальными объектами",	
      color:"(RGB 250, 250, 250)",
      colorCSS:"rgb(250, 250, 250)",			
    },
    {
      CLASSID:900000012,	
      nameClass:"Пятно застройки некапитальными объектами",	
      color:"(RGB 237, 237, 237)",
      colorCSS:"rgb(237, 237, 237)",			
    },
    {
      CLASSID:900000020,	
      nameClass:"Улично-дорожная сеть, внутриквартальные проезды/проходы",
      color:"",
      colorCSS:"rgb(0, 0, 0)",
    },
    {
      CLASSID:900000021,	
      nameClass:"Проезжая часть"	,
      color:"(RGB 107, 107, 107)"	,
      colorCSS:"rgb(107, 107, 107)",		
    },
    {
      CLASSID:900000022,	
      nameClass:"Велодорожка",
      color:"	(RGB 165, 82, 0)",
      colorCSS:"rgb(165, 82, 0)",
    },
    {
      CLASSID:900000023,	
      nameClass:"Тротуар (пешеходная дорожка) асфальто-бетонная",
      color:"	(RGB 237, 237, 237)",
      colorCSS:"rgb(200, 200, 200)",			
    },
    {
      CLASSID:900000024,	
      nameClass:"Тротуар (пешеходная дорожка) брусчатка/плитка",
      color:"	(RGB 180, 170, 147)",
      colorCSS:"rgb(180, 170, 147)",			
    },
    {
      CLASSID:900000025,	
      nameClass:"Гравийные садово-парковые дорожки",
      color:"(RGB 138, 126, 96)",
      colorCSS:"rgb(138, 126, 96)",			
    },
    {
      CLASSID:900000030,	
      nameClass:"Участок зеленых насаждений",
      color:""		,
      colorCSS:"rgb(0, 0, 0)",		
    },
    {
      CLASSID:900000031,	
      nameClass:"Газон, цветник (участок низкорослых зеленых насаждений: кустарники, травяное покрытие)",
      color:"	(RGB 171, 187, 129)",
      colorCSS:"rgb(171, 187, 129)",		
      },	
    {
      CLASSID:900000032,	
      nameClass:"Сад, лес (участок высокорослых зеленых насаждений: древесная растительность)",
      color:"	(RGB 100, 106, 52)",
      colorCSS:"rgb(100, 106, 52)",			
    },
    {
      CLASSID:900000040,	
      nameClass:"Площадка",
      color:"",
      colorCSS:"rgb(0, 0, 0)",
    },
    {
      CLASSID:900000041,	
      nameClass:"Площадка (детская)",
      color:"(RGB 180, 170, 147)",
      colorCSS:"rgb(180, 170, 147)",			
    },
    {
      CLASSID:900000042,	
      nameClass:"Площадка (хозяйственная)",
      color:"(RGB 138, 126, 96)",
      colorCSS:"rgb(138, 126, 96)",
    },
    {
      CLASSID:900000043,	
      nameClass:"Площадка (отдыха взрослого населения)",
      color:"(RGB 237, 237, 237)",
      colorCSS:"rgb(237, 237, 237)",
    },
    {
      CLASSID:900000044,	
      nameClass:"Площадка (спортивная)",
      color:"(RGB 87, 105, 224)",
      colorCSS:"rgb(87, 105, 224)",
    },
    {
      CLASSID:900000050,	
      nameClass:"Пляж",
      color:"	(RGB 252, 238, 181)"	,
      colorCSS:"rgb(252, 238, 181)",		
    },
    {
      CLASSID:900000060,	
      nameClass:"Водоем (бассейн)",
      color:"	(RGB 173, 214, 255)",
      colorCSS:"rgb(173, 214, 255)",
    },
    ]
    //console.log(classMatirial.filter((num)=>num.CLASSID===numClass)[0])
    //console.log(classMatirial.filter((num)=>num===numClass).colorCSS)
    //console.log(CesiumColor.fromCssColorString(classMatirial.filter((num)=>num===numClass).colorCSS))
  return classMatirial.filter((num)=>num.CLASSID===numClass)[0]
}

function CreateGeoJsonComponent(props){
  const inputObj=props.obj
  const server=props.server
  const showStat=props.show//!==undefined?props.show:true
  //this.ref= props.ref
  //console.log(1, props.show)
  const layerRef= props.layerRef
  const sceneRef=props.sceneRef
  //let data=undefined
  //console.log(props)
  let lookSelector=false
  let url = server+'/'+inputObj.path
  let data=fetch(url)
    .then((res) => res.json())
  console.log(props.obj)
  // testCesiumElemet(props.obj.ref)
  // .then(async (layer)=>{
  //   let params = layer.current.cesiumElement
  //   console.log(params)
  //     /* let url = this.server+this.inputObj.path
  //     fetch(url)
  //         .then((res) => res.json())
  //         .then((ev)=>{layer.current.cesiumElement.load(ev)}) */
  //   })
  //useEffect(()=>{
  //  console.log(props.obj)
    testCesiumElemet(props.obj.ref)
    .then(async (layer)=>{
    
      let params = layer.current.cesiumElement
      params.load(data)
        .then(()=>{
          let params = layer.current.cesiumElement
          params.show=inputObj.defaultChecked
          //console.log(inputObj.prototype, params.show, inputObj.defaultChecked)
          switch(inputObj.prototype){
          case "dptOKS" :
            params.entities.values.forEach((elem)=>{
              //console.log(elem)
              //console.log(elem.properties.Floors)
              //elem.polygon.height=10
              //elem.polygon.extrudedHeight=20
  
              const color_R=CesiumColor.fromCssColorString('rgb(250,250,250)')
              elem.polygon.shadows=1
              elem.polygon.material=color_R
              elem.polygon.outlineColor=color_R 
              elem.polygon.outline =false
              //elem.polygon.heightReference=2
              elem.polygon.height=0
              //elem.polygon.extrudedHeightReference=2
              elem.polygon.extrudedHeight=elem.properties.Floors*3.5
              
              if (!elem.polygon.heightReference){
                //console.log(elem.polygon.heightReference)
                //console.log(CesiumHeightReference.RELATIVE_TO_GROUND)
              }
              //console.log()
              //if (elem.properties.fid._value==123){
                //console.log(elem.description)//.getValue())
                elem.description=`<table class="cesium-infoBox-defaultTable">
                  <tbody>
                  <tr>
                    <th>Номер ОКС</th>
                    <td>${elem.properties.NUMBER._value}</td>
                  </tr>
                  <tr>
                    <th>Масимальная площадь застройки</th>
                    <td>${elem.properties.S_foot._value}</td>
                  </tr>
                  <tr>
                    <th>Этажность</th>
                    <td>${elem.properties.Floors._value}</td>
                  </tr>
                  </tbody>
                </table>`
             // }
              //elem.polygon.extrudedHeightReference=2
            })
            break
          case "dptTerritorySketch" :
            lookSelector=true
            //console.log('туть', params.entities)
            //console.log(props.obj.defaultChecked)
            params.entities.values.forEach((elem)=>{
              
              //console.log(elem.properties.CLASSID._value)
              const classDescription=ClassificationTerritorySketch(elem.properties.CLASSID._value)
              //console.log(classDescription.colorCSS)
              //console.log(classDescription.colorCSS?true:false)
              //console.log(CesiumColor.fromCssColorString(classDescription.colorCSS),elem.properties.fid)
              try{
                elem.polygon.shadows=3
                //elem.polygon.clampToGround=true
                elem.polygon.outline =false
                elem.polygon.material=CesiumColor.fromCssColorString(classDescription.colorCSS)
  
                //elem.id=undefined
                //elem.name=undefined
                //elem.description=undefined
                //console.log(elem.polygon.material)
              }
              catch{
                console.log(classDescription, elem.properties)
              }
              
              if (!classDescription){
                
                //elem.polygon.material=CesiumColor.fromCssColorString(classDescription.colorCSS)
              }
              
              /* if (elem.properties.CLASSID){
                const classMatirial=ClassificationTerritorySketch(elem.properties.CLASSID)
                
              } */
              
              //elem.poligon.material=classMatirial
              //console.log(elem)
              //elem.polygon.heightReference=2
            })
            break
          case "3DTrees" :
            lookSelector=true
            //console.log(CesiumCartesian3.UNIT_Z)
            //console.log(new CesiumCartesian3(0.0,0.0,1.0))
            //console.log(
            //  new CesiumCartesian3(
            //  Math.cos(CesiumMath.toRadians(45)),
            //  Math.sin(CesiumMath.toRadians(45)),
            //  0.0)
            //  )
            //const abse=new CesiumCartesian3.fromDegrees(48.20366195893176, 42.19013569656324, 0)
            //const scaels = Math.sqrt(abse.x**2 + abse.y**2 + abse.z**2) 
            //console.log(new CesiumCartesian3(abse.x/scaels,abse.y/scaels,abse.z/scaels))
            
            //const heading = scene.camera.heading + CesiumMath.PI_OVER_TWO; 
            //const pitch = 0;
            //const hpr = new HeadingPitchRoll(heading, pitch, 0);
            //const orientation = Transforms.headingPitchRollQuaternion(
            //       position, // current position of entity
            //        hpr
            //  );
            //entity.orientation = hpr;
            //console.log(params.entities.values[0])
            params.entities.values.forEach((elem)=>{
              //console.log(elem)
              //console.log(elem.properties.type)
              
              try{
                const modelData = Class3DTree(elem.properties.type._value)
                //if (modelData.billboard){
                modelData.billboard.height=elem.properties.h._value
                modelData.billboard.width=elem.properties.d._value
                elem.billboard=modelData.billboard //undefined//
                /* elem.orientation={
                  heading : CesiumMath.toRadians(0), // east, default value is 0.0 (north)
                  pitch : CesiumMath.toRadians(-90),    // default value (looking down)
                  roll : 0.0 
                } */
                //let scene=sceneRef.current.cesiumElement
                //let heading = scene.camera.heading + CesiumMath.PI_OVER_TWO; 
                //let pitch = 0;
                //let hpr = new CesiumHeadingPitchRoll(20, 0, 0);
                //let orientation = CesiumTransforms.headingPitchRollQuaternion(
                //          elem.position , // current position of entity
                //         hpr
                //   );
                //elem.orientation = hpr;
                //elem.orientation = 
                //console.log(elem)
                //if (elem.billboard.alignedAxis){
                //  
                //  //console.log(elem.billboard)
                //}
                
                //}
                //elem.billboard.image="http://10.0.5.190:18077/cesium_test/geodata/testModel/cutout/clipboard-svgrepo-com.svg"
                //elem.model=modelData.model
                //console.log(elem.billboard)
              }
              catch{
                console.log('err',elem)
              }
            })  
            break
          case "dtpProektBound":
            //console.log(params.show)
            //params.show=true
            params.entities.values.forEach((elem)=>{
              //console.log(elem)
              //const maximumHeights=new Array(elem.polygon.hierarchy._value.positions.length)
              //console.log(maximumHeights)
              //maximumHeights.fill(20)
              //console.log(maximumHeights)
              //elem.polygon.fill=false
              //elem.polygon.outline =false
              //elem.polygon.outlineColor =CesiumColor.fromCssColorString('#ff000088')
              //elem.polygon.outlineWidth =10.0
              //elem.polygon.height=0.1
              //elem.polygon.zIndex=2
              //console.log(CesiumCartographic.toCartesian({...CesiumCartographic.fromCartesian(elem.polygon.hierarchy._value.positions[0]), height:0.1}))
              elem.description=`<table class="cesium-infoBox-defaultTable">
                  <tbody>
                  <tr>
                    <th>Наименование Проекта</th>
                    <td>${elem.name}</td>
                  </tr>
                  <tr>
                    <th>Документ об утверждении</th>
                    <td>${elem.properties.DOC_END._value}</td>
                  </tr>
                  </tbody>
                </table>`
              //console.log(elem.polygon)
              elem.polyline=new CesiumPolylineGraphics({
               positions:elem.polygon.hierarchy._value.positions.map(
                (point)=> CesiumCartographic.toCartesian({
                  ...CesiumCartographic.fromCartesian(point), 
                  height:1
                })
                ),
               //clampToGround:false,
               width:10,
               material:CesiumColor.fromCssColorString('#ff000088'),
               zIndex:5
  
              })
              elem.polygon.show=false
              //elem.polylineVolume= new CesiumPolylineVolumeGraphics({
              //  positions:elem.polygon.hierarchy._value.positions,
              //  material:CesiumColor.fromCssColorString('#ff000088'),
              //  shape: [
              //    new CesiumCartesian2(-0.1, -0.1),
              //    new CesiumCartesian2(0.1, -0.1),
              //    new CesiumCartesian2(0.1, 0.1),
              //    new CesiumCartesian2(-0.1, 0.1),
              //  ],
  //
              //})
              //elem.polygon=undefined
              /* elem.wall= new CesiumWallGraphics(
                {
                  positions:elem.polygon.hierarchy._value.positions,
                  maximumHeights:maximumHeights,
                  material:CesiumColor.fromCssColorString('#ff000088')
                }
              ) */
            })
            break
          /* case "dptZU":
            params.entities.values.forEach((elem)=>{
              elem.polygon.material=CesiumColor.fromCssColorString('#ff000088')
            })
            break */
          case "bild2d" :
          lookSelector=true
          //console.log(params.entities.values)
          //setTimeout(()=>{
            params.entities.values.forEach((elem)=>{
              const color_R=CesiumColor.WHITE
              elem.polygon.material=color_R
              elem.polygon.outlineColor=color_R 
              elem.polygon.heightReference=2
              elem.polygon.height=0
              elem.polygon.extrudedHeightReference=2//'RELATIVE_TO_GROUND'
              elem.polygon.extrudedHeight=elem.properties.height
              //elem.polygon.CornerType =1
              //console.log(elem)
              //console.log(elem.polygon.heightReference)
            })
          //},50)
          break
          case "road":
            lookSelector=true
            params.entities.values.forEach((elem)=>{
              elem.polygon.heightReference=1//CLAMP_TO_GROUND
              const color_R=CesiumColor.BLACK 
              elem.polygon.material=color_R
              elem.polygon.outlineColor=color_R
              //elem.polygon.arcType =2
              //elem.polygon.height=-0.9
              elem.polygon.perPositionHeight=false
              //elem.polygon.zIndex=1
              //console.log(elem)
            })
            break
          default:
            break
      }
        })
      
    })
    .catch(err=>{console.log('props.obj.ref',err)})

  //},[])
 
  
   
 
  const geoJson = (
    <GeoJsonDataSource 
    //ref={props.obj.ref} 
    ref={props.obj.ref} 
    show={props.obj.defaultChecked} //props.obj.defaultChecked
    //clampToGround={true}
    onClick={(elem)=>{props.onClicker(lookSelector)}}
    //data={data}
    />
  )
  return geoJson

}
export default CreateGeoJsonComponent
//export default React.forwardRef((props, ref) => <CreateGeoJsonComponent ref={ref} {...props}/>)

/* class ElemComponent extends Component {
    render() {
      return (
        <div ref={this.props.innerRef}>
          Div has a ref
        </div>
      )
    }
  }
  
  export default React.forwardRef((props, ref) => <ElemComponent 
    innerRef={ref} {...props}
  />); */