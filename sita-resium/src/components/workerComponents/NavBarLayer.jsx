import './css/NavBarLayer.css'

import { useState } from 'react';
import {
    Button,
    Offcanvas
} from 'react-bootstrap'

function NumberList(props) {
    const arr = props.arr;
    const listItems = arr.map((number) =>
      <li>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

function NavBarLayer(props) {
    const [show, setShow] = useState(false);
    const arr = props.arr;
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        
        <Button variant='success' onClick={handleShow}className={'sita-button'}>
          <img className={'sita-img'} src='https://svgsilh.com/svg/1986159.svg' alt={'ОЙ'}/>
          {/* Показать список слоёв */}
        </Button>
  
        <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false} >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Список слоёв</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NumberList arr={arr} />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default NavBarLayer