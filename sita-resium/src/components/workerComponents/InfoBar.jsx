import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button'
import React, {
    //createRef, 
    Component, 
    useEffect, 
    useState, 
    //useRef
} from 'react'
// function resultInfo(props){
//     //const [informres,setinformres]=useState()

//     console.log(props.infoBarId)
//     console.log(props.DOMElementCanvas)
    
// return <>
// {//informres
// }
// </>
// }
function InfoBar(props){
const [open,setOpen]=useState(true)
const [inform,setinform]=useState(undefined)
const [id,setID]=useState(props.infoBarId)
const [idChange,setIDChange]=useState(false)
const [dom,setDom]=useState(props.DOMElementCanvas)
const [selectLook,setSelectLook]=useState(props.selectLookSelector)
//let result=undefined
useEffect(()=>{
    //setinform(props.infoBar+'AA')
    //props.setInfoBar(props.infoBar+'')
    //console.log(1)
    console.log(props.DOMElementCanvas)
    if (dom!==props.DOMElementCanvas){
        setDom(props.DOMElementCanvas)
    }
    
    //console.log(!props.selectLookSelector)
    //console.log(1)
},[props.DOMElementCanvas])
useEffect(()=>{
    //setinform(props.infoBar+'AA')
    //props.setInfoBar(props.infoBar+'')
    //console.log(1)
    //console.log(props.selectLookSelector)
    if (selectLook!==props.selectLookSelector){
        setSelectLook(props.selectLookSelector)
    }
    
    //console.log(!props.selectLookSelector)
    //console.log(1)
},[props.selectLookSelector])

useEffect(()=>{
    //setinform(props.infoBar+'AA')
    //props.setInfoBar(props.infoBar+'')
    //console.log(1)
    //console.log(props.infoBarId)
    //console.log(id)
    //console.log(id!==props.infoBarId)
    if (id!==props.infoBarId){
        //console.log(1)
        setIDChange(true)
        setID(props.infoBarId)
    }else{
        //console.log(0)
        setIDChange(false)
    }
    //console.log(!props.selectLookSelector)
    //console.log(1)
},[props.infoBarId])
useEffect(()=>{
    //setinform(props.infoBar+'AA')
    //props.setInfoBar(props.infoBar+'')
    //console.log(1)
    //console.log(id,dom,!selectLook,idChange)
    if (!selectLook&&dom){
        let result = (  
                    <div className='info-bar-window' id={props.infoBarId} style={{overflow: 'auto'}}>
                        <h6>{props.infoBarName??props.infoBarId}</h6>
                        {/* <h6>{}</h6> */}
                        <div className='infoBarBody' dangerouslySetInnerHTML={{ __html: props.infoBarBody}}></div>
                    </div>
                            )
                            setinform(result)
    }
    //if (){}
   /*  if (id!==props.infoBarId){
        setIDChange(idChange)
        setID(props.infoBarId)
    } */
    //console.log(!props.selectLookSelector)
    //console.log(1)
},[dom,selectLook,id])

return <>
        <Collapse
            in={props.infoBoxSwith} 
            dimension={'width'}
            appear={true}
            //timeout={5000}
            //className='collapsing'
        >
                <div className='info-bar'>
                    <div className='info-bar-viwer'>
                        <div className='info-bar-header'>
                            <Button
                            className='sita-button sita-button-close' 
                            //style={{
                            //    //width:'20px',
                            //    //height:'20px',
                            //    //margin:'5px',
                            //    //right:
                            //    backgroundColor: '#ff0'
                            //    }}
                                onClick={()=>{
                                    props.setInfoBoxSwith(!props.infoBoxSwith)
                                }}
                            ></Button>
                            {/* <div className='closeInfo' style={{
                                width:'20px',
                                height:'20px',
                                margin:'5px',
                                //right:
                                backgroundColor: '#ff0'
                                }}
                                onClick={()=>{
                                    props.setInfoBoxSwith(!props.infoBoxSwith)
                                }}
                                >

                                </div> */}
                            <h3>Информация о выбраном объекте</h3>
                        </div>
                        {inform}
                    </div>
                </div>
        </Collapse>
    </>
}

export default InfoBar