import {
    //createRef,
    useEffect, 
    Component,
    useState, 
    //useState, 
    //useRef
} from 'react'
import Collapse from 'react-bootstrap/Collapse' 
import testCesiumElemet from '../testCesiumElemet'
import LegendLayer from './LegendLayer'
//переписать в соотвествии с новыми особенностями.
export function InputChekboxFunction(props){
    const cElemRef = props.comprops.ref
    const [open, setOpen] = useState(false)
    //console.log(props)
    //const showStat=showStat
    //const setShowStat=setShowStat
    useEffect(() => {
        testCesiumElemet(cElemRef)
        .then(async(cElemRef)=>{
            // if (this.classRef!==undefined){
            //console.log(props.comprops.id,props.greny===undefined?null:(props.greny&&props.showStat))
            //console.log(props.comprops.id,cElemRef.current.cesiumElement.show)
            //     this.state.classChecked=this.classRef.current.state.defaultChecked
            cElemRef.current.cesiumElement.show=props.greny===undefined?null:(props.greny&&props.showStat)
            //console.log(props.comprops.id,cElemRef.current.cesiumElement.show)
            // }
            if (
                cElemRef.current.cesiumElement.show!==(props.greny===undefined?null:(props.greny&&props.showStat))//возможно ошибка
             ) {
               cElemRef.current.cesiumElement.show=props.greny===undefined?null:(props.greny&&props.showStat)
               //||cElemRef.current.cesiumElement.show!==prevProps.defaultChecked
             }
        })
        .catch(err=>{
            //console.log('cElemRef'/* ,err, props.comprops.name */)
        })
    },[])
    useEffect(() => {
        testCesiumElemet(cElemRef)
        .then(async(cElemRef)=>{
            // if (this.classRef!==undefined){
                //console.log(props)
            //     this.state.classChecked=this.classRef.current.state.defaultChecked
            // }
            cElemRef.current.cesiumElement.show=props.greny===undefined?null:(props.greny&&props.showStat)
            if (
                cElemRef.current.cesiumElement.show!==(props.greny===undefined?null:(props.greny&&props.showStat))//возможно ошибка
             ) {
               cElemRef.current.cesiumElement.show=props.greny===undefined?null:(props.greny&&props.showStat)
               //||cElemRef.current.cesiumElement.show!==prevProps.defaultChecked
             }
        })
        .catch(err=>{
            //console.log('cElemRef'/* ,err,  props.comprops.name */)
        })
        
    },[props.showStat,props.greny]) 
    
    return <li key={props.id}>
            
            
           <input 
          //checked={props.greny===undefined?null:(props.greny&&showStat)} 
          checked={props.showStat} 
          type="checkbox" 
          onChange={()=>props.setShowStat(!props.showStat)}
          />
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


}


class InputChekbox extends Component{
    constructor(props){
        super(props)
        this.component=props
        this.layerName=props.name
        this.layerId=props.uid
        this.cElemRef = props.comprops.ref
        //this.classRef=props.classRef
        this.classChecked=props.classChecked
        this.setClassChecked=props.setClassChecked
        this.state={
            defaultChecked:props.defaultChecked,
            classChecked:props.classChecked,
            clRef:props.classRef
        }
        
        
    }
    async getSnapshotBeforeUpdate(prevProps,prevState){
        if (this.state)
        if (this.state.clRef!==undefined){
            //console.log(
            //    this.state.clRef.current.state.defaultChecked,
            //    prevState.clRef.current.state.defaultChecked
            //    )
        }
        
    }

    async componentDidMount(){
        testCesiumElemet(this.cElemRef)
        .then(async(layer)=>{
            // if (this.classRef!==undefined){

            //     this.state.classChecked=this.classRef.current.state.defaultChecked
            // }
            if (
                this.cElemRef.current.cesiumElement.show!==(this.state.defaultChecked&&this.state.classChecked)//возможно ошибка
             ) {
               this.cElemRef.current.cesiumElement.show=this.state.defaultChecked&&this.state.classChecked
               //||this.cElemRef.current.cesiumElement.show!==prevProps.defaultChecked
             }
        }
        ).catch(err=>{console.log('cElemRef',err)})
    }
    async componentDidUpdate(prevProps,prevState) {
        //console.log(this.layerId, this.state.classChecked ) 
        if (this.state.clRef!==undefined&&(this.state.classChecked !==prevState.clRef.current.state.defaultChecked)){
        }
        if (
            this.state.clRef !==undefined&&this.state.clRef.current!==undefined&&( 
                this.state.clRef.current.state.defaultChecked !== prevState.clRef.current.state.defaultChecked
             )
            //this.state.clRef.current.state.defaultChecked !== prevState.clRef.current.state.defaultChecked
        ){
            //console.log(prevState.clRef)
            //console.log(prevState.clRef.current.state.defaultChecked)
            //console.log(this.state)
            //console.log(prevState.clRef.current.state.defaultChecked)
            //console.log(prevProps.clRef)
        }
        if (
             this.state.defaultChecked !== prevState.defaultChecked
             ||this.state.classChecked !== prevState.classChecked
             ||this.cElemRef.current.cesiumElement.show!==(prevProps.defaultChecked&&prevState.classChecked)//возможно ошибка
          ) {
            this.cElemRef.current.cesiumElement.show=this.state.defaultChecked&&this.state.classChecked
          }
    }

    render(){
        
        return (
            <>
                <input checked={this.state.defaultChecked} type="checkbox" id={this.layerId} onChange={()=>{
                        this.setState({
                            defaultChecked:!this.state.defaultChecked,
                        })
                        }}>

                </input>
                <label>{this.component.name}</label>
                <br></br>
            </>
        )}
}

export default InputChekbox
