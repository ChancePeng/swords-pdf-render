import {get} from 'lodash';
import React from 'react';
import initOptions from './init.options';
import renderHeadLine from './renderHedaLine';

import type {Options,ConfigType} from './typing';

export const render = (config:ConfigType[],data?:Record<string,any>,options?:Options) => {
  const {
    components={},
    pagination,
    __server,
  } = initOptions(options);

  let domHeight:number = 0;

  const result =  config.map((item,index) => {
    const {
      type,
      name,
      headline,
      newPage,
      className,
      style={},
      beforeDataRender,
      ...props
    } = item;
    const {title} = headline || {}
    if(type){
      const Component = components[type];
      let _style = {
        ...style,
      }
      if(name){
        props.dataSource = get(data,name);
        if(beforeDataRender){
          props.dataSource = beforeDataRender(props.dataSource,data)
        }
      }
      if(pagination){
        const {height} = pagination;
        let _height = 0;
        const componentHeight = Component.height;
        if(componentHeight){
          if(typeof componentHeight=== 'number'){
            _height = componentHeight;
          }else{
            _height = componentHeight(props,options)
          }
        }
        const _index = Math.ceil(domHeight/height || 0);
        if(newPage && __server===false){
          _style.marginTop = height * _index - domHeight;
        }
        domHeight += _height;
      }
      return (
        <div key={index} className={className} style={_style}>
          {renderHeadLine(headline)}
          {title && <div>{title}</div>}
          <Component {...props} options={options} />
        </div>
      )
    }
    return null;
  })

  return {
    run:()=>result
  }
}