//import "./css/TestComponent.css"
import testCesiumElemet from '../testCesiumElemet'

import React, {
    //createRef, 
    Component, useEffect, 
    useState, 
    //useRef
} from 'react'
import  { 
    //Viewer,
    //Scene,
    //Camera,
    //Entity,
    CustomDataSource,
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
    Resource as ResourceCesium,
    WallGraphics as CesiumWallGraphics,
    PolylineGraphics as CesiumPolylineGraphics,
    PolylineVolumeGraphics as CesiumPolylineVolumeGraphics,
    ScreenSpaceEventHandler as ScreenSpaceEventHandlerCesium,
    ScreenSpaceEventType as ScreenSpaceEventTypeCesium,
    DistanceDisplayCondition as DistanceDisplayConditionCesium,
    //HeightReference as HeightReferenceCesium,
    Cartographic as CesiumCartographic,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    //CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'
import {saturation,opasityMix,gray} from './ColorFunction'



//classifiers
function setClassifer3DTrees(classifier3d){
  
  classifier3d.description?.map((elem)=>{
    //console.log(elem)
    const resource = new ResourceCesium({
      url:elem.urlmodel
      
    })
    //console.log(resource)
    elem.model3d=new CesiumModelGraphics({
      uri:resource,
      heightReference:1,
      minimumPixelSize: 128, 
      maximumScale: 1,
      shadows:0,
      distanceDisplayCondition:new DistanceDisplayConditionCesium(100.0, 2000.0)
    })
    //console.log(elem)
    
  })
  return classifier3d
}
function set3DTrees(params, classifier, obj){
  console.log(classifier.description)
  console.log(params.entities.values[0])
  console.log(params.entities.values[0].properties.type._value)
  console.log(classifier.description.find((elem)=>elem.name===params.entities.values[0].properties.type._value))
  //console.log(obj)

  params.entities.values.forEach((elem)=>{
    try{
      //const modelData = Class3DTree(elem.properties.type._value)
      //elem.billboard=modelData.billboard //undefined//
      const classObj=classifier.description.find((elemclass)=>elemclass.name===elem.properties.type._value)
      elem.model=classObj.model3d
      console.log()
      elem.point = undefined
      elem.billboard = undefined;
      //elem.billboard.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 2000.0);
    }
    catch{
      console.log('err',elem)
    }
  })  

}
function setDptRedLine(params, classifier, obj){
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

}
function setDptZU(params, classifier, obj){
  params.entities.values.forEach((elem)=>{
    elem.polygon.material=CesiumColor.fromCssColorString('#ffffff55')
    elem.polygon.outlineColor=CesiumColor.fromCssColorString('#aa0000')
  })

}
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
    elem.polygon=undefined
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
function setDptOKS(params, classifier, obj){
  params.name=obj.prototype
  params.entities.values.forEach((elem)=>{
    const classifierElem = classifier.description.filter((classElem)=>{
      return classElem.CLASSID===elem.properties.CLASSID._value
    })[0]
    elem.polygon.shadows=obj.outline?0:1
    elem.polygon.material=obj.noClassifing?
      opasityMix(CesiumColor.fromCssColorString('#ffffff'),obj.opasity??1,new CesiumColor()):
      opasityMix(CesiumColor.fromCssColorString(classifierElem.colorCSS),obj.opasity??1,new CesiumColor())
    elem.polygon.outlineColor=obj.noClassifing?
      opasityMix(CesiumColor.fromCssColorString('#ffffff'),1,new CesiumColor()):
      opasityMix(CesiumColor.fromCssColorString(classifierElem.colorCSS),obj.opasity??1,new CesiumColor())
    elem.polygon.outline =obj.outline??false
    elem.polygon.height=0
    elem.polygon.extrudedHeight=elem.properties.Floors*3.5
    //elem.polygon.shadows.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 20000.0);
    //elem.polygon.show?console.log():elem.polygon.shadows=1
    //elem.polygon.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 20000.0);
    let selectOKS=elem.entityCollection.values.filter((entity)=>{
      //console.log(elem.properties.NUMBER.valueOf())
      return entity.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf()
    })
    let maxFloors=selectOKS.reduce(function(accumulator, item){
      item.properties.Floors._value>accumulator?accumulator=item.properties.Floors._value:console.log()
      return accumulator
    },0)
    //console.log(maxFloors)
    // selectOKS.forEach((elem)=>{
    //   //console.log(elem)
    // })

    if (!elem.polygon.heightReference){
    }
    // let selectOKS=elem.id.entityCollection.values.filter((entity)=>{
    //     return entity.properties.NUMBER.valueOf()===elem.id.properties.NUMBER.valueOf()
    //   })
    //   console.log(selectOKS)
      elem.description=`<table class="cesium-infoBox-defaultTable">
        <tbody>
        <tr>
          <th>Номер ОКС</th>
          <td>${elem.properties.NUMBER._value}</td>
        </tr>
        <tr>
          <th>Назначение</th>
          <td>${classifierElem.nameClass}</td>
        </tr>
        <tr>
          <th>Масимальная площадь застройки</th>
          <td>${elem.properties.S_foot._value}</td>
        </tr>
        <tr>
          <th>Этажность</th>
          <td>${maxFloors}</td>
        </tr>
        </tbody>
      </table>`
  })
}
function setDptTerritorySketch(params, classifier, obj){
  params.entities.values.forEach((elem)=>{
    const classDescription=ClassificationTerritorySketch(elem.properties.CLASSID._value, classifier)
    try{
      elem.polygon.shadows=3
      elem.polygon.outline =false
      elem.polygon.material=saturation(
        CesiumColor.fromCssColorString(classDescription.colorCSS),
        obj.saturation??0,
        new CesiumColor()
        )
      }
      catch{
        console.log(classDescription, elem.properties)
      }
    })
}
//MOUSE_MOVE
function mouseMove(endPosition, mousePosition, scene, idOldObjects, colorCSS, idOldObjectsSelect=undefined){
  //console.log(endPosition)
  //const time1=console.time()
  //console.timeLog(time1)
  //нужно установить момент очистки. слишком быстро отрабатывает.
  //idOldObjects?.forEach((elem)=>{
  //  elem.polyline=undefined
  // })
  //const pickedObjects1 = scene.current.cesiumElement.pick(endPosition);
  //console.timeLog(time1)
  const pickedObjects = scene?.current?.cesiumElement.pick(endPosition);
  //colorCSS==='#0f0'?console.log(idOldObjectsSelect,idOldObjects,pickedObjects):console.log()
  //console.log(pickedObjects?.id?.id)
  //console.timeLog(time1)
  if (!pickedObjects){
    // console.log('очистка 1')
    // console.timeLog(time1)
    idOldObjects?.forEach((elem)=>{
      elem.polyline=undefined
     })
    return undefined
  }

 // if (!!idOldObjects){
    //console.log(2)
    // idOldObjectsSelect?
    // console.log(pickedObjects.id.id===idOldObjects[0]?.id, idOldObjects[0]?.id===idOldObjectsSelect[0]?.id)
    // :
    // console.log()
    
    if ((idOldObjectsSelect?.length===idOldObjects?.length)
      &&
      (idOldObjectsSelect?.every((elem1)=>{
        return !!idOldObjects?.find((elem2)=>elem1.id===elem2.id)
      }))
      ){

        return undefined
      }
      if (!!idOldObjects?.find((elem2)=>pickedObjects.id.id===elem2.id)){
        return idOldObjects
      }

    idOldObjects?.forEach((elem)=>{
      elem.polyline=undefined
     })
    
  //}
  
  if (pickedObjects.id.entityCollection.owner.name==="dptOKS"){

  //console.log(pickedObjects)
  let selectOKS=pickedObjects.id.entityCollection.values.filter((elem)=>{
    return elem.properties.NUMBER.valueOf()===pickedObjects.id.properties.NUMBER.valueOf()
  })
  if ((idOldObjectsSelect?.length===selectOKS?.length)
      &&
      (idOldObjectsSelect?.every((elem1)=>{
        return !!selectOKS?.find((elem2)=>elem1.id===elem2.id)
      }))
      ){
        return undefined
      }

  if (!!idOldObjects){
    
    if (pickedObjects.id!==idOldObjects){
      //console.log(11)
      //idOldObjectsSelect?console.log(8):console.log()
      //console.timeLog(time1)
      idOldObjects=selectOKS//[pickedObjects.id]
      idOldObjects.forEach((elem)=>{
        elem.polyline=new CesiumPolylineGraphics({
          positions:elem.polygon.hierarchy._value.positions.map(
           (point)=> CesiumCartographic.toCartesian({
             ...CesiumCartographic.fromCartesian(point), 
             height:1
           })
           ),
          width:10,
          material:CesiumColor.fromCssColorString(colorCSS),
          zIndex:5
     
         })
      })
    }
    //console.log(12)
    //console.timeLog(time1)
    //console.log('выбран12',idOldObjects)
    //console.timeLog(time1)
    //console.timeEnd(time1)
    return idOldObjects
  }else{
    //console.log(21)
    //console.timeLog(time1)
    idOldObjects=selectOKS//[pickedObjects.id]
    idOldObjects.forEach((elem)=>{
        elem.polyline=new CesiumPolylineGraphics({
          positions:elem.polygon.hierarchy._value.positions.map(
           (point)=> CesiumCartographic.toCartesian({
             ...CesiumCartographic.fromCartesian(point), 
             height:1
           })
           ),
          //clampToGround:false,
          width:10,
          material:CesiumColor.fromCssColorString(colorCSS),
          zIndex:5
     
         })
      })
      //console.log(22)
      //console.timeLog(time1)
      //console.timeLog(time1)
      //console.timeEnd(time1)
    return idOldObjects
  }
  //console.timeEnd(time1)
}

  //console.log(pickedObjects.id.polygon??false)
}


function ClassificationTerritorySketch(numClass, classifier){
  // const classMatirial=[
  //   {
  //     CLASSID:900000010,	
  //     nameClass:"Застройка",
  //     color:"(RGB 250, 250, 250)"	,
  //     colorCSS:"rgb(250, 250, 250)",
  //   },
  //   {
  //     CLASSID:900000011,	
  //     nameClass:"Пятно застройки капитальными объектами",	
  //     color:"(RGB 250, 250, 250)",
  //     colorCSS:"rgb(250, 250, 250)",			
  //   },
  //   {
  //     CLASSID:900000012,	
  //     nameClass:"Пятно застройки некапитальными объектами",	
  //     color:"(RGB 237, 237, 237)",
  //     colorCSS:"rgb(237, 237, 237)",			
  //   },
  //   {
  //     CLASSID:900000020,	
  //     nameClass:"Улично-дорожная сеть, внутриквартальные проезды/проходы",
  //     color:"",
  //     colorCSS:"rgb(0, 0, 0)",
  //   },
  //   {
  //     CLASSID:900000021,	
  //     nameClass:"Проезжая часть"	,
  //     color:"(RGB 107, 107, 107)"	,
  //     colorCSS:"rgb(107, 107, 107)",		
  //   },
  //   {
  //     CLASSID:900000022,	
  //     nameClass:"Велодорожка",
  //     color:"	(RGB 165, 82, 0)",
  //     colorCSS:"rgb(165, 82, 0)",
  //   },
  //   {
  //     CLASSID:900000023,	
  //     nameClass:"Тротуар (пешеходная дорожка) асфальто-бетонная",
  //     color:"	(RGB 237, 237, 237)",
  //     colorCSS:"rgb(200, 200, 200)",			
  //   },
  //   {
  //     CLASSID:900000024,	
  //     nameClass:"Тротуар (пешеходная дорожка) брусчатка/плитка",
  //     color:"	(RGB 180, 170, 147)",
  //     colorCSS:"rgb(180, 170, 147)",			
  //   },
  //   {
  //     CLASSID:900000025,	
  //     nameClass:"Гравийные садово-парковые дорожки",
  //     color:"(RGB 138, 126, 96)",
  //     colorCSS:"rgb(138, 126, 96)",			
  //   },
  //   {
  //     CLASSID:900000030,	
  //     nameClass:"Участок зеленых насаждений",
  //     color:""		,
  //     colorCSS:"rgb(0, 0, 0)",		
  //   },
  //   {
  //     CLASSID:900000031,	
  //     nameClass:"Газон, цветник (участок низкорослых зеленых насаждений: кустарники, травяное покрытие)",
  //     color:"	(RGB 171, 187, 129)",
  //     colorCSS:"rgb(171, 187, 129)",		
  //     },	
  //   {
  //     CLASSID:900000032,	
  //     nameClass:"Сад, лес (участок высокорослых зеленых насаждений: древесная растительность)",
  //     color:"	(RGB 100, 106, 52)",
  //     colorCSS:"rgb(100, 106, 52)",			
  //   },
  //   {
  //     CLASSID:900000040,	
  //     nameClass:"Площадка",
  //     color:"",
  //     colorCSS:"rgb(0, 0, 0)",
  //   },
  //   {
  //     CLASSID:900000041,	
  //     nameClass:"Площадка (детская)",
  //     color:"(RGB 180, 170, 147)",
  //     colorCSS:"rgb(180, 170, 147)",			
  //   },
  //   {
  //     CLASSID:900000042,	
  //     nameClass:"Площадка (хозяйственная)",
  //     color:"(RGB 138, 126, 96)",
  //     colorCSS:"rgb(138, 126, 96)",
  //   },
  //   {
  //     CLASSID:900000043,	
  //     nameClass:"Площадка (отдыха взрослого населения)",
  //     color:"(RGB 237, 237, 237)",
  //     colorCSS:"rgb(237, 237, 237)",
  //   },
  //   {
  //     CLASSID:900000044,	
  //     nameClass:"Площадка (спортивная)",
  //     color:"(RGB 87, 105, 224)",
  //     colorCSS:"rgb(87, 105, 224)",
  //   },
  //   {
  //     CLASSID:900000050,	
  //     nameClass:"Пляж",
  //     color:"	(RGB 252, 238, 181)"	,
  //     colorCSS:"rgb(252, 238, 181)",		
  //   },
  //   {
  //     CLASSID:900000060,	
  //     nameClass:"Водоем (бассейн)",
  //     color:"	(RGB 173, 214, 255)",
  //     colorCSS:"rgb(173, 214, 255)",
  //   },
  //   ]
    //console.log(classMatirial.filter((num)=>num.CLASSID===numClass)[0])
    //console.log(classMatirial.filter((num)=>num===numClass).colorCSS)
    //console.log(CesiumColor.fromCssColorString(classMatirial.filter((num)=>num===numClass).colorCSS))
  return classifier.description.filter((num)=>num.CLASSID===numClass)[0]
}

function CreateGeoJsonComponent(props){
  const inputObj=props.obj
  const server=props.server
  const showStat=props.show//!==undefined?props.show:true
  const layerRef= props.layerRef
  const sceneRef=props.sceneRef
  //console.log(props)
  let lookSelector=!!props.obj.lookSelector
  let geoJson =undefined

  //let handler = new ScreenSpaceEventHandlerCesium(scene.current.cesiumElement.canvas);
  // let handler = new ScreenSpaceEventHandlerCesium(sceneRef?.current?.cesiumElement.canvas);
  // //console.log(sceneRef.current.cesiumElement)
  // handler?.setInputAction((elem)=>{
  //   //this.setMousePosition(elem)
  //   console.log(elem)
  // }, ScreenSpaceEventTypeCesium.MOUSE_MOVE)
  //console.log(props.mousePosition)
  //const [idOldObjectsPick, setIdOldObjectsPick] = useState(undefined)
  
  let idOldObjects = undefined
  let idOldObjectsSelect = undefined
  let url = server+'/'+inputObj.path
  //console.log(props)
  let data=fetch(url)
    .then((res) => res.json())

  /* if(inputObj.prototype==="3DTrees"){
    console.log(inputObj)
    console.log(props.obj.ref??false)
    console.log(props.obj?.ref?.current?.cesiumElement)
    testCesiumElemet(props.obj.ref)
    .then(async (layer)=>{
      console.log(props.obj.ref)
      const class3D = setClassifer3DTrees(props.classifier)
      //console.log(class3D)
      //set3DTrees(params, class3D, props.obj)
    })
    .catch(err=>{console.log('props.obj.ref',err)})
    return<CustomDataSource 
      ref={props.obj.ref} 
    />
  } */
    testCesiumElemet(props.obj.ref)
    .then(async (layer)=>{
      //console.log(params)
      let params = layer.current.cesiumElement
      //console.log(params)
      params.load(data)
        .then((params)=>{
          //console.log(elem)
          //let params = layer.current.cesiumElement
          params.show=inputObj.defaultChecked
          //console.log(inputObj.prototype, params.show, inputObj.defaultChecked)
          switch(inputObj.prototype){
          case "dptOKS" :
            setDptOKS(params,props.classifier,props.obj)
            break
          case "dptTerritorySketch" :
            setDptTerritorySketch(params,props.classifier,props.obj)
            // params.entities.values.forEach((elem)=>{
            //   const classDescription=ClassificationTerritorySketch(elem.properties.CLASSID._value, props.classifier)
            //   try{
            //     elem.polygon.shadows=3
            //     elem.polygon.outline =false
            //     elem.polygon.material=saturation(
            //       CesiumColor.fromCssColorString(classDescription.colorCSS),
            //       props.obj.saturation??0,
            //       new CesiumColor()
            //       )
            //   }
            //   catch{
            //     console.log(classDescription, elem.properties)
            //   }
              
            // })
            break
          case "dptZU" :
            
            setDptZU(params,props.classifier,props.obj)
            //lookSelector=true
            params.entities.values.forEach((elem)=>{
              elem.polygon.material=CesiumColor.fromCssColorString('#ffffff55')
              elem.polygon.outlineColor=CesiumColor.fromCssColorString('#aa0000')
              //elem.polygon.width=5
            })
            break
          case "dptRedLine" :
            setDptRedLine(params,props.classifier,props.obj)
            // params.entities.values.forEach((elem)=>{
            //   const maximumHeights=new Array(elem.polyline.positions._value.length)
            //   maximumHeights.fill(10)
            //   elem.polyline.material=CesiumColor.fromCssColorString('#000000aa')
            //   elem.polyline.width=2
              
            //   elem.wall= new CesiumWallGraphics(
            //     {
            //       positions:elem.polyline.positions._value,
            //       maximumHeights:maximumHeights,
            //       material:CesiumColor.fromCssColorString('#000000aa')
            //     }
            //   )
            // })
            break
          case "dptStructure":
            setDptStructure(params,  props.classifier)
            break
          case "3DTrees" :
            console.log(props.obj.ref)
            const class3D = setClassifer3DTrees(props.classifier)
            //console.log(class3D)
            set3DTrees(params, class3D, props.obj)
            
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


  

  if (inputObj.prototype==="dptOKS"){
    let mouse = undefined
    props.mousePosition.setInputAction((elem)=>{
      !lookSelector?(idOldObjects=mouseMove(elem.endPosition, props.mousePosition, props.sceneRef, idOldObjects, '#f00',idOldObjectsSelect)):console.log()
      }, ScreenSpaceEventTypeCesium.MOUSE_MOVE)
     props.mousePosition.setInputAction((elem)=>{
      !lookSelector?(idOldObjectsSelect=mouseMove(elem.position, props.mousePosition, props.sceneRef, idOldObjectsSelect,'#0f0')):console.log()
      }, ScreenSpaceEventTypeCesium.LEFT_CLICK)
    //console.log(inputObj)
    geoJson = (
      <GeoJsonDataSource 
      //ref={props.obj.ref} 
      name={props.obj.name}
      ref={props.obj.ref} 
      show={props.obj.defaultChecked} //props.obj.defaultChecked
      //clampToGround={true}
      onClick={(elem)=>{
        props.onClicker(lookSelector);
        //console.log(elem,idOldObjectsSelect);
        //!lookSelector?(
        //  idOldObjectsSelect=mouseMove(elem.position, props.mousePosition, props.sceneRef, idOldObjectsSelect,'#0f0')):console.log()
      }}
      onMouseMove={(elem)=>{
        //mouse=elem;
        // !lookSelector?(
        //   idOldObjects=mouseMove(elem.endPosition, 
        //     props.mousePosition, 
        //     props.sceneRef, 
        //     idOldObjects, 
        //     '#f00',
        //     idOldObjectsSelect
        //     )
        //     )
        //     :console.log()
      }}
      //data={data}
      />
    )
    return geoJson
  }else{
    //console.log(inputObj)
    geoJson = (
      <GeoJsonDataSource 
      //ref={props.obj.ref} 
      ref={props.obj.ref} 
      show={props.obj.defaultChecked} //props.obj.defaultChecked
      //clampToGround={true}
      onClick={(elem)=>{
        props.onClicker(lookSelector);
        //console.log(elem, props.obj.name);
      }}//!lookSelector?(idOldObjectsSelect=mouseMove(elem.position, props.sceneRef, idOldObjectsSelect,'#0f0')):console.log()}}
      //onMouseMove={(elem)=>{!lookSelector?(idOldObjects=mouseMove(elem.endPosition, props.sceneRef, idOldObjects, '#f00')):console.log()}}
      //data={data}
      />
    )
    return geoJson
  }
  
  //return geoJson

}
export default CreateGeoJsonComponent
//export default React.forwardRef((props, ref) => <CreateGeoJsonComponent ref={ref} {...props}/>)
