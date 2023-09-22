import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

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
  const [open, setOpen] = useState(false);
    const arr = props.arr;
  return (
    
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
      <Collapse in={open}>  
        <div id="example-collapse-text">
          <NumberList arr={arr} />
        </div>
      </Collapse>
    </>
  );
}

export default NavBarLayer;