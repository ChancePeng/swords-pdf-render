import type {DefaultProps,DescriptionsColumnType,PFC, TableColumnColumnType} from '@swords-pdf/react';
import React from 'react';
import { FlexProps } from '../components/flex';


export type PFCType = 'table' | 'descriptions'| 'charts-model' | 'flex' | 'table-column';


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


export type DescType = string | string[] | ((data?:any,record?:Record<string,any>)=>string | string[])
export interface HeadLine {
  /**
   * 一级标题
   */
  h1?:string,
  /**
   * 二级标题
   */
  h2?:string,
  /**
   * 三级标题
   */
  h3?:string,
  /**
   * 组件头信息
   */
  title?:string | React.ElementType | JSX.Element | React.ReactElement,
  /**
   * 描述信息
   */
  desc?:DescType
}

export interface NameType {
  /**
   * 分组数据的key
   */
  key:string,
  /**
   * 将要从data中取值的key
   */
  name:string,
}

export interface Complier {
  run:()=>JSX.Element
}

export type ConfigType<T=string,D={}> = DefaultProps<D> & FlexProps<T,D> & {
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
   * mark
   * 角标描述
   */
  mark?:string|string[],
  /**
   * hook事件：在组件渲染之前，对数据处理的回调函数
   */
  beforeDataRender?:(data?:any,record?:Record<string,any>)=>any,
}
