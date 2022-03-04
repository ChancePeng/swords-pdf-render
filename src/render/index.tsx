import {get,assign, merge} from 'lodash';
import React from 'react';
import initOptions from './init.options';
import renderHeadLine from './renderHedaLine';
import renderDesc from './render.desc';
import renderMark from './render.mark';

import type {Options,ConfigType,Complier} from './typing';

const render = (config:ConfigType[],data?:Record<string,any>,options?:Options) => {
  // 初始化参数
  const {
    components={},
  } = initOptions(options);

  const elements:(JSX.Element| null)[] = config.map((item,index) => {
    // 解构租价配置信息
    const {
      type,
      name,
      headline,
      pageBreak,
      className,
      beforeDataRender,
      style,
      mark,
      ...props
    } = item;
    const {title,desc,..._headline} = headline || {}
    let _className = className;
    // 如果存在组件类型字段
    if(type){
      // 获取组件
      const Component = components[type];
      // 存在name字段，将从data中获取数据
      if(name){
        if(typeof name === 'string'){
          props.dataSource = get(data,name);
        }else{
          let _dataSource:any = null;
          name.forEach((_name:any) => {
            if(typeof _name === 'string'){
              const dataWithName = get(data,_name);
              if(dataWithName){
                if(dataWithName instanceof Array){
                  if(!_dataSource){
                    _dataSource = assign([],dataWithName)
                  }else{
                    _dataSource = _dataSource.concat(dataWithName)
                  }
                }else{
                  if(!_dataSource){
                    _dataSource = merge({},dataWithName)
                  }else{
                    _dataSource = merge(_dataSource,dataWithName)
                  }
                }
              }
            }else{
              const {name:groupName,key:groupKey} = _name;
              const dataWithName = get(data,groupName);
              if(dataWithName){
                if(!_dataSource){
                  _dataSource = {}
                  _dataSource[groupKey] = dataWithName;
                }else{
                  _dataSource[groupKey] = dataWithName;
                }
              }
            }
          })
          props.dataSource = _dataSource;
        }
        if(beforeDataRender){
          props.dataSource = beforeDataRender(props.dataSource,data)
        }
      }
      if(pageBreak){
        _className = _className ? _className.concat(' swords-pdf-page-break') : 'swords-pdf-page-break'
      }
      return (
        <div key={index} className={_className} style={style}>
          {renderHeadLine(_headline)}
          {title && <div className='pdf-title'>{title}</div>}
          {renderDesc(desc,props.dataSource,data)}
          <Component {...props} options={options} />
          {mark && renderMark(mark)}
        </div>
      )
    }
    return null;
  })
  return elements;
}

const createComplier = (config:ConfigType[],data?:Record<string,any>,options?:Options):Complier => {
  const complier:any = {};
  complier.run = () => render(config,data,options);
  return complier;
}

export {
  createComplier,
  render,
}