import "./css/TestComponent.css"

import {createRef, Component} from 'react'
import { 
    Viewer,
    Scene,
    Camera,
    Entity
 } from 'resium'
import{
    //Ion,
    //Terrain as TerrainCesium,
    createWorldTerrainAsync,
    Math as MathCesium,
    Cartesian3 as Cartesian3Cesium,
    PointGraphics as PointGraphicsCesium,
    Color as ColorCesium,
    HeightReference as HeightReferenceCesium,
    Cartographic as CartographicCesium
    //CesiumTerrainProvider as CesiumTerrainProviderCesium,
} from 'cesium'
//функция ожидания cesiumElement
/* async function getData(th,i=0){
    //console.log(i)
    if (th.ref.current?.cesiumElement) {
        //console.log(i)
        //console.log(Object.keys(th.ref.current)[0]==='cesiumElement')
        //console.log(th.ref.current?.cesiumElement)
        console.log(0,th.ref.current.cesiumElement)
        return (true)
  // th.ref.current.cesiumElement is Cesium's Viewer
  // DO SOMETHING
        } else if (i<100){
            i=i+1;
            setTimeout(()=>{
                getData(th, i)
                //console.log(i)
            },500)

        
        }else {
            return (new Error(`Ожидание больше ${100*500/1000} секунд.`))
        }
    
    } */

async function testCesiumElemet(ref,i=0){
    return new Promise((resolve, reject)=>{
        //console.log()
        if (ref.current?.cesiumElement) {
            resolve (ref)
            } else if (i<100){
                i=i+1;
                setTimeout(()=>{
                    testCesiumElemet(ref, i).then(resolve).catch(reject)
                },500)
            }else {
                reject (new Error(`Ожидание больше ${100*500/1000} секунд.`))
            }
    })
    //promis.then(console.log)
    //return promis.then((ev)=>{console.log(ev); return ev}).catch((ev)=>{console.log(ev);  return ev})

}
class MyComponentButton extends Component{
    constructor(props){
        super(props)
        
        this.ref=createRef()

        state = {checked:true}

    }
    checkedShow(e){
        //https://react.dev/reference/react/Component#defining-a-class-component
        //
    }


    componentDidUpdate(prevState,prevProps){
        if(prevProps.checked !== this.ref.current.checked) {
            console.log('JGGF')
        }
    }

    render(){
        return (
            <div>
                <p>БАТОН</p>
                <button onClick={()=>{
                    if (this.ref.current.checked){this.ref.current.checked=false}else{this.ref.current.checked=true}
                }}>привет</button>
                <input type={'checkbox'} ref={this.ref} name="scales" defaultChecked></input>
                <label >Scales</label>
                <p>{JSON.stringify( this.ref.current)}</p>
            </div>
        )}
}


class MyComponentCesium extends Component{
    constructor(props) {
        super(props);
        this.viewerRef = createRef();
        this.scenaRef = createRef();
        this.cameraRef = createRef();
        this.pointRef=createRef()
        
      }
      async componentDidMount() {
        //Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzJjNjYzYi1jMmMzLTQ4YmMtYjQ3OC0zOTFhZjE4MWFlNmMiLCJpZCI6NjQyMjUsImlhdCI6MTY5Mzk5ODY4NX0.ptWchwMm8LuwnypYqoS1T4hSZ2JxKFxAcioki5FZczU"
        testCesiumElemet(this.viewerRef)
        .then(async (viewer)=>{
            //настройка viewer
            viewer.current.cesiumElement.terrainProvider= await createWorldTerrainAsync()
            //console.log(viewer.current.cesiumElement)
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
        })
        .catch(console.log)

        testCesiumElemet(this.cameraRef)
        .then(async (camera)=>{
            //настройка cameraRef
            camera.current.cesiumElement.setView(
                {
                    destination : Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 10000),
                    orientation : {
                      heading : MathCesium.toRadians(0), // east, default value is 0.0 (north)
                      pitch : MathCesium.toRadians(-90),    // default value (looking down)
                      roll : 0.0 
                    }
                  }
            )
            //console.log(camera.current.cesiumElement)
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
        })
        .catch(console.log)

        testCesiumElemet(this.pointRef)
        .then(async (point)=>{
            //настройка pointRef
            const pointGrap=new PointGraphicsCesium
            pointGrap.color = ColorCesium.fromRgba('0xFF0000ff')
            pointGrap.pixelSize = 10
            pointGrap.heightReference=HeightReferenceCesium.CLAMP_TO_GROUND
            pointGrap.show = false
            point.current.cesiumElement.position=Cartesian3Cesium.fromDegrees(48.20366195893176, 42.19013569656324, 100)
            point.current.cesiumElement.name="Red Point"

            point.current.cesiumElement.point=pointGrap
            point.current.cesiumElement.description =`<h1>Установленная высота</h1></br><p> ${CartographicCesium.fromCartesian(point.current.cesiumElement.position._value).height}`
            
            //console.log(point.current.cesiumElement)
            //console.log(CartographicCesium.fromCartesian(point.current.cesiumElement.position._value))
            //viewer.ref.current.cesiumElement.ConstructorOptions
            
        })
        .catch(console.log)
      }

    render(){
        return (
            <div>
                <div>
                    <Viewer style={{ top: 0, left: 0, right: 0, bottom: 0 }} ref={this.viewerRef} timeline={false}>
                        <Camera ref={this.cameraRef} />
                        <Scene ref={this.scenaRef} />
                        <Entity ref={this.pointRef} />
                    </Viewer>

                </div>
                <div id="toolbar">
                    <MyComponentButton/>
                    <p>
                        Кнопка
                    </p>
                    <input type="checkbox">

                    </input>
                </div>
            </div> 
        )
    }
}

export default MyComponentCesium