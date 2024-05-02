import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import TVSComponentCesium from "./Cesium_Work";





export default function CesiumProgert(props){
    const server = 'http://10.0.5.190:18077/cesium_test/geodata/testModel/geojson/'
    const [searchParams] = useSearchParams();
    const requestObject = Object.fromEntries([...searchParams])
    const nameProject = requestObject.uid??'project_1'
    const projectURL = './project.json'
    const [project, setProject]=useState(null)
    const [scene, setScene]=useState(null)
    const [sceneHTML, setSceneHTML]=useState(null)

    const loder= <div className="loader">
            <div>
                <p>Загрузка...</p>
            </div>
        </div>
    function setSceneFetch(scenPath) {
        fetch(server+nameProject+'/'+scenPath).then(data=>data.json()).then(data=>{
            //console.log(data)
            data.classifiers.forEach((elem)=>{
                
                fetch(server+(elem.path??('classifiers'+'/'+elem.prototype+'.json')))
                    .then(data=>data.json())
                    //.catch(console.log('err',elem))
                    .then((data)=>{elem.description=data})
                //console.log(server+(elem.path??('classifiers'+'/'+elem.prototype+'.json')))
            })
            //console.log(data)
            setScene(data)
        })
        
    }
    useEffect(()=>{
        async function projectFetchData(){
            // бред вынести функцию.
           // setTimeout(()=>{
                fetch(server+nameProject+'/'+projectURL).then(data=>data.json()).then(data=>{
                    //console.log(data)
                    setProject(data);
                    setSceneFetch(data.scenes[0].file)
                    // fetch(server+nameProject+'/'+data.scenes[0].file).then(data=>data.json()).then(data=>{
                    //     console.log(data)
                    //     setScene(data)
                    // })
                    
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
            <div 
                className="footer-time-line"
            >
            </div>
            <div 
                className="footer-switch"
                onClick={(elem)=>{console.log(elem)}}
            ></div>
                {/* <div className="timeLine" style={{width:'600px', height: '200px',backgroundColor:'red',zIndex:'20'}}>
                    <h3>Привет</h3>
                </div> */}
                <div className="footer-list-scene">
                {project.scenes.map((elem)=>{
                    return <div className="scene-button">
                        <div className="scene-discription">
                            {/* <p>{JSON.stringify(elem)}</p> */}
                            <p>{elem.name}</p>
                            {/*<p>{elem.file}</p>
                             <p>{server+nameProject+'/'+elem.preview}</p> */}
                            <img src={server+nameProject+'/'+elem.preview} alt="ой!" />
                        </div>
                        <button onClick={(el)=>{
                        //console.log(elem); 
                        //console.log(el); 
                        setSceneFetch(elem.file)
                        // fetch(server+nameProject+'/'+elem.file).then(data=>data.json()).then(data=>{
                        //     setScene(data)
                        // })
                        }}
                        onMouseOver={(el)=>{
                            //console.log(JSON.stringify(elem))
                        }}
                    ></button>
                        <div className="scene-button">
                            <p>{elem.id}</p>
                        </div> 
                        </div>
                })}
                </div>
        </footer>
        </>
        :
        <></>
        const contener = !project&&!!scene?<>
            {header}
            {/* <DJeemyComponentCesium file={project} scene={scene} server={server+nameProject}/> */}
            {footer}
        </>:
        <></>

        setSceneHTML(<>
            {header}
            <TVSComponentCesium file={project} scene={scene} server={server+nameProject} project={project}/>
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
        </>
}