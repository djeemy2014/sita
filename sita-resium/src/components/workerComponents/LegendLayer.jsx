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
async function awaitClassifiers(classifiers, i=0){
    return new Promise((res,rej)=>{
        if(!!classifiers?.description){
            res(classifiers)
        } else if (i<1000){
            i++;
            setTimeout(()=>{
                awaitClassifiers(classifiers, i).then(res).catch(rej)
            },10)
        }else{
            
            rej(new Error(`Waiting more than ${1000*10/1000} seconds.${classifiers.name}`))
        }
    })

    
}

function casePoligon(obj,classifiers,resalt=undefined){
    if (obj.noClassifing){
        const firstClass=classifiers.description[0]
        const borderStyle=firstClass.outLine?{
            borderStyle:'solid',
            borderWidth: firstClass.widthOutLine/2,
            borderColor: firstClass.outLineColor
        }:{}
        const backgroundStyle=firstClass.fill?{
            backgroundColor:saturation(
                    Color.fromCssColorString(firstClass.fillColor),
                    obj.saturation??0,
                    new Color()
                ).toCssColorString()
        }:{}
        resalt=(<div
            style={{
                display: 'grid'
            }}
        >
            <div 
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
                <p style={{margin:'auto',textAlign:'center'}}>{obj.name }</p>
            </div>
            
        </div>
        </div>)
    }else{
    resalt=(<div
        style={{
            display: 'grid'
        }}
    >
       {classifiers.description.map((elem)=>{
        const borderStyle=elem.outLine?{
            borderStyle:'solid',
            borderWidth: elem.widthOutLine/2,
            borderColor: elem.outLineColor
        }:{}
        const backgroundStyle=elem.fill?{
            backgroundColor:saturation(
                    Color.fromCssColorString(elem.fillColor),
                    obj.saturation??0,
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
    }
    return resalt
}
function case25D(obj, classifiers, resalt=undefined){
    
    if (obj.noClassifing){
        const firstClass=classifiers.description[0]
        resalt=(<div
            style={{
                display: 'grid'
            }}
        >
           <div 
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
                        }
                    }
                    >
                        <svg width="40" height="20" version="1.1" viewBox="0 0 67.733 33.867" xmlns="http://www.w3.org/2000/svg">
                              {/* <defs>
                                    <filter id="filter4229" x="-.039629" y="-.060855" width="1.0793" height="1.1217" color-interpolation-filters="sRGB">
                                          <feGaussianBlur stdDeviation="0.49171165" />
                                    </filter>
                              </defs> */}
                              <g> 
                                    <path 
                                    transform="matrix(1.2188 0 0 1.2188 -6.6955 -3.412)" 
                                    d="m38.044 30.541 8.8173-4.4087 9.5271-5.9073-23.936-9.0763-5.8433 3.232 21.765 10.009-10.331 6.1509" 
                                    filter="url(#filter4229)" opacity={obj.opasity??1}/>
                                    <g 
                                        fill={'#ffffff'} 
                                        fillOpacity={obj.opasity??1}
                                        stroke={'#ffffff'} 
                                        strokeOpacity={obj.outline?1:0} 
                                        strokeWidth="1px"
                                    >
                                          <path d="m39.671 33.81-25.926-15.437v-15.463l25.926 10.208v20.692"/>
                                          <path d="m39.671 13.118 12.591-4.9573v18.153l-12.591 7.4965v-20.692"/>
                                          <path d="m39.671 13.118-25.926-10.208 11.99-2.9104 26.527 8.1611z"/>
                                    </g>
                                    <path d="m39.671 13.118 12.591-4.9573v18.153l-12.591 7.4965v-20.692" fillOpacity=".75"/>
                                    <path d="m39.671 13.118-25.926-10.208 11.99-2.9104 26.527 8.1611z" fillOpacity=".3"/>
                              </g>
                        </svg>
                    </div>
                    <div style={{
                        verticalAlign:'middle',
                        display: 'inline',
                        paddingLeft:"10px"
                        }}>
                        <p style={{margin:'auto',textAlign:'center'}}>{obj.name }</p>
                    </div>
                    
                </div>
            
        </div>)
    }else{
    resalt=(<div
        style={{
            display: 'grid'
        }}
    >
        {classifiers.description.map((elem)=>{
            
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
                    }
                }
                >
                    <svg width="40" height="20" version="1.1" viewBox="0 0 67.733 33.867" xmlns="http://www.w3.org/2000/svg">
                          {/* <defs>
                                <filter id="filter4229" x="-.039629" y="-.060855" width="1.0793" height="1.1217" color-interpolation-filters="sRGB">
                                      <feGaussianBlur stdDeviation="0.49171165" />
                                </filter>
                          </defs> */}
                          <g>
                                <path 
                                transform="matrix(1.2188 0 0 1.2188 -6.6955 -3.412)" 
                                d="m38.044 30.541 8.8173-4.4087 9.5271-5.9073-23.936-9.0763-5.8433 3.232 21.765 10.009-10.331 6.1509" 
                                filter="url(#filter4229)" opacity={obj.opasity??1}/>
                                <g 
                                    fill={elem.colorCSS} 
                                    fillOpacity={obj.opasity??1}
                                    stroke={elem.colorCSS} 
                                    strokeOpacity={obj.outline?1:0} 
                                    strokeWidth="1px"
                                >
                                      <path d="m39.671 33.81-25.926-15.437v-15.463l25.926 10.208v20.692"/>
                                      <path d="m39.671 13.118 12.591-4.9573v18.153l-12.591 7.4965v-20.692"/>
                                      <path d="m39.671 13.118-25.926-10.208 11.99-2.9104 26.527 8.1611z"/>
                                </g>
                                <path d="m39.671 13.118 12.591-4.9573v18.153l-12.591 7.4965v-20.692" fillOpacity=".75"/>
                                <path d="m39.671 13.118-25.926-10.208 11.99-2.9104 26.527 8.1611z" fillOpacity=".3"/>
                          </g>
                    </svg>
                </div>
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
    }
    return resalt
}
function caseWall(obj, classifiers, resalt=undefined){
    
    if (obj.noClassifing){
        const firstClass=classifiers.description[0]
        resalt=(<div
            style={{
                display: 'grid'
            }}
        >
           <div 
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
                        }
                    }
                    >
                        <svg width="40" height="20" version="1.1" viewBox="0 0 67.733 33.867" xmlns="http://www.w3.org/2000/svg">
                              {/* <defs>
                                    <filter id="filter1082" x="-.04607" y="-.079763" width="1.0913" height="1.1577" color-interpolation-filters="sRGB">
                                    </filter>
                              </defs> */}
                              <g>
                                    <path 
                                        d="m33.778 33.867 10.331-6.1509-21.765-10.009-9.8382 3.4945 21.273 12.666" 
                                        filter="url(#filter1082)" 
                                        stroke="#000"
                                    />
                                    <path 
                                        d="m33.778 33.867-21.273-12.666v-12.688l21.273 8.3757v16.978" 
                                        fill={"#888"} 
                                        fillOpacity={obj.opasity??1}
                                        stroke={"#888"} 
                                        strokeOpacity={obj.outline?1:0} 
                                        strokeWidth="1px"
                                    />
                              </g>
                        </svg>
                    </div>
                    <div style={{
                        verticalAlign:'middle',
                        display: 'inline',
                        paddingLeft:"10px"
                        }}>
                        <p style={{margin:'auto',textAlign:'center'}}>{obj.name }</p>
                    </div>
                    
                </div>
            
        </div>)
    }else{
    resalt=(<div
        style={{
            display: 'grid'
        }}
    >
        {classifiers.description.map((elem)=>{
            
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
                    }
                }
                >
                    <svg width="40" height="20" version="1.1" viewBox="0 0 67.733 33.867" xmlns="http://www.w3.org/2000/svg">
                              {/* <defs>
                                    <filter id="filter1082" x="-.04607" y="-.079763" width="1.0913" height="1.1577" colorInterpolationFilters="sRGB">
                                    </filter>
                              </defs> */}
                              <g>
                                    <path 
                                        d="m33.778 33.867 10.331-6.1509-21.765-10.009-9.8382 3.4945 21.273 12.666" 
                                        filter="url(#filter1082)" 
                                        //stroke="#000"
                                        fill="#00000088"
                                    />
                                    <path 
                                        d="m33.778 33.867-21.273-12.666v-12.688l21.273 8.3757v16.978" 
                                        fill={elem.fillColor} 
                                        fillOpacity={obj.opasity??1}
                                        stroke={elem.outLineColor} 
                                        strokeOpacity={obj.outline?1:0} 
                                        strokeWidth="1px"
                                    />
                              </g>
                        </svg>
                </div>
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
    }
    return resalt
}



export default function LegendLayer(props){
const [resalt, setResalt]=useState((<></>))
//let resalt
//console.log(props)
useEffect(()=>{
    //console.log(props.classifiers.description)
    awaitClassifiers(props.classifiers)
        .then(()=>{
            if(!!props.classifiers.description){
                switch(props.classifiers.geometryType){
                    case("Polygon"):
                    setResalt(casePoligon(props.obj,props.classifiers))
                        break
                    case("25D"):
                    setResalt(case25D(props.obj, props.classifiers))
                        break
                    case("Wall"):
                    setResalt(caseWall(props.obj, props.classifiers))
                        break
                    default:
                        setResalt((<>
                            <p>{props.obj.name}</p>
                        </>))
                        break
                }    
            }
        })
        .catch(
            (err)=>{
                console.log(err)
            }
        )
    
    //else{
    //    resalt=(<>
    //        <p>Привет</p>
    //    </>)
    //}
},[])    
useEffect(()=>{
    awaitClassifiers(props.classifiers)
    .then(()=>{
        if(!!props.classifiers.description){
            switch(props.classifiers.geometryType){
                case("Polygon"):
                setResalt(casePoligon(props.obj,props.classifiers))
                    break
                case("25D"):
                setResalt(case25D(props.obj, props.classifiers))
                    break
                case("Wall"):
                setResalt(caseWall(props.obj, props.classifiers))
                    break
                default:
                    setResalt((<>
                        <p>{props.obj.name}</p>
                    </>))
                    break
            }    
        }
    })
    .catch(
        (err)=>{
            console.log(err)
        }
    )
    // else{
    //     resalt=(<>
    //         <p>Привет</p>
    //     </>)
    // }
},[
    props.classifiers.name,props.classifiers.description,props.obj,props.classifiers
    //props.obj,props.classifiers
])    
    
    
    return resalt
}

