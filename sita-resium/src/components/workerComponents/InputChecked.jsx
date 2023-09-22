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
        this.layerId=props.id
        this.reff = props.reff
        this.state={
            defaultChecked:props.defaultChecked,
        }
        
    }
    async componentDidMount(){
        testCesiumElemet(this.reff)
        .then(async(layer)=>{
            if (
                this.reff.current.cesiumElement.show!==this.state.defaultChecked
             ) {
               this.reff.current.cesiumElement.show=this.state.defaultChecked
               //||this.reff.current.cesiumElement.show!==prevProps.defaultChecked
             }
        }
        )
    }
    async componentDidUpdate(prevProps,prevState) {
        if (
             this.state.defaultChecked !== prevState.defaultChecked
             ||this.reff.current.cesiumElement.show!==prevProps.defaultChecked
          ) {
            this.reff.current.cesiumElement.show=this.state.defaultChecked
            //||this.reff.current.cesiumElement.show!==prevProps.defaultChecked
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
