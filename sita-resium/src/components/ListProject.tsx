import React,{useRef, useEffect, createRef, useState } from "react";
import {Link } from "react-router-dom";
//type HTTPS = 'https'|'htts' ;
//type WEBK = 'кавказ.рф'|'кавк.рф';
//type COOP = `${HTTPS}//${WEBK}/`
interface TypeListProjektProps {
    url:string;
  }
interface TypeProject{
    id:number;
    uid:"001";
    name:string;
    shortName:string;
    "customer":string,
    "customerWebsite":"https://кавказ.рф/"
    "сontractor":"ООО Градостроительный Институт \"МИРПРОЕКТ\"",
    "сontractorWebsite":"https://mirproekt.ru/",
    "description": "ДОГОВОР ПОДРЯДА № Д-ДЗИО-23-002-9131 на разработку проекта планировки территории, проекта межевания территории, плана обустройства и соответствующего материально-технического оснащения, перспективного плана развития особой экономической зоны туристско-рекреационного типа на территории муниципального образования«Дербентский район» Республики Дагестан и прилегающей к ней территории",
    "path":"./project_1",
    "declarationFile":"./project.json",
    "point":[48.20366195893176, 42.19013569656324],
    "box":[
        [48.18143857440990274, 42.16451156080417206],
        [48.22047180015461265, 42.16451156080417206],
        [48.22047180015461265, 42.21877372315933030],
        [48.18143857440990274, 42.21877372315933030]
    ]

}
export default function ListProjekt(props:TypeListProjektProps){
    const urlProject = props.url
    const [project, setProject] = useState<Array<TypeProject>>([])
    const [contrnt, setContent] = useState<string>('')
    useEffect(()=>{
        fetch(props.url)
        .then((file)=>{return file.json()})
        .then((json)=>{setProject(json);console.log(project); return json })
        },[props.url])
    // fetch(urlProject)
    //     .then((file)=>{return file.json()})
    //     .then((json)=>{setProject(json);console.log(project); return json })
    //console.log(project)
    //console.log(project)
    // useEffect(()=>{
    //     setContent(JSON.stringify(project))
    //     console.log(JSON.stringify(project))
    // },[])
    return (
        <div 
        className="perentStartList"
        >
        <div className="startList">
            <h3>Список проектов</h3>
            <div>
                <table className="table-project">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>UID</th>
                            <th>Короткое название</th>
                            <th>Сайт Заказчика</th>
                            <th>Ссылк на проект</th>
                        </tr>
                    </thead>
                    <tbody>{
                    project.map((elem)=>{
                        let url =`../testCesium?uid=${elem.uid}`
                        return (
                                <tr key={elem.id}>
                                    <th>{elem.id}</th>
                                    <th>{elem.uid}</th>
                                    <th><Link to={url}>{elem.shortName}</Link></th>
                                    <th>{elem.customerWebsite}</th>
                                    <th></th>
                                </tr>)
                    })
                    }
                     </tbody>
                </table>
            </div>
        </div>
        </div>
    )

}