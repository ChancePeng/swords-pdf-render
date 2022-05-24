import React from 'react';
import defineData from './define.data';
import initOptions from './init.options';
import {renderDesc,renderHeadLine,renderMark,renderTitle} from './tools';
import { initStatistics } from './tools/render.hedaline';

import type {Options,ConfigType,Complier} from './typing';

const render = (config:ConfigType[],data?:Record<string,any>,options?:Options) => {
  // 初始化参数
  const {
    components={},
    ergodic,
    __init__
  } = initOptions(options);

  __init__ && initStatistics();

  const elements:(JSX.Element| null)[] = config.map((item,index) => {
    // 解构组件配置信息
    const {
      type,
      name,
      headline,
      pageBreak,
      className,
      style,
      emptyRendered=true,
      beforeDataRender,
      ...props
    } = item;
    let _className = className;
    // 如果存在组件类型字段
    if(type){
      // 获取组件
      const Component = components[type];
      // 存在name字段，将从data中获取数据
      const _define_data = defineData(name,data);
      _define_data && (props.dataSource = _define_data);
      if(beforeDataRender){
        props.dataSource = beforeDataRender(_define_data ? _define_data : props.dataSource ,data)
      }
      if(!emptyRendered && !props?.dataSource){
        console.log('type',type,headline)
        return null;
      }
      if(pageBreak){
        _className = _className ? _className.concat(' swords-ui-page-break') : 'swords-ui-page-break'
      }
      let headlineAct:any = headline;
      if(headline instanceof Function){
        headlineAct = headline(defineData,data)
      }
      const {title,desc,mark,..._headline} = headlineAct || {}
      return (
        <div key={index} className={_className} style={style}>
          {renderHeadLine(_headline,ergodic?.headline)}
          {renderTitle(title,_define_data,data,ergodic?.title,type)}
          {renderDesc(desc,_define_data,data)}
          <Component {...props} options={options} $data={data} $name={name} />
          {renderMark(mark)}
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