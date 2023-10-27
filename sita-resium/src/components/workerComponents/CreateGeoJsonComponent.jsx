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
    //Color as ColorCesium,
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
            <GeoJsonDataSource ref={this.layerRef} />
        )
}
}
//export  CreateGeoJsonComponent

function CreateGeoJsonComponent2(props){
  const inputObj=props.obj
  const server=props.server
  const showStat=props.show!==undefined?props.show:true
  //this.ref= props.ref
  const layerRef= props.layerRef
  //let data=undefined

  let url = server+inputObj.path
  let data=fetch(url)
    .then((res) => res.json())

  const geoJson = (
    <GeoJsonDataSource 
    ref={layerRef} 
    show={showStat} 
    data={data}/>
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