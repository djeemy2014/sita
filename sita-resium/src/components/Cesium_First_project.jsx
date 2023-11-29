import React, {useEffect, useState} from "react";
import DJeemyComponentCesium from "./Cesium_Work";





export default function CesiumProgert(props){
    const server = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
    const nameProject = 'project_1'
    const projectURL = './project.json'
    const [project, setProject]=useState(null)
    const [scene, setScene]=useState(null)
    const [sceneHTML, setSceneHTML]=useState(null)

    const loder= <div className="loader">
            <div>
                <p>Загрузка...</p>
            </div>
        </div>

    useEffect(()=>{
        async function projectFetchData(){
           // setTimeout(()=>{
                fetch(server+nameProject+'/'+projectURL).then(data=>data.json()).then(data=>{
                    //console.log(data)
                    setProject(data);
                    fetch(server+nameProject+'/'+data.scenes[0].file).then(data=>data.json()).then(data=>{
                        setScene(data)
                    })
                    
                })

           // },5000)
            
        }
        projectFetchData()
            
        },[])

    useEffect(()=>{
        //fetch(server+nameProject+'/'+scene.file).then(data=>data.json()).then(data=>{
        //   setScene(data)
        //})
        !!scene?descriptionViwer(scene):console.log(scene)
    },[scene])
    useEffect(()=>{
        console.log('изменил')
        //console.log(scene)
    },[sceneHTML])

    
        
    function descriptionViwer(scene){
        //console.log(scene); 
    
        const header=!!project&&!!scene?<>
        <header>
              <div className="customer">
                <div  className="div-href">
                  <a href={project.customerWebsite} target="_blank">
                    <p>{project.customer}</p>
                    </a>
                </div>
              </div>
              <div className="titel-header">
                <div  className="div-href">
                  <a href='#'><p>{project.name}</p></a>
                </div>
              </div>
              <div className="contractor" >
                <div  className="div-href">
                  <a href={project.сontractorWebsite} target="_blank"><p>{project.сontractor}</p></a>
                </div>
              </div>
              
            </header>
        </>
        :
        <></>

        const footer =!!project&&!!scene?<>
        <footer>
            {project.scenes.map((elem)=>{
                return <div>
                    <button onClick={(el)=>{
                    //console.log(elem); 
                    //console.log(el); 
                    fetch(server+nameProject+'/'+elem.file).then(data=>data.json()).then(data=>{
                        setScene(data)
                    })
                }}>Кнопка</button>
                    <p>{elem.name}</p>
                    </div>
            })}
            <p>{scene.id}</p>
        </footer>
        </>
        :
        <></>
        const contener = !project&&!!scene?<>
            {header}
            <DJeemyComponentCesium file={project} scene={scene} server={server+nameProject}/>
            {footer}
        </>:
        <></>

        setSceneHTML(<>
            {header}
            <DJeemyComponentCesium file={project} scene={scene} server={server+nameProject}/>
            {footer}
        </>
            )
        //return contener
        }
        const resalt=!!project&&!!sceneHTML?sceneHTML:loder
        
    return  <>
            <div>
                {!!project&&!!sceneHTML?sceneHTML:loder}
            </div>
           
            {/* <DJeemyComponentCesium
                //file={project}
            /> */}
        </>
}