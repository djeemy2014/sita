

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
            //console.log(felem)
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
    arrClass=[],
    grenyarrClass=[],
    output=[]
    ){
    //console.log(0,i, arr)
    switch(arr.type){
        case("scena"):
            console.log(i,"scena")
            let classStart={
                id:arr.id,
                name:arr.name,
                type:"scen",
                defaultChecked:true
            };
            arrClass.push(classStart);
            
            let nextLvl = objToList2(
                arr.list, 
                i+1,
                arrClass,
                //output
                );
            console.log(nextLvl)
            output.push(...nextLvl);
            //return output;
            break;
        case("class"):
            console.log(i,'class')
            let classStart2={
                id:arr.id,
                name:arr.name,
                type:"class",
                defaultChecked:true
            };
            arrClass.push(classStart2);
            let nextLvl2 = objToList2(
                arr.list, 
                i+1,
                arrClass,
                //output
                );
            console.log(nextLvl2)
            output.push(...nextLvl2);
            return output;
            break;
            

        case("layer"):
            console.log(i,'layer')
            arr.class=arrClass.map(ev=>ev)
            console.log(arr)
            //output.push(arr)
            return arr
            break

        case(undefined):
            if (Array.isArray(arr)){
                console.log(i,'undefined')
                //console.log(arr)
                const statArrClass= arrClass
                let arry =[]
                arr.map((elem)=>{
                    let nextLvl = objToList2(
                        elem, 
                        i+1,
                        statArrClass,
                        //output
                        )
                   
                    if(Array.isArray(nextLvl)){
                        //return ...nextLvl
                        console.log(nextLvl)
                        arry.push(...nextLvl)
                    }else{
                        console.log(nextLvl)
                        arry.push(nextLvl)
                    }
                })
                //output.push(...arry)
                console.log(arry.filter(el=>el!==undefined))
                output.push(...arry.filter(el=>el!==undefined))
                //console.log(arry)
                
            }else{
                console.log('err')
            }
            
            return output
            //return output
            break

        default:
            console.log(i,'default')
            console.log(arr)
            console.log(arr.type)
            break

    }
    console.log(i,arr,output)
    return output
/*  
    if (Array.isArray(arr.list)){
        console.log(1,i,arr)
        let classStart={
            id:arr.id,
            name:arr.name,
            type:"class",
            defaultChecked:arr.defaultChecked
        }
        arrClass.push(classStart)
        console.log(1,i,arrClass)
        arr.list.forEach((elem)=>{
            console.log(3,i,elem)
            let nextLvl = objToList2(
                elem, 
                i+1,
                arrClass,
                output
                )
            
            if (elem.type==="layer"){
                console.log(4,elem)
                console.log(4,nextLvl)
                output.push(...nextLvl)
            }
        })
    }else{
        
            

        arr.class=arrClass
        console.log(2,arr)
        output.push(arr)
        return output
        
    } */
}
//testing(obj1.list)
//let a = listToObj(obj1.list)
// console.log(JSON.stringify( a, null, "\t"))
// console.log(0,objToList(a))
//console.log(JSON.stringify( listToObj(array), null, "\t"))