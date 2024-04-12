import {createRef, useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {InputChekboxFunction} from "./InputChecked"
import LegendLayer from './LegendLayer'
import InfoBar from "./InfoBar"
/*  */
function NavLegendGeoJSON(props){
  const comprops=props.comprops
  //const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
  const [open,setOpen]=useState(true)
  const [resalt,setResalt]=useState(<></>)
  
  useEffect(()=>{
    if (!Array.isArray(comprops.list)){
      //comprops.defaultChecked=showStat
      setResalt(
        
        <li key={props.id}>
           <button 
             className={open?'collapse-li plus':'collapse-li minus'}
             onClick={()=>setOpen(!open)}
             ></button>
           {/* <button style={{width: '50px'}} onClick={()=>props.setShowStat(!props.showStat)}>Li</button> */}
           {/* {props.greny===undefined?null:(props.greny&&props.showStat).toString()}
           {props.showStat} */}
           {/* {' '} */}
           <p>{props.comprops.name}</p>
           {/* showStat.toString() */}
  
           {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
           <Collapse
                 in={open} 
                 appear={true}
             >
                 <div>
                 <LegendLayer classifiers={props.classifiers} obj={props.comprops}></LegendLayer> 
                 </div>
  
             </Collapse>
         </li>
        )
      }else{
        if (comprops.type==="scen"){
          setResalt (<div>
            <ul key={comprops.id}>
            <div>
              <div className='collapse-li'>
              
                {
                  comprops.list.map((ev)=>{
                    return <NavLegendGeoJSON 
                    comprops={ev}
                    classifiers={(props.classifiers.filter((elem)=>elem.prototype===ev.prototype)[0]??props.classifiers)}
                    //greny={showStat}
                    //setGreny={setShowStat}
                    //listConnectGeoJSON={props.listConnectGeoJSON}
                    />
                  })
                }
              </div>
              </div>
            </ul>
          </div>)
        }else{
  
        
        //comprops.defaultChecked=showStat
        setResalt (
          <div>
          <ul key={comprops.id}>
            {/* <input 
            checked={showStat} 
            type="checkbox" 
            onChange={
              ()=>{
                setShowStat(!showStat)
              }
              }/> */}
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
                    return <NavLegendGeoJSON 
                    comprops={ev}
                    classifiers={(props.classifiers.filter((elem)=>elem.prototype===ev.prototype)[0]??props.classifiers)}
                    //greny={showStat}
                    //setGreny={setShowStat}
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
  },[
    open,props.classifiers,comprops, props.comprops, props.id
  ])
  return (resalt)
}
function  NavListGeoJSON(props){
  const comprops=props.comprops
  const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
  const [open,setOpen]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked)
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
      //console.log(props.classifier)
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
    
}


 

function NumberList(props) {
  const [resalt, setResalt]=useState(<></>)
  const ref= useRef()
 //console.log(props)
  useEffect(()=>{
    setResalt(<div className='work-list' ref={ref}>
    <div className={'nameScene'}><h5>Сцена: {props.layersParams.name}</h5></div>
    <div className={`discriptionScene ${props.switchInfo===0?'open':'close'}`}>
      <div>
        <p>Описание: {props.layersParams.description}</p>
      </div>
      </div>
    
    <div className={`layersScen ${props.switchInfo===2?'open':'close'}`}>
      <div>
        <h6>Слои</h6>
        <NavListGeoJSON 
        comprops={
            props.layersParams
          } 
        classifiers={props.classifiers}
          />
      </div>
    </div>
    <div className={`legendScene ${props.switchInfo===1?'open':'close'}`}>
      <div>
        <h6>Условные обозначения</h6>
        <NavLegendGeoJSON 
        comprops={
            props.layersParams
          } 
        classifiers={props.classifiers}
          />
      </div>
      </div>
  </div>)
  },
  [
    props.switchInfo,props.layersParams,props.classifiers
  ])
  //console.log(document.querySelector('.nameScene')?.style.height)
  return ( 
    resalt
   
  );
}



function NavBarLayer(props) {
  const [open, setOpen] = useState(false);
  const [openInfoBox, setOpenInfoBox] = useState('block');
  const [scenName, setScenName] = useState(true);
  const [switchInfo, setSwitchInfo] = useState(0);
  // const [discriptionScene, setDiscriptionScene] = useState(false);
  // const [legendScene, setLegendScene] = useState(false);
  // const [layersScen, setLayersScen] = useState(false);
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
            <NumberList style={{right:'10px', left:'10px'}} 
            {...props} 
            scenName={scenName}
            // discriptionScene={discriptionScene}
            // legendScene={legendScene}
            // layersScen={layersScen}
            switchInfo={switchInfo}
              />
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
          className={'sita-button sita-button-discriptionScene'+` ${switchInfo===0?'button-on':'button-off'}`}
          onClick={(elem)=>{
            setSwitchInfo(0)
            //setDiscriptionScene(!discriptionScene)
          }}
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-layers'+` ${switchInfo===2?'button-on':'button-off'}`}
          onClick={(elem)=>{
            setSwitchInfo(2)
            //props.setInfoBoxSwith(!props.infoBoxSwith)
            //console.log(props.infoBoxSwith)
          }}
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-legend'+` ${switchInfo===1?'button-on':'button-off'}`}
          onClick={(elem)=>{
            setSwitchInfo(1)
            //props.setInfoBoxSwith(!props.infoBoxSwith)
            //console.log(props.infoBoxSwith)
          }}
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-info'}
          onClick={(elem)=>{
            props.setInfoBoxSwith(!props.infoBoxSwith)
            //console.log(props.infoBoxSwith)
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