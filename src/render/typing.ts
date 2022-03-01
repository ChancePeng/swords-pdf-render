import type {DefaultProps,PFC} from '@swords-pdf/react';
import React from 'react';


export type PFCType = 'table' | 'descriptions'| 'charts-model';


export interface Pagination {
  width?:number,
  height?:number,
}

export interface Options {
  pfcs?:Record<string,PFC<any>>,
}

export interface InitOptions extends Record<string,any> {
  components?:Record<string,PFC<any>>
}

export interface HeadLine {
  h1?:string,
  h2?:string,
  h3?:string,
  title?:string | React.ElementType | JSX.Element | React.ReactElement,
}

export interface NameType {
  key:string,
  name:string,
}

export type ConfigType<T=string,D={}> =  DefaultProps<D> & {
  /**
   * 映射在data数据的key
   * 此组件将通过name值从data中获取值并放入dataSource中
   */
  name?:string | string[] | NameType[],
  /**
   * 组件类型
   * 除库中存在的组件，用户可通过options中的pfcs属性对组件进行扩展
   */
  type?:PFCType | T,
  /**
   * 标题信息
   * h1,h2,h3
   * title表头信息
   */
  headline?:HeadLine,
  /**
   * 此组件是否为新的一页开头
   */
  pageBreak?:boolean,
  /**
   * CSS,Style
   * 此样式并非绑定在组件本身，而在组件外层的div壳
   */
  style?:React.CSSProperties,
  /**
   * className
   * 此类名并非绑定在组件本身，而在组件外层的div壳
   */
  className?:string,
  /**
   * hook事件：在组件渲染之前，对数据处理的回调函数
   */
  beforeDataRender?:(data?:any,record?:Record<string,any>)=>any,
}
