import React from "react";
import { TitleType,PFCType } from "../typing";

const statistics = {
  chart:0,
  table:0
}


const renderTitle = (title?:TitleType,data?:any,record?:Record<string,any>,ergodic?:boolean,type?:PFCType|string) => {
  let _title:any = title;
  if(_title){
    if(_title instanceof Function){
      _title = _title(data,record)
    }
    if(ergodic && type){
      if(type.indexOf('chart') >= 0){
        statistics.chart += 1;
        _title = `图${statistics.chart}: ${_title}`
      }
      if(type.indexOf('table') >= 0 || type === 'descriptions'){
        statistics.table += 1;
        _title = `表${statistics.table}: ${_title}`
      }
    }
    return React.createElement('div',{
      className:'swords-ui-title',
      children:_title
    });
  };
  return null
}

export default renderTitle;