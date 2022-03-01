import {ChartsModel, Descriptions, Table} from '@swords-pdf/react';
import type { PFC } from '@swords-pdf/react';
import { PFCType,Options,InitOptions } from './typing';


const defaultComponents:Record<PFCType,PFC<any>> = {
  table:Table,
  descriptions:Descriptions,
  'charts-model':ChartsModel,
}

const initOptions = (options?:Options):InitOptions => {
  if(options){
    const {
      pfcs={},
    } = options;
    return {
      components:{
        ...defaultComponents,
        ...pfcs,
      },
    }
  }
  return {}
}

export default initOptions;