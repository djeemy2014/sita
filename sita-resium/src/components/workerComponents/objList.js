

export function listToObj (arr, i=0,lvl='classname',defaultClassChecked=true, output=[]){
     //console.log(arr)
    const listClassName = arr.map(ev=>ev[lvl]).filter((x,i,a)=>a.indexOf(x)===i)
    //console.log(arr)
    listClassName.forEach((className)=>{ 
        
        if (className===undefined||className===''){
            let listUnd=arr.filter(elem=>elem[lvl]===className)
            output.push(...listUnd)
        }else{
            let felem=arr.find((elem)=>elem[lvl]===className)
            
            let classIN={
                //"sub".repeat(i)+
                "id":felem.id,//исправить
                "type":"class",
                "name":className,
                "defaultChecked": felem.defaultClassChecked,
            }
            let classik = listToObj(arr.filter(elem=>elem[lvl]===className),i+1,"sub".repeat(i+1)+lvl)
            classIN.list = classik
            output.push(classIN)
        }
    })
    return output


}

export function objToList(arr,i=0,lvl='',name='',defaultChecked=true, output=[]){
    arr.forEach((elem)=>{
        if (elem.type.indexOf('class')===-1){
            if (i===0){
                output.push(elem)
            }else{
                elem["sub".repeat(i-1)+'classname']=name;
                elem['defaultClassChecked']=defaultChecked
                output.push(elem)
            }
            
        }else{
            //console.log(elem.name,elem.defaultChecked)
            let nextLvl = objToList(elem.list, i+1,"sub".repeat(i+1),elem.name, elem.defaultChecked)
            output.push(...nextLvl)
        }
    })
    return output
}

export function objToList2(
    arr,
    i=0,
    arrClass={},
    grenyarrClass=[],
    output=[]
    ){
    //console.log(0,i, arr)
    switch(arr.type){
        case("scena"):
            //console.log(i,"scena")
            const classStart={
                ...arr,
                id:arr.id,
                name:arr.name,
                type:"scen",
                defaultChecked:true
            };
            let nextLvl = objToList2(
                arr.list, 
                i+1,
                classStart,
                grenyarrClass
                );
            //console.log(nextLvl)
            output.push(...nextLvl);
            //return output;
            break;
        case("class"):
            //console.log(i,'class')
            const classStart2={
                id:arr.id,
                name:arr.name,
                type:"class",
                defaultChecked:arr.defaultChecked
            };
            const childArr2=grenyarrClass.map(ev=>ev)
            childArr2.push(arrClass)
            let nextLvl2 = objToList2(
                arr.list, 
                i+1,
                classStart2,
                childArr2
                );
            //console.log(nextLvl2)
            output.push(...nextLvl2);
            return output;
            break;
            

        case("layer"):
            //console.log(i,'layer')
            //console.log(grenyarrClass,classZ)
            //arr.class=arrClass.map(ev=>ev)

            //console.log(grenyarrClass,arrClass)
            const childArr=grenyarrClass.map(ev=>ev)
            childArr.push(arrClass)
            //console.log(childArr)
            arr.class=childArr
            //console.log(arr)
            //output.push(arr)
            return arr
            break

        case(undefined):
            if (Array.isArray(arr)){
                //console.log(i,'undefined')
                let arry =[]
                //console.log(i,arrClass)
                arr.map((elem)=>{
                    let nextLvl = objToList2(
                        elem, 
                        i+1,
                        arrClass,
                        grenyarrClass,
                        //classZ
                        //output
                        )
                   
                    if(Array.isArray(nextLvl)){
                        arry.push(...nextLvl)
                    }else{
                        arry.push(nextLvl)
                    }
                })
                output.push(...arry.filter(el=>el!==undefined))
                
            }else{
                console.log('err')
            }
            
            return output
            break

        default:
            console.log(i,'default')
            console.log(arr)
            console.log(arr.type)
            break

    }
    //console.log(i,arr,output)
    return output
}
export function listToObj2 (
    arr,
    i=0,
    max=0,
    aggr={},
    lvl='classname',
    defaultClassChecked=true,
    classlvl={}, 
    output=[]
    ){
    //console.log(arr)
    //if (arr.length!==undefined){

    
    arr.forEach(elem=>{
        //console.log(elem)
        if (max<elem.class.length){
            max=elem.class.length
        }
        //console.log(elem.class.length)
    })

    //console.log(max)
    if(max!==0){
    const maxLvl = arr.filter(elem=>elem.class.length===max)
    //console.log(maxLvl)
    const listClass=[... new Set(maxLvl.map(elem=>{
        return elem.class[max-1]
    }))]
    //console.log(listClass)
    const classList = listClass.map((classElem, index,arr)=>{
        //console.log(classElem)
        const filt =maxLvl.filter(ev=>ev.class[max-1]===classElem)
        classElem.class=filt[0].class.slice(0,max-1)
        classElem.list=filt.map(ev=>{
            //delete ev.class
            //console.log(ev)
            return ev
        })
        
        return classElem
    })
    classList.forEach((ev)=>{
        ev.list.forEach(ev=>{
            //ev.class=[]
            delete ev.class
            //потеря класса у исходника
        })
    })
    //console.log(classList)
    //arr.forEach(console.log)
    const nextLvl=arr.filter(elem=>elem.class!==undefined)
    
    nextLvl.push(...classList)
    //console.log(i,nextLvl)
    const end = listToObj2 (nextLvl,i+1)
    return end
    }
    else{
        //console.log(arr)
        //delete arr.class
        return arr
    }
    
}