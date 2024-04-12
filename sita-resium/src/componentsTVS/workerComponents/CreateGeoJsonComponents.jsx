//import "./css/TestComponent.css"
import testCesiumElemet from '../testCesiumElemet'
import CreateGeoJsonComponent from "./CreateGeoJsonComponent"

import {
    //createRef, 
    Component, 
    //useState, 
    //useRef
} from 'react'
import { 
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
//нах..а а главное зачем?!
function JoinComponent(arr, server){
    const list = arr.map((elem)=>
        <CreateGeoJsonComponent obj={elem} server={server}/>
    )
    return (<>{list}</>)
}

class CreateGeoJsonComponents extends Component{
constructor(props){
    super(props);
    this.server=props.server
    this.inputArr=props.arr
    this.layers=this.inputObj
}
async componentDidMount() {
    const PICCC=356
    return(PICCC)
}
render(){
    return(
        <>
        {this.componentDidMount()}
            <JoinComponent arr={this.inputArr} server={this.server}/>
        </>
        )
}
}
export default JoinComponent