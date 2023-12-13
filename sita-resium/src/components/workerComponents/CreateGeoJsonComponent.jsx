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
import {saturation,opasityMix,gray} from './ColorFunction'



//classifiers
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
function setDptProektBound(params, classifier){
  //console.log(params)
  //console.log(classifier)
  //classifier.description.forEach(()=>{})
  params.entities.values.forEach((elem)=>{
    const classifierElem = classifier.description.filter((classElem)=>{
      return classElem.CLASSID===elem.properties.CLASSID._value
    })[0]

    //console.log(classifierElem)
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
    //console.log(elem.description)
    
    elem.polyline=new CesiumPolylineGraphics({
     positions:elem.polygon.hierarchy._value.positions.map(
      (point)=> CesiumCartographic.toCartesian({
        ...CesiumCartographic.fromCartesian(point), 
        height:1
      })
      ),
     //clampToGround:false,
     width:classifierElem.widthOutLine,
     material:CesiumColor.fromCssColorString(classifierElem.outLineColor),
     zIndex:5

    })
    elem.polygon.show=false
  })
}
function setDptStructure(params, classifier){
  
  params.entities.values.forEach((elem)=>{
    const classifierElem = classifier.description.filter((classElem)=>{
      return classElem.CLASSID===elem.properties.CLASSID._value
    })[0]
    elem.polygon.outline =classifierElem.outLine??false
    elem.polygon.height=0.5
    elem.polygon.material=CesiumColor.fromCssColorString(classifierElem.fillColor)
    elem.name=`Элемент №${elem.properties.NUMBER._value}`
    elem.description=`<table class="cesium-infoBox-defaultTable">
    <tbody>
      <tr>
        <th>
          Номер элемента
        </th>
        <td>
          ${elem.properties.NUMBER._value}
        </td>
      </tr>
      <tr>
        <th>
          Класс элемента
        </th>
        <td>
          ${classifierElem.nameClass}
        </td>
      </tr>
      <tr>
        <th>
          Статус
        </th>
        <td>
          ${elem.properties.STATUS._value}
        </td>
      </tr>
    </tbody>
  </table>`
    
  })
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
  const layerRef= props.layerRef
  const sceneRef=props.sceneRef
  let lookSelector=false
  let url = server+'/'+inputObj.path
  //console.log(props)
  let data=fetch(url)
    .then((res) => res.json())
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
              elem.polygon.shadows=props.obj.outline?0:1
              elem.polygon.material=opasityMix(CesiumColor.fromCssColorString('rgb(250,250,250)'),props.obj.opasity??1,new CesiumColor())
              elem.polygon.outlineColor=CesiumColor.fromCssColorString('rgb(250,250,250)')
              elem.polygon.outline =props.obj.outline??false
              elem.polygon.height=0
              elem.polygon.extrudedHeight=elem.properties.Floors*3.5
              
              if (!elem.polygon.heightReference){
              }
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
            })
            break
          case "dptTerritorySketch" :
            lookSelector=true
            params.entities.values.forEach((elem)=>{
              const classDescription=ClassificationTerritorySketch(elem.properties.CLASSID._value)
              try{
                elem.polygon.shadows=3
                elem.polygon.outline =false
                elem.polygon.material=saturation(
                  CesiumColor.fromCssColorString(classDescription.colorCSS),
                  props.obj.saturation??0,
                  new CesiumColor()
                  )
              }
              catch{
                console.log(classDescription, elem.properties)
              }
              
            })
            break
          case "dptZU" :
            lookSelector=true
            params.entities.values.forEach((elem)=>{
              elem.polygon.material=CesiumColor.fromCssColorString('#ffffff55')
              elem.polygon.outlineColor=CesiumColor.fromCssColorString('#aa0000')
              //elem.polygon.width=5
            })
            break
          case "dptRedLine" :
            params.entities.values.forEach((elem)=>{
              const maximumHeights=new Array(elem.polyline.positions._value.length)
              maximumHeights.fill(10)
              elem.polyline.material=CesiumColor.fromCssColorString('#000000aa')
              elem.polyline.width=2
              
              elem.wall= new CesiumWallGraphics(
                {
                  positions:elem.polyline.positions._value,
                  maximumHeights:maximumHeights,
                  material:CesiumColor.fromCssColorString('#000000aa')
                }
              )
            })
            break
          case "dptStructure":
            setDptStructure(params,  props.classifier)
            break
          case "3DTrees" :
            lookSelector=true
            params.entities.values.forEach((elem)=>{
              try{
                const modelData = Class3DTree(elem.properties.type._value)
                elem.billboard=modelData.billboard //undefined//
              }
              catch{
                console.log('err',elem)
              }
            })  
            break
          case "dptProektBound":
            //console.log(props)
            setDptProektBound(params, props.classifier) 
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
