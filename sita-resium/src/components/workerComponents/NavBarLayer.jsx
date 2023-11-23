import {createRef, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import InputChekbox,{InputChekboxFunction} from "./InputChecked"
import InputClassChekbox from "./InputClassChecked"
import {listToObj, listToObj2} from "./objList.js"
/*  */

function  NavListGeoJSON(props){
  const comprops=props.comprops
  const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
  const [open,setOpen]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked)
  //const inputList=objToList(inputObj)//??
  const ref=useRef()
  const proxiUrl = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'//???

  //console.log(comprops)
  
  if (Array.isArray(comprops.list)){
      //console.log(comprops.type)
      comprops.defaultChecked=showStat
      const contener=(
        <div>
        
        <ul key={comprops.id}>
        
          <input 
          //checked={props.greny===undefined?listLi:(props.greny&&listLi)} 
          checked={showStat} 
          type="checkbox" 
          onChange={
            ()=>{
              setShowStat(!showStat)
              //console.log(showStat)
            }
  
            }/>
          <button 
          className={open?'collapse-li plus':'collapse-li minus'}
          /* style={{width: '25px', height:'25px'}}  */
          onClick={()=>setOpen(!open)}
          ></button>
          {/* <button style={{width: '50px'}} onClick={()=>setShowStat(!showStat)}>Class</button> */}
          {/* {props.greny===undefined?null:(props.greny&&showStat).toString()} */}
          {/* <div className='p'> */}
            <p>{comprops.name}</p>
          {/* </div> */}
          {/* listLi.toString() */}
          
          <Collapse 
            in={open} 
            //dimension={'width'}
            appear={true}
          >  
          <div>
            <div /* style={{width: '250px'}} */ className='collapse-li'>
              {comprops.list.map((ev)=>{
                  if (ev.type.indexOf('class')===-1){
                      //console.log(lk++,comprops);
                      //console.log(laeyr);
                      //console.log(listConnectGeoJSON);
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
      //console.log(listConnectGeoJSON)
      return contener
      
      
    }else {
      //console.log(props.comprops.name, props.greny)
      //console.log(listLi)
      //console.log(comprops.type)
      comprops.defaultChecked=showStat
      const contener=(
          <InputChekboxFunction 
          {...props} 
          showStat={showStat} 
          setShowStat={setShowStat}
          />
        //   {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
        // </li>
        )
      return contener
    }



}




function NumberList(props) {
 //console.log(props.layersParams)
 
  return ( 
    <>
      <h5>Список слоёв</h5>
      <NavListGeoJSON comprops={
          props.layersParams3
        } />
      {/* <ObjListInputChekbox arr={listToObj(props.layersParams)}/> */}
    </>
   
  );
}



function NavBarLayer(props) {
  const [open, setOpen] = useState(false);
    //const layersParams = props.layersParams;
    const viewerRef=props.viewerRef
    const startPosition=props.startPosition
  console.log()
  return (
    
    <div className='tooldar-out'>
      <Collapse 
        in={open} 
        dimension={'width'}
        appear={true}
      >  
        <div className='div-collapse'>
          <div className='div-collapse-list' >
            <NumberList style={{right:'10px', left:'10px'}} {...props} />
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
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-legend'}
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-settings'}
        />
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-home'}
          onClick={()=>{
            viewerRef.current.cesiumElement.camera.flyTo({
                destination: startPosition
            }) 
            //this.viewerRef.current.cesiumElement.homeButton.viewModel.command.beforeExecute.addEventListener(e=>{this.homeButton(e)})
        }}
        />

      </div>
      
      
      
    </div>
  );
}

export default NavBarLayer;