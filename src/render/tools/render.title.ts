import React from "react";
import { TitleType } from "../typing";


const renderTitle = (title?:TitleType,data?:any,record?:Record<string,any>) => {
  let _title:any = title;
  if(_title){
    if(_title instanceof Function){
      _title = _title(data,record)
    }
    return React.createElement('div',{
      className:'swords-ui-title',
      children:_title
    });
  };
  return null
}

export default renderTitle;