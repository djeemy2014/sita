import { useState, Children  } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import InputChekbox from "./InputChecked"
import {listToObj} from "./objList.js"
/*  */


function ObjListInputChekbox(arr,i=0){
  let output=null
  if (Array.isArray(arr.arr)) {
    output=(
      <ul>
        {arr.arr.map((elem)=>
          <ObjListInputChekbox arr={elem}/>
        )}
      </ul>
    )
  }
  else
  {
    if (arr.arr.type.indexOf('class')!==-1){
      output=(
        <ul>
          {arr.arr.name}
          {arr.arr.list.map((elem)=>
            <ObjListInputChekbox arr={elem}/>
          )}
        </ul>
      )
    }else{
      output=(
        <li>
          {
            <InputChekbox {...arr.arr} elementRef={arr.arr.ref} />
          }
        </li>
      )
    }
  }
  return output 


}



function NumberList(props) {
  //const arr = props.arr;
  //console.log(props)
  //console.log(listToObj(listItems2))
  /* const fullList = props.layersParams.map((elem,index)=>elem.ref=props.layers[index]) */
  //console.log(ObjListInputChekbox(listToObj(props.layersParams)))

  const listItems = props.layersParams.map((elem, index)=>
     <li>
       <InputChekbox {...props.layersParams[index]} elementRef={props.layers[index]}  />
     </li>
    //console.log(props.layersParams[index])
    //console.log(elem)
  )
  //console.log(listItems3)
  // const listItems = arr.map((number, index) =>
  // <>
  //   <li>{number}</li>
  //   {/* <InputChekbox {...number} elementRef={this.layers[index]}  /> */}
  // </>
  // );
  return ( 
    <>
      <h6>Список слоёв</h6>
      
      <ObjListInputChekbox arr={listToObj(props.layersParams)}/>
    </>
   
  );
}



function NavBarLayer(props) {
  const [open, setOpen] = useState(false);
    const arr = props.arr;
    const layers = props.layers;
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
            <NumberList style={{right:'10px', left:'10px'}} {...props} layers={layers} layersParams={layersParams} />
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