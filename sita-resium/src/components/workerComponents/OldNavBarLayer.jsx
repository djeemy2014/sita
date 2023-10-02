import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

/*  */

function NumberList(props) {
  const arr = props.arr;
  
  const listItems = arr.map((number) =>
    <li>{number}</li>
  );
  return ( 
    <>
      <h6>Список слоёв</h6>
      <ul>{listItems}</ul>
    </>
   
  );
}



function NavBarLayer(props) {
  const [open, setOpen] = useState(false);
    const arr = props.arr;
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
          <div style={{width: '200px', height: "100vh" }}>
            <NumberList style={{right:'10px', left:'10px'}} arr={arr} />
          </div>
          
        </div>
      </Collapse>
      <div className={'test-div-button'}>
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