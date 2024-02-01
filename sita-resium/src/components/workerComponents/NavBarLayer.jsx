import {createRef, useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {InputChekboxFunction} from "./InputChecked"
import InfoBar from "./InfoBar"
/*  */

function  NavListGeoJSON(props){
  const comprops=props.comprops
  const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
  const [open,setOpen]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked)
  //const [rendernumb,setRendernumb]=useState(0)
  //const inputList=objToList(inputObj)//??
  //const ref=useRef()
  //const proxiUrl = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'//???
  //let contener=<></>
  //console.log(comprops)
  // useEffect(()=>{
    
  //   if (Array.isArray(comprops.list)){
  //     //console.log(comprops.type)
  //     comprops.defaultChecked=showStat
  //     contener=(<div>
        
  //       <ul key={comprops.id}>
        
  //         <input 
  //         //checked={props.greny===undefined?listLi:(props.greny&&listLi)} 
  //         checked={showStat} 
  //         type="checkbox" 
  //         onChange={
  //           ()=>{
  //             setShowStat(!showStat)
  //             //console.log(showStat)
  //           }
  
  //           }/>
  //         <button 
  //         className={open?'collapse-li plus':'collapse-li minus'}
  //         /* style={{width: '25px', height:'25px'}}  */
  //         onClick={()=>setOpen(!open)}
  //         ></button>
  //         {/* <button style={{width: '50px'}} onClick={()=>setShowStat(!showStat)}>Class</button> */}
  //         {/* {props.greny===undefined?null:(props.greny&&showStat).toString()} */}
  //         {/* <div className='p'> */}
  //           <p>{comprops.name}</p>
  //         {/* </div> */}
  //         {/* listLi.toString() */}
          
  //         <Collapse 
  //           in={open} 
  //           //dimension={'width'}
  //           appear={true}
  //         >  
  //         <div>
  //           <div /* style={{width: '250px'}} */ className='collapse-li'>
  //             {comprops.list.map((ev)=>{
  //               console.log(ev)
  //                 if (ev.type.indexOf('class')===-1){
  //                     //console.log(lk++,comprops);
  //                     //console.log(laeyr);
  //                     //console.log(listConnectGeoJSON);
  //                   }
  //               const mylticontener=NavListGeoJSON ({
  //                 comprops:ev, 
  //                 greny:props.greny===undefined?showStat:(props.greny&&showStat) ,
  //                 setGreny:setShowStat,
  //                 listConnectGeoJSON:props.listConnectGeoJSON
  //               })
  //               contener= mylticontener
              
  //               return contener
  //             })}
  //           </div>
  //           </div>
  //         </Collapse>
  //       </ul>
  //       </div>)
      
  //     //console.log(listConnectGeoJSON)
  //     //return contener
      
      
  //   }else {
  //     //console.log(props.comprops.name, props.greny)
  //     //console.log(listLi)
  //     //console.log(comprops.type)
  //     comprops.defaultChecked=showStat
  //     contener=(
  //         <InputChekboxFunction 
  //         {...props} 
  //         showStat={showStat} 
  //         setShowStat={setShowStat}
  //         />
  //       //   {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
  //       // </li>
  //       )
  //     //return contener
  //   }
  // },[])
  //setRendernumb(rendernumb+1)
  //console.log(rendernumb)
  if (!Array.isArray(comprops.list)){
    comprops.defaultChecked=showStat
    return(
      
        <InputChekboxFunction 
        {...props} 
        classifiers={props.classifiers}
        showStat={showStat} 
        setShowStat={setShowStat}
        />
      )
    }else{
      if (comprops.type==="scen"){
        return (<div>
          <ul key={comprops.id}>
          <div>
            <div className='collapse-li'>
            
              {
                comprops.list.map((ev)=>{
                  return <NavListGeoJSON 
                  comprops={ev}
                  classifiers={(props.classifiers.filter((elem)=>elem.prototype===ev.prototype)[0]??props.classifiers)}
                  greny={showStat}
                  setGreny={setShowStat}
                  //listConnectGeoJSON={props.listConnectGeoJSON}
                  />
                })
              }
            </div>
            </div>
          </ul>
        </div>)
      }else{

      
      comprops.defaultChecked=showStat
      return (
        <div>
        <ul key={comprops.id}>
          <input 
          checked={showStat} 
          type="checkbox" 
          onChange={
            ()=>{
              setShowStat(!showStat)
            }
            }/>
          <button 
          className={open?'collapse-li plus':'collapse-li minus'}
          onClick={()=>setOpen(!open)}
          ></button>
            <p>{comprops.name}</p>
          <Collapse 
            in={open} 
            appear={true}
          >  
          <div>
            <div className='collapse-li'>
              {
                comprops.list.map((ev)=>{
                  return <NavListGeoJSON 
                  comprops={ev}
                  classifiers={(props.classifiers.filter((elem)=>elem.prototype===ev.prototype)[0]??props.classifiers)}
                  greny={showStat}
                  setGreny={setShowStat}
                  //listConnectGeoJSON={props.listConnectGeoJSON}
                  />
                })
              }
            </div>
            </div>
          </Collapse>
        </ul>
        </div>
      )
      }
    }
    
    /* else {
      comprops.defaultChecked=showStat
      const contener=(
        <div>
        <ul key={comprops.id}>
          <input 
          checked={showStat} 
          type="checkbox" 
          onChange={
            ()=>{
              setShowStat(!showStat)
            }
            }/>
          <button 
          className={open?'collapse-li plus':'collapse-li minus'}
          onClick={()=>setOpen(!open)}
          ></button>
            <p>{comprops.name}</p>
          <Collapse 
            in={open} 
            appear={true}
          >  
          <div>
            <div className='collapse-li'>
              {comprops.list.map((ev)=>{
                //console.log(ev)
                  if (ev.type.indexOf('class')===-1){
                    }
                const mylticontener=NavListGeoJSON ({
                  comprops:ev, 
                  greny:props.greny===undefined?showStat:(props.greny&&showStat) ,
                  setGreny:setShowStat,
                  listConnectGeoJSON:props.listConnectGeoJSON
                })
                const contener= mylticontener
                return contener
              })}
            </div>
            </div>
          </Collapse>
        </ul>
        </div>
      )
      return contener
    } */
    
    //return contener

}


 

function NumberList(props) {
 //console.log(props)
  return ( 
    <>
      <h6>Сцена: {props.layersParams.name}</h6>
      <p>Описание: {props.layersParams.description}</p>
      <h6>Список слоёв</h6>
      <NavListGeoJSON 
      comprops={
          props.layersParams
        } 
      classifiers={props.classifiers}
        />
      
    </>
   
  );
}



function NavBarLayer(props) {
  const [open, setOpen] = useState(false);
  const [openInfoBox, setOpenInfoBox] = useState('block');
    const viewerRef=props.viewerRef
    const startPosition=props.startPosition
  //console.log()

  return (<>
  
    
    <div className='tooldar-out'>
      <Collapse 
        in={open} 
        dimension={'width'}//'width'}
        appear={true}
      >  
        <div className='div-collapse'>
          <div className='div-collapse-list' >
            <div className='div-name-scene'>

            </div>
            <div className='div-description-scene'>

            </div>
            <NumberList style={{right:'10px', left:'10px'}} {...props} />
            <div className='div-legend-scene'>

            </div>
          </div>
        </div>
      </Collapse>
      <div className={'div-button'}>
        <Button 
          aria-controls="example-collapse-text" 
          onClick={() => {setOpen(!open); }} 
          aria-expanded={open} 
          className={`sita-button sita-button-list ${open?'list-open':'list-close'}`}
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-info'}
          onClick={(elem)=>{
            
            props.setInfoBoxSwith(!props.infoBoxSwith)
            console.log(props.infoBoxSwith)
            // const infobox=document.querySelector('.cesium-viewer-infoBoxContainer')
            // const button=document.querySelector('.sita-button-info')
            // if (openInfoBox==='block'){
            //   setOpenInfoBox('none')
            //   infobox.style.cssText =`display:none`
            //   button.style.cssText =`border-style:solid`
            // }else{
            //   setOpenInfoBox('block')
            //   infobox.style.cssText =`display:block`
            //   button.style.cssText =`border-style:none`
            // }
            // console.log(infobox)
            //viewerRef.current.cesiumElement.constructor('infoBox', false)
            //console.log( viewerRef.current.cesiumElement.constructor('infoBox', false))
            //viewerRef.current.cesiumElement.constructor({infoBox:false})
            //viewerRef.current.cesiumElement.
            //props.setInfoBoxSwith()
          }}
        />
        {/* <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-legend'}
        /> */}
        {/* <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-settings'}
        /> */}
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-home'}
          onClick={()=>{
            console.log(viewerRef.current.cesiumElement)
            viewerRef.current.cesiumElement.camera.flyTo({
                destination: startPosition
            }) 
            //this.viewerRef.current.cesiumElement.homeButton.viewModel.command.beforeExecute.addEventListener(e=>{this.homeButton(e)})
        }}
        />

      </div>
    </div>
    {/* <div className='info-bar'>
      <InfoBar/>
            
    </div> */}
    </>
  );
}

export default NavBarLayer;