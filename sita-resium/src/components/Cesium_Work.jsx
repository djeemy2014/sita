import {createRef, Component} from 'react'
import { Viewer } from 'resium'
//функция ожидания cesiumElement
function getData(th,i=0){
    //console.log(i)
    if (th.ref.current?.cesiumElement) {
        //console.log(i)
        //console.log(Object.keys(th.ref.current)[0]==='cesiumElement')
        //console.log(th.ref.current?.cesiumElement)
        console.log(0,th.ref.current.cesiumElement)
        return (true)
  // th.ref.current.cesiumElement is Cesium's Viewer
  // DO SOMETHING
        } else if (i<100){
            i=i+1;
            setTimeout(()=>{
                getData(th, i)
                //console.log(i)
            },500)

        
        }else {
            return (new Error(`Ожидание больше ${100*500/1000} секунд.`))
        }
    
    }

class Cesium2 extends Component{
    constructor(props) {
        super(props);
        this.ref = createRef();
      }
            
    
      async componentDidMount() {
         //Класс промиса провеки????? Тесты?  
        //console.log('1', this)
        //console.log('1', this.ref.current)
        console.log( getData(this))
        

      }

    render(){
        return (
            <div className='viewer'>
               <Viewer full ref={this.ref}/> 
            </div>
        )
    }
}

export default Cesium2