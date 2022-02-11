import {ChartsModel, Descriptions, Table} from '@swords-pdf/react';
import type { PFC } from '@swords-pdf/react';
import { PFCType,Options,InitOptions } from './typing';


const defaultComponents:Record<PFCType,PFC<any>> = {
  table:Table,
  descriptions:Descriptions,
  'charts-modal':ChartsModel,
}

const initOptions = (options?:Options):InitOptions => {
  if(options){
    const {
      pfcs={},
      pagination=true,
      __server,
    } = options;
    return {
      components:{
        ...defaultComponents,
        ...pfcs,
      },
      pagination,
      __server,
    }
  }
  return {}
}

export default initOptions;