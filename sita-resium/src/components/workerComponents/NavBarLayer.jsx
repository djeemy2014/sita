import {createRef, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import InputChekbox from "./InputChecked"
import InputClassChekbox from "./InputClassChecked"
import {listToObj} from "./objList.js"
/*  */

function  NavListGeoJSON(props){
  const comprops=props.comprops
  const [showStat, setShowStat]=useState(comprops.defaultChecked===undefined?true:comprops.defaultChecked) //comprops.defaultChecked===undefined?true:comprops.defaultChecked
  //const inputList=objToList(inputObj)//??
  const ref=useRef()
  const proxiUrl = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'//???

  //console.log(ref)
  
  if (Array.isArray(comprops.list)){
      //console.log(comprops.type)
      const contener=(
        <ul>
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
          <button onClick={()=>setShowStat(!showStat)}>Class</button>
          {props.greny===undefined?null:(props.greny&&showStat).toString()}
          {' '+comprops.name}
          {/* listLi.toString() */}
          
          
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
            const contener= mylticontener[0]
            return contener
          })}
        </ul>
      )
      //console.log(listConnectGeoJSON)
      return contener
      
      
    }else {
      //console.log(props.comprops.name, props.greny)
      //console.log(listLi)
      //console.log(comprops.type)
      
      const contener=(<li>
           <input 
          //checked={props.greny===undefined?null:(props.greny&&showStat)} 
          checked={showStat} 
          type="checkbox" 
          onChange={()=>setShowStat(!showStat)}
          />
          <button onClick={()=>setShowStat(!showStat)}>Li</button>
          {props.greny===undefined?null:(props.greny&&showStat).toString()}
          {showStat}
          {' '}
          {/* showStat.toString() */}
         
          
          {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
        </li>)
      return contener
    }



}


function ObjListInputChekbox(arr,classRef,classHookCheck=true,i=0){
  let output=null
  let intervalRef = useRef(null);
  let [checked, setChecked]=useState(classHookCheck)
  
  if (Array.isArray(arr.arr)) {
    output=(
      <ul>
        {arr.arr.map((elem)=>
          <ObjListInputChekbox 
            arr={elem} 
            classHookCheck={true} />
        )}
      </ul>
    )
  }
  else
  {
    if (arr.arr.type.indexOf('class')!==-1){
      //console.log(arr.arr.defaultChecked)
      //let classHookCheck =arr.arr.defaultChecked 
      let hook = <InputClassChekbox 
                    name={arr.arr.name} 
                    classChecked={checked} 
                    setClassChecked={setChecked}
                    defaultChecked={arr.arr.defaultChecked} 
                    ref={intervalRef}/>
      //setTimeout(()=>{console.log(intervalRef)},5000)
      
      output=(
        <ul>
          {hook}
          
          {/* {arr.arr.name} */}

          {arr.arr.list.map((elem)=>
            <ObjListInputChekbox 
              arr={elem} 
              classRef={intervalRef}
              setClassChecked={setChecked} 
              classHookCheck={arr.arr.defaultChecked}/>
          )}
        </ul>
      )
    }else{
      //console.log(arr.classRef)
      output=(
        <li>
          {
            <InputChekbox 
              {...arr.arr} 
              classChecked={checked} 
              classRef={arr.classRef} 
              elementRef={arr.arr.ref} />
          }
        </li>
      )
    }
  }
  return output 


}



function NumberList(props) {
 //console.log(props.layersParams)
  return ( 
    <>
      <h6>Список слоёв</h6>
      <NavListGeoJSON comprops={
        {
          name: "scen",
          type: "scen",
          list:listToObj(props.layersParams)
        }
        } />
      <ObjListInputChekbox arr={listToObj(props.layersParams)}/>
    </>
   
  );
}



function NavBarLayer(props) {
  const [open, setOpen] = useState(false);
    const layersParams = props.layersParams;
    const viewerRef=props.viewerRef
    const startPosition=props.startPosition
  console.log()
  return (
    
    <div className='test-tooldar'>
      <Collapse 
        in={open} 
        dimension={'width'}
        appear={true}
      >  
        <div className='test-collapse'>
          <div style={{width: '300px', height: "100vh" }}>
            <NumberList style={{right:'10px', left:'10px'}} {...props} layersParams={layersParams} />
          </div>
          
        </div>
      </Collapse>
      <div className={'div-button'}>
        <Button 
          aria-controls="example-collapse-text" 
          onClick={() => {setOpen(!open); }} 
          aria-expanded={open} 
          className={'sita-button sita-button-list'}
        >
          {/* <img className={'sita-img'} src='https://svgsilh.com/svg/1986159.svg' alt={'ОЙ'}/> */}
          
          {/* Показать список слоёв */}
        </Button>
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-settings'}
        >
         
          
          {/* Показать список слоёв */}
        </Button>
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button sita-button-home'}
          onClick={()=>{
            viewerRef.current.cesiumElement.camera.flyTo({
                destination: startPosition
            }) 
            //this.viewerRef.current.cesiumElement.homeButton.viewModel.command.beforeExecute.addEventListener(e=>{this.homeButton(e)})
        }}
        >
          
          {/* Показать список слоёв */}
        </Button>

      </div>
      
      
      
    </div>
  );
}

export default NavBarLayer;