import {
    //createRef, 
    Component, 
    //useState, 
    //useRef
} from 'react'
import testCesiumElemet from '../testCesiumElemet'

class InputChekbox extends Component{
    constructor(props){
        super(props)
        this.layerName=props.name
        this.layerId=props.uid
        this.elementRef = props.elementRef
        this.classRef=props.classRef
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
        testCesiumElemet(this.elementRef)
        .then(async(layer)=>{
            if (this.classRef!==undefined){

                this.state.classChecked=this.classRef.current.state.defaultChecked
            }
            if (
                this.elementRef.current.cesiumElement.show!==(this.state.defaultChecked&&this.state.classChecked)//возможно ошибка
             ) {
               this.elementRef.current.cesiumElement.show=this.state.defaultChecked&&this.state.classChecked
               //||this.elementRef.current.cesiumElement.show!==prevProps.defaultChecked
             }
        }
        )
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
             ||this.elementRef.current.cesiumElement.show!==(prevProps.defaultChecked&&prevState.classChecked)//возможно ошибка
          ) {
            this.elementRef.current.cesiumElement.show=this.state.defaultChecked&&this.state.classChecked
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
                <label>{this.layerName}</label>
                <br></br>
            </>
        )}
}

export default InputChekbox
