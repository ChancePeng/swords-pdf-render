import type {DescType} from './typing';


const renderDesc = (desc?:DescType,data?:any,record?:Record<string,any>):string|string[]|null => {
  if(desc){
    if(typeof desc === 'string'){
      return desc;
    }else if(desc instanceof Array){
      return desc
    }else{
      const _desc = desc(data,record);
      return renderDesc(_desc);
    }
  }
  return null;
}

export default renderDesc;