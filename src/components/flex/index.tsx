import React from 'react';
import { PFC } from '@swords-pdf/react';
import { render } from '../../render'
import { ConfigType ,Options} from '../..';

interface FlexProps<T=string,D={}> {
  flexChildren?:ConfigType<T,D>[],
  options?:Options,
  dataSource?:any,
}


const Flex:PFC<FlexProps> = (props) => {
  const {flexChildren,options,dataSource} = props;
  if(flexChildren){
    return (
      <div className='swords-ui-flex' style={{display:'flex',justifyContent:'space-between'}}>
        {render(flexChildren,dataSource,options)}
      </div>
    )
  }
  return null;
}

export default Flex;

export {
  FlexProps
}