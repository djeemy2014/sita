

export function saturation(color, scalar,result){
    const grey= (color.red+color.green+color.blue)/3
    //console.log(1,grey)
    //console.log(3,color)
    if (scalar>=-1&&scalar<=0){
      result.red=color.red+(color.red-grey)*scalar
      result.green =color.green+(color.green-grey)*scalar
      result.blue=color.blue+(color.blue-grey)*scalar
      result.alpha=color.alpha
      //console.log(2,result)
      return result
    }else{
      result.red=color.red+(1-color.red)*scalar
      result.green =color.green+(1-color.green)*scalar
      result.blue=color.blue+(1-color.blue)*scalar
      result.alpha=color.alpha
      //console.log(2,result)
      return result
    }
    
  }
export function gray(color,result){
    const grey= (color.red+color.green+color.blue)/3
    result.red=grey
    result.green =grey
    result.blue=grey
    result.alpha=color.alpha
  
    return result
  }
export function opasityMix(color, opasity,result){
    result.red=color.red
    result.green =color.green
    result.blue=color.blue
    result.alpha=color.alpha*opasity
  
    return result
  }