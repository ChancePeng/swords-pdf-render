import React from 'react';
import defineData from './define.data';
import initOptions from './init.options';
import {renderDesc,renderHeadLine,renderMark,renderTitle} from './tools';

import type {Options,ConfigType,Complier} from './typing';

const render = (config:ConfigType[],data?:Record<string,any>,options?:Options) => {
  // 初始化参数
  const {
    components={},
    ergodicTitle
  } = initOptions(options);

  const elements:(JSX.Element| null)[] = config.map((item,index) => {
    // 解构租价配置信息
    const {
      type,
      name,
      headline,
      pageBreak,
      className,
      style,
      beforeDataRender,
      ...props
    } = item;
    const {title,desc,mark,..._headline} = headline || {}
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
      if(pageBreak){
        _className = _className ? _className.concat(' swords-ui-page-break') : 'swords-ui-page-break'
      }
      return (
        <div key={index} className={_className} style={style}>
          {renderHeadLine(_headline,ergodicTitle)}
          {renderTitle(title,_define_data,data)}
          {renderDesc(desc,_define_data,data)}
          <Component {...props} options={options} $data={data} />
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