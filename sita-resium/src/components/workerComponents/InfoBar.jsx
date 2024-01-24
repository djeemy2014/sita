import Collapse from 'react-bootstrap/Collapse';
import React, {
    //createRef, 
    Component, 
    useEffect, 
    useState, 
    //useRef
} from 'react'

function InfoBar(props){
const [open,setOpen]=useState(true)
const [inform,setinform]=useState(props.infoBar)

useEffect(()=>{
    //setinform(props.infoBar+'AA')
    //props.setInfoBar(props.infoBar+'')
    console.log(1)
},[props.infoBarId])
//console.log(props.infoBar)
return <>
        <Collapse
            in={open} 
            dimension={'width'}
            appear={true}
        >
        <div className='info-bar'>
            <button onClick={()=>{
                console.log(props)
                //props.setInfoBar({infoBar:props.infoBar+'AA'})
            }}>Кнопка обновления</button>
            <h1>InfoBar</h1>
            <h6>{props.infoBarId}</h6>
            <h6>{props.infoBarName}</h6>
            <div dangerouslySetInnerHTML={{ __html: props.infoBarBody}}></div>
            
        </div>
            
        </Collapse>
    </>
}

export default InfoBar