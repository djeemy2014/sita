import {
    //createRef, 
    Component, 
    //useState, 
    //useRef
} from 'react'
//import testCesiumElemet from '../testCesiumElemet'

/* function InputClassChekbox (){

}
 */
class InputClassChekbox extends Component{
    constructor(props){
        super(props)
        this.name=props.name
        this.classChecked=props.classChecked
        this.setClassChecked=props.setClassChecked
        this.state={
            defaultChecked:props.defaultChecked,
            classChecked:props.classChecked
        }
    }
    async componentDidMount(){

    }
    async componentDidUpdate(prevProps,prevState) {
        //console.log( this.state)
        //console.log( this.classChecked)
        //console.log( this.state)
        if (this.classChecked=== this.state.defaultChecked){
            //console.log('равные')
            //console.log(prevState.defaultChecked)

        }else{
            //console.log('НЕ равные',this.classChecked)
            this.setClassChecked(!this.classChecked)
            //console.log('а теперь?', this.classChecked)
        }
        if (
            this.state.defaultChecked !== prevState.defaultChecked
            //возможно ошибка
         ) {
            //console.log(this.state.defaultChecked)
           
           //||this.elementRef.current.cesiumElement.show!==prevProps.defaultChecked
         }
    }

        render(){
            //console.log(this.name, this.state.defaultChecked)
            return (
                <>
                    <input checked={this.state.defaultChecked} type="checkbox" onChange={()=>{
                            this.setState({
                                defaultChecked:!this.state.defaultChecked,
                                
                            })
                            this.setClassChecked(!this.classChecked)
                            }}>
    
                    </input>
                    <label>{this.name}</label>
                    <br></br>
                </>
            )}
    
}
export default InputClassChekbox