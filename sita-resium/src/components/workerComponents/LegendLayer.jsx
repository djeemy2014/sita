import {
    //createRef,
    useEffect, 
    Component,
    useState, 
    //useState, 
    //useRef
} from 'react'
import {Color} from 'cesium'
import {saturation} from './ColorFunction'




export default function LegendLayer(props,resalt=undefined){
    
    if((
        props.classifiers.geometryType==="Polygon"
    )
    &&!!props.classifiers.description){
        
        console.log(props.obj.saturation??'')
        
        resalt=(<div
            style={{
                display: 'grid'
            }}
        >
           {props.classifiers.description.map((elem)=>{
            console.log(Color.fromCssColorString(elem.fillColor).toCssColorString())
            const borderStyle=elem.outLine?{
                borderStyle:'solid',
                borderWidth: elem.widthOutLine/2,
                borderColor: elem.outLineColor
            }:{}
            const backgroundStyle=elem.fill?{
                backgroundColor:saturation(
                        Color.fromCssColorString(elem.fillColor),
                        props.obj.saturation??0,
                        new Color()
                    ).toCssColorString()
            }:{}
            return <div 
            style={{
                display: 'inline',
                
                paddingBottom:'5px', 
                paddingTop:'5px'
            }}  //style={{backgroundColor:'white', color:'black'}}
            >
                <div style={
                    {
                        display: 'inline-block',
                        verticalAlign:'middle',
                        width:'40px',
                        height:'20px',
                        ...borderStyle,
                        ...backgroundStyle
                    }
                }
                ></div>
                <div style={{
                    verticalAlign:'middle',
                    display: 'inline',
                    paddingLeft:"10px"
                    }}>
                    <p style={{margin:'auto',textAlign:'center'}}>{elem.nameClass??elem.CLASSID }</p>
                </div>
                
            </div>
            })}
            
        </div>)
    }else{
        resalt=(<>
            <p>Привет</p>
        </>)
    }
    
    return resalt
}

