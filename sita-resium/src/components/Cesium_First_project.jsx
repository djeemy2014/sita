import React, {useEffect, useState} from "react";
import DJeemyComponentCesium from "./Cesium_Work";





export default function CesiumProgert(props){
    const server = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
    const nameProject = 'project_1'
    const projectURL = './project.json'
    const [project, setProject]=useState(null)
    const [scene, setScene]=useState(null)
    useEffect(()=>{
        async function projectFetchData(){
            setTimeout(()=>{
                fetch(server+nameProject+'/'+projectURL).then(data=>data.json()).then(data=>{
                    //console.log(data)
                    setProject(data);
                    setScene(data.scenes[0])
                })

            },5000)
            
        }
        projectFetchData()
            
        },[])
    useEffect(()=>{

    },[scene])
        const loder= <div className="loader">
            <div>
                <p>Загрузка...</p>
            </div>
        </div>
        const header=project?<>
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

        const footer =project?<>
        <footer>
            {project.scenes.map((elem)=>{
                return <p>{elem.name}</p>
            })}
        </footer>
        </>
        :
        <>
        </>

        const centerElement=<>
            {header}
            <DJeemyComponentCesium file={project} scene={scene} server={server+nameProject}/>
            {footer}
        </>
        
        const resalt=project?centerElement:loder
        
    return  <>
            {resalt}
            {/* <DJeemyComponentCesium
                //file={project}
            /> */}
        </>
}