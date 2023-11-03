//import "./css/TestComponent.css"
import testCesiumElemet from '../testCesiumElemet'

import React, {
    //createRef, 
    Component, 
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
    //Cartesian3 as Cartesian3Cesium,
    //PointGraphics as PointGraphicsCesium,
    Color as ColorCesium,
    //HeightReference as HeightReferenceCesium,
    //Cartographic as CartographicCesium,
    //GeoJsonDataSource as GeoJsonDataSourceCesium
    //CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'


class CreateGeoJsonComponent extends Component{
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

function CreateGeoJsonComponent2(props){
  const inputObj=props.obj
  const server=props.server
  const showStat=props.show//!==undefined?props.show:true
  //this.ref= props.ref
  const layerRef= props.layerRef
  //let data=undefined
  //console.log(props)
  let url = server+inputObj.path
  let data=fetch(url)
    .then((res) => res.json())

  // testCesiumElemet(props.obj.ref)
  // .then(async (layer)=>{
  //   let params = layer.current.cesiumElement
  //   console.log(params)
  //     /* let url = this.server+this.inputObj.path
  //     fetch(url)
  //         .then((res) => res.json())
  //         .then((ev)=>{layer.current.cesiumElement.load(ev)}) */
  //   })
  testCesiumElemet(props.obj.ref)
  .then(async (layer)=>{
  
    let params = layer.current.cesiumElement
    params.load(data)
      .then(()=>{
        let params = layer.current.cesiumElement
        switch(inputObj.prototype){
        case "bild2d" :
         
          //console.log(params.entities.values)
          //setTimeout(()=>{
            params.entities.values.forEach((elem)=>{
              const color_R=ColorCesium.WHITE
              elem.polygon.material=color_R
              elem.polygon.outlineColor=color_R 
              elem.polygon.heightReference=2
              elem.polygon.height=0
              elem.polygon.extrudedHeightReference=2//'RELATIVE_TO_GROUND'
              elem.polygon.extrudedHeight=elem.properties.height
              //elem.polygon.CornerType =1
              //console.log(elem)
            })
          //},50)
        break
      case "road":
        params.entities.values.forEach((elem)=>{
          elem.polygon.heightReference=2//CLAMP_TO_GROUND
          const color_R=ColorCesium.BLACK 
          elem.polygon.material=color_R
          elem.polygon.outlineColor=color_R
          //elem.polygon.arcType =2
          elem.polygon.height=-0.9
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
  
   
 
  const geoJson = (
    <GeoJsonDataSource 
    //ref={props.obj.ref} 
    ref={props.obj.ref} 
    show={props.obj.defaultChecked} 
    //data={data}
    />
  )
  return geoJson

}
export default CreateGeoJsonComponent2
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