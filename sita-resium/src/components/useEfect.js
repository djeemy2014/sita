import { useEffect, useRef } from "react";
import { Viewer } from "resium";

const ExampleComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current.cesiumElement)
    setTimeout(()=>{
        if (ref.current && ref.current.cesiumElement) {
            console.log(ref.current.cesiumElement)
            // ref.current.cesiumElement is Cesium's Viewer
            // DO SOMETHING
          }
    },1)
    
  }, []);

  return <Viewer ref={ref} />;
};
export default ExampleComponent