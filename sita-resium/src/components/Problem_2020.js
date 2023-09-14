import React, { 
  //useState, 
  useRef, useEffect } from 'react';
import { Cartesian3, SceneMode, 
  //IonImageryProvider 
} from 'cesium';
import { BillboardGraphics, 
  //Camera,
   Entity, Viewer } from 'resium';

const dummyElement = document.createElement('div');

function AssetMap(props) {
//const [billboardClicked, setBillboardClicked] = useState(false);
//const [selectedEntity, setSelectedEntity] = useState({});

const ref = useRef(null);  // Ref for <Viewer>
const entityRef = useRef(null); //Ref for <Entity>

const options = {
animation: false,
baseLayerPicker: false,
fullscreenButton: false,
geocoder: false,
homeButton: false,
selectionIndicator: false,
timeline: false,
navigationHelpButton: false,
navigationInstructionsInitiallyVisible: false,
scene3DOnly: true,
infoBox: false,
sceneMode: SceneMode.SCENE2D,
creditContainer: dummyElement
};

useEffect(() => {
  // checking if viewer ref.current.cesiumElement is not undefined
  if(ref.current && ref.current?.cesiumElement){
    //Want to zoom to a collection of entities but the entityRef.current.cesiumElement remains undefined
    ref.current.cesiumElement.zoomTo(entityRef.current.cesiumElement);
  }
})
return(
        <>
        <Viewer {...options} ref={ref}>
          
          {props.data.map(item => (
          <Entity
                id={item.id}
                key={item.id}
                show={item.showMarker}
                position={Cartesian3.fromDegrees(item.longitude, item.latitude)}
                
                ref={entityRef}>
          <BillboardGraphics image={item.assetMarker} />
          </Entity>
          ))}
        </Viewer>
        </>
        
) 



}
export default AssetMap