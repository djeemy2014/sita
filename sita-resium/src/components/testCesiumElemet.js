
export default async function testCesiumElemet(ref,i=0){
    return new Promise((resolve, reject)=>{
        //console.log()
        if (ref.current?.cesiumElement) {
            resolve (ref)
            } else if (i<1000){
                i++;
                setTimeout(()=>{
                    testCesiumElemet(ref, i).then(resolve).catch(reject)
                },10)
            }else {
                //reject (new Error(`Waiting more than ${1000*10/1000} seconds.${ref.current}`))
                console.log(ref)
            }
    })

}
