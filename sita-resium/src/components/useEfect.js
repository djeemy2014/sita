import { useState, useEffect, useRef, Component} from "react";
import { Viewer } from "resium";
import '../scss/_checkbox.scss'; 


const objList={
  name: 0,
  status: true,
  list:[
    {
      name: 1,
      status: true,
    },
    {
      name: 2,
      status: true,
    },
    {
      name: 3,
      status: true,
    },
    {
      name: 4,
      status: false,
      list:[
        {
          name: 5,
          status: true,
        },
        {
          name: 6,
          status: true,
        },
        {
          name: 7,
          status: true,
        },
      ]
    },
  ]

}

function RecursComponent (props){
  const comprops=props.comprops
  const [listLi,setListLi]=useState(comprops.status)
  //const [grendLitLi,setGrendLitLi]=useState(true)
  //console.log(props.comprops.name, props.greny)
  if (Array.isArray(comprops.list)){
    
    const contener=(
      <ul>
        {props.greny===undefined?null:(props.greny&&listLi).toString()}
        {' '}
        {/* listLi.toString() */}
        <input 
        className="custom-checkbox"
        //checked={props.greny===undefined?listLi:(props.greny&&listLi)} 
        checked={listLi} 
        type="checkbox" 
        onChange={
          ()=>{
            setListLi(!listLi)
            //console.log(listLi)
          }

          }/>
        <button onClick={()=>setListLi(!listLi)}>Class</button>
        {comprops.list.map((ev)=>{
          //console.log(ev);
          const contener=RecursComponent({
            comprops:ev,
            greny:props.greny===undefined?listLi:(props.greny&&listLi),
            setGreny:setListLi
          })
          //console.log(contener)
          //const contener=contener2[0]
          /* const contener=(
            <RecursComponent 
            comprops={ev} 
            greny={props.greny===undefined?listLi:(props.greny&&listLi)} 
            setGreny={setListLi}
            />
          ) */
          return contener[0]
        })}
      </ul>
    )
    return [contener,1]
    
    
  }else {
    //console.log(props.comprops.name, props.greny)
    //console.log(listLi)
    const contener=(
      <li>
      {props.greny===undefined?null:(props.greny&&listLi).toString()}
      {listLi}
      {' '}
      {/* listLi.toString() */}
      <input 
      className="custom-checkbox"
      //checked={props.greny===undefined?null:(props.greny&&listLi)} 
      checked={listLi} 
      type="checkbox" 
      onChange={()=>setListLi(!listLi)}
      />
      <button onClick={()=>setListLi(!listLi)}>Li</button>
      {/* <button onClick={()=>props.setGreny(listLi+10)}>Li2</button> */}
    </li>
    )
    return [contener,2]
  }
}

const ExampleComponent2 = (props) => {

  return  <>
          <button onClick={()=>{props.setCounter(props.counter+1)}}>Нажми</button>
         </>
}
const ExampleComponent = () => {
  const [counter,setCounter]=useState(1)
  const [obj, setObj]=useState({status:true, string:10})

  function handleClick(){
    setObj({
      ...obj,
      string:obj.string+1
    })
  }
  function handleClick2(){
    setObj({
      ...obj,
      status:!obj.status
      
    })
  }
  return <>
    <h1>Привет!</h1>
    <p>{obj.status.toString()}</p>
    <p>{obj.string+1}</p>
    <button onClick={handleClick}>Clic</button>
    <button onClick={handleClick2}>Clic2</button>
    
    <ExampleComponent2 counter={counter} setCounter={setCounter}/>
    <RecursComponent comprops={objList} setComponent={setObj}/>
    <ul>Овощи
      <li>{counter}</li>
      <li>2</li>
      <li>3</li>
      <li>
        <ul>
          Огурцы
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
      </li>
    </ul>
    
  </>;
};


class MyClass extends Component{
  constructor(props){
    super(props);
    //this.arrayWithElements = []
    //this.arrayWithElements2 = []
    //this.arrayWithElements3 =this.arrayWithElements2.bind(this)
    this.state={
      counter:1,
      obj:{status:true, string:10},
      arrayWithElements:[]
    }
    this.clickListener=this.clickListener.bind(this)
    document.onclick = this.clickListener;
    console.log(this.state.arrayWithElements)
  }
  //arrayWithElements = [];
  setCounter(val){
    this.setState({
      ...this.state,
      counter:val
    })
  }
  setObj(){}
  handleClick(){
    this.setState({
      ...this.state,
      obj:{string:this.state.obj.string+1}
    })
  }
  handleClick2(){

  }

  clickListener(e, arrayWithElements =this.state.arrayWithElements, setState=this.setState) {
    let clickedElement;
    if(e == null) {
        clickedElement = e.srcElement;
    } else {
        clickedElement = e.target;
    }
    console.log(e)
    //console.log(a)
    console.log(arrayWithElements)
    //console.log(this)
    arrayWithElements.push(clickedElement)
    this.setState({arrayWithElements:arrayWithElements})
    //arrayWithElements.push(clickedElement)
    //alert(arrayWithElements);
    console.log(arrayWithElements)
  }
  render(){

    

    return(
      <div>
        <h1>Привет1</h1>
        <div style={{width:'400px',  height:'400px'}}>
          <div 
          onClick={()=>{console.log('red')}}
          style={{width:'200px', 
          height:'200px', 
          backgroundColor:'red', 
          opacity:'0.5',
          position:'absolute',
          zIndex:'5'}}>
            <canvas style={{width:'200px', 
          height:'200px', backgroundColor:'red'}} >

            </canvas>
          </div>
          <div 
          onClick={()=>{console.log('green')}}
          style={{width:'200px', 
          height:'200px', 
          backgroundColor:'green', 
          opacity:'0.5',
          position:'absolute',
          top:'100px', 
          left:'100px',
          
          }}>
            <canvas style={{width:'200px', 
          height:'200px', }}>
              
              </canvas>
          </div>
        </div>
        <h1>Привет2</h1>
        <p>{this.state.obj.status.toString()}</p>
        <p>{this.state.obj.string+1}</p>
        {/* <button onClick={this.handleClick}>Clic</button>
        <button onClick={this.handleClick2}>Clic2</button> */}
        <div class="box">

          <div class="item">
            <div class="toggle-rect">
              <input type="checkbox" id="rect1" name="check"/>
              <label for="rect1"></label>
            </div>

          </div>
          <div class="item">
            <div class="toggle-rect-bw">
              <input type="checkbox" id="rect2" name="check"/>
              <label for="rect2"></label>
            </div>
          </div>

          <div class="item">
            <div class="toggle-rect-color">
              <input type="checkbox" id="rect3" name="check"/>
              <label for="rect3"></label>
            </div>
          </div>

          <div class="item">
            <div class="toggle-rect-dark">
              <input type="checkbox" id="rect4" name="check"/>
              <label for="rect4"></label>
            </div>
          </div>

          </div>
        <label><input className="custom-checkbox" type="checkbox" onClick={ev=>console.log(this)} />
        Тут</label>
        <br></br>
        <label><input className="custom-check-icon" type="checkbox" onClick={ev=>console.log(this)} />
        Тут2</label>
        <br></br>
        <br></br>
        <br></br>
        <ExampleComponent2 counter={this.state.counter} setCounter={this.setCounter}/>
        <RecursComponent comprops={objList} setComponent={this.setObj}/>
      </div>
    )
    
  }
}
export default MyClass