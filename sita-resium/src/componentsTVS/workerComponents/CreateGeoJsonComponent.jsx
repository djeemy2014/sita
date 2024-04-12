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
    Material as MaterialCesium,
    defined as definedCesium,
    PolylineGlow as PolylineGlowCesium,
    PolylineGlowMaterialProperty,
    //HeightReference as HeightReferenceCesium,
    Cartographic as CesiumCartographic,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    //CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'
import {saturation,opasityMix,gray} from './ColorFunction'

function clicDocumentType(){
  document.onclick = clickListener
  //console.log(document.onclick)
  return document.onclick
}
function clickListener(e, arrayWithElements =[], canvasType=false){
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
        if (arrayWithElements[0]?.nodeName==="CANVAS"
        &&
        arrayWithElements[0]?.parentNode?.className==="cesium-widget"){
          
          //setState({DOMElementCanvas:true})
          //this.setState({selectLookSelector:false})
          //console.log(this.state.DOMElementCanvas)
          canvasType=true
        }else{
          canvasType=false
          //setState({DOMElementCanvas:false})
          // this.setState({selectLookSelector:true})
          //console.log(this.state.DOMElementCanvas)
          //console.log(document.onclick)
        }
        console.log(e)

        console.log(arrayWithElements)
        return canvasType
      }

//classifiers
function setClassifer3DTrees(classifier3d){
  
  classifier3d.description?.map((elem)=>{
    //console.log(elem)
    elem.resource = new ResourceCesium({
        url:elem.urlmodel
      })
    //console.log(resource)
    elem.model3d=new CesiumModelGraphics({
      uri:elem.resource,
      //heightReference:1,
      //minimumPixelSize: 128, 
      //maximumScale: 1,
      //shadows:0,
      distanceDisplayCondition:new DistanceDisplayConditionCesium(0, 2000.0),
      shadows: 1
    })
    //console.log(elem)
    
  })
  return classifier3d
}
function set3DTrees(params, classifier, obj){
  //console.log(classifier.description)
  //console.log(params.entities.values[0])
  //console.log(params.entities.values[0].properties.type._value)
  //console.log(classifier.description.find((elem)=>elem.name===params.entities.values[0].properties.type._value))
  //console.log(obj)

  params.entities.values.forEach((elem)=>{
    try{
      //const modelData = Class3DTree(elem.properties.type._value)
      //elem.billboard=modelData.billboard //undefined//
      const classObj=classifier.description.find((elemclass)=>elemclass.name===elem.properties.type._value)
      elem.model=classObj.model3d
      // elem.model=new CesiumModelGraphics({
      //   uri:classObj.resource,
      //   //heightReference:1,
      //   //minimumPixelSize: 128, 
      //   //maximumScale: 1,
      //   //shadows:0,
      //   distanceDisplayCondition:new DistanceDisplayConditionCesium(0.0, 1000.0),
      //   shadows: 1
      // })
      console.log()
      //elem.point = undefined
      elem.billboard=undefined
      //elem.billboard.distanceDisplayCondition = new DistanceDisplayConditionCesium(1000, 10000.0);
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
function Class3DTree(listClass, nameClass){
  
  return listClass.filter((obj)=>obj.name===nameClass)[0]
}
function selectKey(listClass, nameClass){
  
  return listClass.filter((obj)=>obj.key===nameClass)[0]
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
    // const material = new PolylineGlowMaterialProperty( {
    //   color: CesiumColor.CRIMSON,
    //   glowPower: 0.2,
    //   taperPower: 0.4,
    // });
    // const material = new MaterialCesium({
    //   fabric: {
    //     type: 'Color',
    //     uniforms: {
    //       color: new CesiumColor(1.0, 1.0, 0.0, 1.0)
    //     }
    //   }
    // });
    const material = new PolylineGlowMaterialProperty( {
      color: CesiumColor.fromCssColorString(classifierElem.outLineColor),
      glowPower: 0.2,
      taperPower: 1,
    });
    // const material = new MaterialCesium.fromType("Color");
    //  console.log(material)
    elem.polyline=new CesiumPolylineGraphics({
     positions:elem.polygon.hierarchy._value.positions.map(
      (point)=> CesiumCartographic.toCartesian({
        ...CesiumCartographic.fromCartesian(point), 
        height:1
      })
      ),
     //clampToGround:false,
     width:classifierElem.widthOutLine*2,
     //material:CesiumColor.fromCssColorString(classifierElem.outLineColor),
     material:material,
     zIndex:5

    })
    //elem.polyline.material.uniforms.color = CesiumColor.WHITE;
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
  let unique = params.entities.values.filter((item, i, ar) => {
    //console.log(item.properties.NUMBER.valueOf()); 
    //console.log(ar.indexOf(item.properties.NUMBER.valueOf())); 
    //console.log(ar.findLastIndex((elem)=>item.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf())); 
    //console.log(i); 
    return ar.findLastIndex((elem)=>item.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf())===i
  });
  let listOKSUnique=unique.map((elem)=>{

    return {
      key:elem.properties.NUMBER.valueOf(),
      listObj:elem.entityCollection.values.filter((entity)=>{
        //console.log(elem.properties.NUMBER.valueOf())
        return entity.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf()
      })
    }
  });

  params.entities.values.forEach((elem)=>{
    const classifierElem = classifier.description.filter((classElem)=>{
      return classElem.CLASSID===elem.properties.CLASSID._value
    })[0]
    // let NewMaterial = new MaterialCesium({
    //   fabric: {
    //     type: 'Color',
    //     uniforms: {
    //       color: new CesiumColor(0.70, 0.70, 0.70, 1.0)},
    //     // components: {
    //     //   diffuse : 'vec3(0.9, 0.3, 0.3)',
    //     //   specular : '0.1',
    //     //   shininess: '0.1'}
    //     }
    //   });
    //console.log(NewMaterial)
    elem.polygon.shadows=obj.outline?0:1
    elem.polygon.material=obj.noClassifing?
      opasityMix(CesiumColor.fromCssColorString('#ffffff'),obj.opasity??1,new CesiumColor()):
      opasityMix(CesiumColor.fromCssColorString(classifierElem.colorCSS),obj.opasity??1,new CesiumColor())
    //elem.polygon.material=CesiumColor.fromCssColorString('#ffffff')
    //console.log(elem.polygon.material)
    // elem.polygon.material=MaterialCesium.fromType('Color')
    // elem.polygon.material.uniforms.color = new CesiumColor(1.0, 1.0, 0.0, 1.0);
    elem.polygon.outlineColor=obj.noClassifing?
      opasityMix(CesiumColor.fromCssColorString('#ffffff'),1,new CesiumColor()):
      opasityMix(CesiumColor.fromCssColorString(classifierElem.colorCSS),obj.opasity??1,new CesiumColor())
    elem.polygon.outline =obj.outline??false
    elem.polygon.height=0
    elem.polygon.extrudedHeight=elem.properties.Floors*3.5
    elem.polyline=new CesiumPolylineGraphics({
      positions:elem.polygon.hierarchy._value.positions.map(
       (point)=> CesiumCartographic.toCartesian({
         ...CesiumCartographic.fromCartesian(point), 
         height:1
       })
       ),
      //clampToGround:false,
      width:10,
      material:CesiumColor.fromCssColorString('#ff0000'),
      zIndex:5,
      show:false
 
     })
    //elem.polygon.shadows.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 20000.0);
    //elem.polygon.show?console.log():elem.polygon.shadows=1
    //elem.polygon.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 20000.0);
    //console.log(selectKey(listOKSUnique, elem.properties.NUMBER.valueOf()))
    let selectOKS=selectKey(listOKSUnique, elem.properties.NUMBER.valueOf()).listObj
    // let selectOKS=elem.entityCollection.values.filter((entity)=>{
    //   //console.log(elem.properties.NUMBER.valueOf())
    //   return entity.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf()
    // })
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
  return listOKSUnique
}
function setDptFloorsOKS(params, classifier, obj){
  
  params.name=obj.prototype
  let unique = params.entities.values.filter((item, i, ar) => {
    //console.log(item.properties.NUMBER.valueOf()); 
    //console.log(ar.indexOf(item.properties.NUMBER.valueOf())); 
    //console.log(ar.findLastIndex((elem)=>item.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf())); 
    //console.log(i); 
    return ar.findLastIndex((elem)=>item.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf())===i
  });
  let listFloorsOKSUnique=unique.map((elem)=>{

    return {
      key:elem.properties.NUMBER.valueOf(),
      listObj:elem.entityCollection.values.filter((entity)=>{
        //console.log(elem.properties.NUMBER.valueOf())
        return entity.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf()
      })
    }
  });

  params.entities.values.forEach((elem)=>{
    const classifierElem = classifier.description.filter((classElem)=>{
      return classElem.CLASSID===elem.properties.CLASSID._value
    })[0]
    // let NewMaterial = new MaterialCesium({
    //   fabric: {
    //     type: 'Color',
    //     uniforms: {
    //       color: new CesiumColor(0.70, 0.70, 0.70, 1.0)},
    //     // components: {
    //     //   diffuse : 'vec3(0.9, 0.3, 0.3)',
    //     //   specular : '0.1',
    //     //   shininess: '0.1'}
    //     }
    //   });
    //console.log(NewMaterial)
    elem.polygon.shadows=obj.outline?0:1
    elem.polygon.material=obj.noClassifing?
      opasityMix(CesiumColor.fromCssColorString('#ffffff'),obj.opasity??1,new CesiumColor()):
      opasityMix(CesiumColor.fromCssColorString(classifierElem.colorCSS),obj.opasity??1,new CesiumColor())
    //elem.polygon.material=CesiumColor.fromCssColorString('#ffffff')
    //console.log(elem.polygon.material)
    // elem.polygon.material=MaterialCesium.fromType('Color')
    // elem.polygon.material.uniforms.color = new CesiumColor(1.0, 1.0, 0.0, 1.0);
    elem.polygon.outlineColor=obj.noClassifing?
      opasityMix(CesiumColor.fromCssColorString('#ffffff'),1,new CesiumColor()):
      opasityMix(CesiumColor.fromCssColorString(classifierElem.colorCSS),obj.opasity??1,new CesiumColor())
    elem.polygon.outline =obj.outline??false
    elem.polygon.height=elem.properties.H_min?elem.properties.H_min._value:0
    elem.polygon.extrudedHeight=elem.properties.Height._value+elem.polygon.height
    elem.polyline=new CesiumPolylineGraphics({
      positions:elem.polygon.hierarchy._value.positions.map(
       (point)=> CesiumCartographic.toCartesian({
         ...CesiumCartographic.fromCartesian(point), 
         height:1
       })
       ),
      //clampToGround:false,
      width:10,
      material:CesiumColor.fromCssColorString('#ff0000'),
      zIndex:5,
      show:false
 
     })
    //elem.polygon.shadows.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 20000.0);
    //elem.polygon.show?console.log():elem.polygon.shadows=1
    //elem.polygon.distanceDisplayCondition = new DistanceDisplayConditionCesium(100.0, 20000.0);
    //console.log(selectKey(listOKSUnique, elem.properties.NUMBER.valueOf()))
    let selectOKS=selectKey(listFloorsOKSUnique, elem.properties.NUMBER.valueOf()).listObj
    // let selectOKS=elem.entityCollection.values.filter((entity)=>{
    //   //console.log(elem.properties.NUMBER.valueOf())
    //   return entity.properties.NUMBER.valueOf()===elem.properties.NUMBER.valueOf()
    // })
    let maxFloors=selectOKS.reduce(function(accumulator, item){
      item.properties.LEVEL._value>accumulator?accumulator=item.properties.LEVEL._value:console.log()
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
    // <tr>
    //       <th>Масимальная площадь застройки</th>
    //       <td>${elem.properties.S_foot._value}</td>
    //     </tr>
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
          <th>Этажность</th>
          <td>${maxFloors}</td>
        </tr>
        </tbody>
      </table>`
      
  })
  return listFloorsOKSUnique
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

function mouseMove(endPosition, mousePosition,DOMElementCanvas, scene, listOKSUnique,  idOldObjects, colorCSS, idOldObjectsSelect=undefined){
  //console.log(DOMElementCanvas)
  //if(!DOMElementCanvas){
  //  return undefined
  //}
  const domElem = document.elementFromPoint(endPosition.x, endPosition.y)
  //console.log(domElem)
  //баг? 
  if (!(domElem.nodeName==="CANVAS"
        &&
        domElem.parentNode?.className==="cesium-widget")){
          
          //setState({DOMElementCanvas:true})
          //this.setState({selectLookSelector:false})
          //console.log(true)
          //canvasType=true
          return idOldObjects
        }else{
          
        }
  
  //console.log(CesiumTransforms.northWestUpToFixedFrame( scene?.current?.cesiumElement.pickPosition(endPosition)))
  const pickedObjects = scene?.current?.cesiumElement.pick(endPosition);
  //console.log(definedCesium(pickedObjects))
  if (!pickedObjects){
    idOldObjects?.forEach((elem)=>{
      elem.polyline.show=false
     })
    return undefined
  }
    if (!!idOldObjectsSelect
      &&
      !!idOldObjects
      &&
      (idOldObjectsSelect[0]?.properties.NUMBER.valueOf()===idOldObjects[0]?.properties.NUMBER.valueOf())){

        return undefined
      }
      if (!!idOldObjects?.find((elem2)=>pickedObjects.id.id===elem2.id)){
        return idOldObjects
      }

    idOldObjects?.forEach((elem)=>{
      elem.polyline.show=false
     })
    
  
  if (pickedObjects.id.entityCollection.owner.name==="dptOKS"||
    pickedObjects.id.entityCollection.owner.name==="dptFloorsOKS"
  ){
 //console.log(pickedObjects.id.entityCollection.owner.name)
 //console.log(pickedObjects.id)
 //console.log(listOKSUnique)
// console.log(pickedObjects.id.properties.NUMBER.valueOf())
  let selectOKS=pickedObjects.id.entityCollection.values.filter((entity)=>{
    //console.log(elem.properties.NUMBER.valueOf())
    return entity.properties.NUMBER.valueOf()===pickedObjects.id.properties.NUMBER.valueOf()
  })
  //let selectOKS=selectKey(listOKSUnique, pickedObjects.id.properties.NUMBER.valueOf()).listObj
  //console.log(selectOKS)
  //console.log(selectOKS2)
  if (!!idOldObjectsSelect
    &&
    !!selectOKS
    &&
    (idOldObjectsSelect[0].properties.NUMBER.valueOf()===selectOKS[0].properties.NUMBER.valueOf())
      ){
        return undefined
      }

  if (!!idOldObjects){
    if (pickedObjects.id!==idOldObjects){
      idOldObjects=selectOKS//[pickedObjects.id]
      selectOKS.forEach((elem)=>{

        elem.polyline.show=true
        elem.polyline.material=CesiumColor.fromCssColorString(colorCSS)
      })
    }
    return idOldObjects
  }else{
    idOldObjects=selectOKS//[pickedObjects.id]
    selectOKS.forEach((elem)=>{
      elem.polyline.show=true
      elem.polyline.material=CesiumColor.fromCssColorString(colorCSS)
      })
    return idOldObjects
  }
}
}

function mouseClick(endPosition, scene){
  //console.log(endPosition)
  //console.log(scene)
 
  //try{
    const pickedObjects = scene.current.cesiumElement.pick(endPosition);
  //console.log(pickedObjects)
  //}
  //catch{
  //  console.log('err')
  //}
  //console.log(sceneRef?.current?.cesiumElement.pick(elem))
}

function ClassificationTerritorySketch(numClass, classifier){
  
  return classifier.description.filter((num)=>num.CLASSID===numClass)[0]
}

function CreateGeoJsonComponent(props){
  const inputObj=props.obj
  const server=props.server
  const showStat=props.show//!==undefined?props.show:true
  const layerRef= props.layerRef
  const sceneRef=props.sceneRef
  const [dom,setDom]=useState(props.DOMElementCanvas)
  //console.log(props)
  let lookSelector=!!props.obj.lookSelector
  let listOKSUnique,listFloorsOKSUnique
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
          params.lookSelector=lookSelector
          //console.log(inputObj.prototype, params.show, inputObj.defaultChecked)
          switch(inputObj.prototype){
          case "dptOKS" :
            listOKSUnique = setDptOKS(params,props.classifier,props.obj)
            break
          case "dptFloorsOKS" :
            listFloorsOKSUnique = setDptFloorsOKS(params,props.classifier,props.obj)
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
            //console.log(props.obj.ref)
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
 /*  useEffect(()=>{
    //setinform(props.infoBar+'AA')
    //props.setInfoBar(props.infoBar+'')
    //console.log(1)
    console.log(props.DOMElementCanvas)
    if (dom!==props.DOMElementCanvas){
        setDom(props.DOMElementCanvas)
    }
    
    //console.log(!props.selectLookSelector)
    //console.log(1)
},[props]) */

  
  if (inputObj.prototype==="dptOKS"||inputObj.prototype==="dptFloorsOKS"){
    console.log(inputObj.prototype)    
     props.mousePosition.setInputAction((elem)=>{
      // document.onclick = clickListener
      //clickListener(elem)
       //console.log(props.DOMElementCanvas)
       //console.log(clicDocumentType())
      !lookSelector?
      (
        idOldObjectsSelect=mouseMove(elem.position, props.mousePosition,dom, props.sceneRef, 
          (inputObj.prototype==="dptOKS")?listOKSUnique:listFloorsOKSUnique, 
          idOldObjectsSelect,'#0f0')
        )
        :
        console.log()
      //const pickedObjects = props.sceneRef?.current?.cesiumElement.pick(elem);
      //console.log(pickedObjects)
    }, ScreenSpaceEventTypeCesium.LEFT_CLICK)
    /*  props.mousePosition.setInputAction((elem)=>{
      console.log(elem)
      !lookSelector?(
        mouseClick(elem.position, props.sceneRef)
         //console.log(CesiumCartesian2.distance(elem.startPosition,elem.endPosition))
         ):console.log()
      }, ScreenSpaceEventTypeCesium.MIDDLE_CLICK) */
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
      //onMouseMove={(elem)=>{
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
      //}}
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
