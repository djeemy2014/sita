import { useState, useEffect, useRef, Component} from "react";
import { Viewer } from "resium";


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
    this.state={
      counter:1,
      obj:{status:true, string:10}
    }
  }
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

  render(){
    return(
      <div>
        <h1>Привет!</h1>
        <p>{this.state.obj.status.toString()}</p>
        <p>{this.state.obj.string+1}</p>
        <button onClick={this.handleClick}>Clic</button>
        <button onClick={this.handleClick2}>Clic2</button>

        <ExampleComponent2 counter={this.state.counter} setCounter={this.setCounter}/>
        <RecursComponent comprops={objList} setComponent={this.setObj}/>
      </div>
    )
    
  }
}
export default MyClass