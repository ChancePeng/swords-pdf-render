
import React from "react";

const renderMark = (mark?:string|string[]) => {
  let _mark = mark;
  if(_mark){
    if(typeof _mark === 'string'){
      _mark = [_mark]
    }
    return (
      <div className="swords-ui-mark">
        {_mark.map((item,index) => <div key={index} style={{fontSize:12,color:'#CCC'}}>{item}</div> )}
      </div>
    )
  }
  return null;
}

export default renderMark;