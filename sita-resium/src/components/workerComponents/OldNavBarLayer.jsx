import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

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
  return (
    
    <div className='test-tooldar'>
      <Collapse 
        in={open} 
        dimension={'width'}
        appear={true}
      >  
        <div className='test-collapse'>
          <div style={{ width: '200px' }}>
            <NumberList arr={arr} />
          </div>
          
        </div>
      </Collapse>
      <div className={'test-div-button'}>
        <Button 
          aria-controls="example-collapse-text" 
          onClick={() => setOpen(!open)} 
          aria-expanded={open} 
          className={'sita-button'}
        >
          <img className={'sita-img'} src='https://svgsilh.com/svg/1986159.svg' alt={'ОЙ'}/>
          
          {/* Показать список слоёв */}
        </Button>
        <Button 
          aria-controls="example-collapse-text" 
          className={'sita-button'}
        >
          <img className={'sita-img'} src='https://svgsilh.com/svg/1986159.svg' alt={'ОЙ'}/>
          <svg x></svg>
          {/* Показать список слоёв */}
        </Button>
        <button className='sita-button btn btn-primar'>N</button>
      </div>
      
      
      
    </div>
  );
}

export default NavBarLayer;