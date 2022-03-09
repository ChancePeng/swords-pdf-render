import { get, assign, merge } from 'lodash';
import { NameType } from './typing'

const defineData = (name?: string | string[] | NameType[], data?:Record<string,any>) => {
  if(name){
    if(typeof name === 'string'){
      return get(data,name);
    }else{
      let _dataSource:any = null;
      name.forEach((_name:any) => {
        if(typeof _name === 'string'){
          const dataWithName = get(data,_name);
          if(dataWithName){
            // 拿到的dataSource为数组
            if(dataWithName instanceof Array){
              if(!_dataSource){
                _dataSource = assign([],dataWithName)
              }else{
                _dataSource = _dataSource.concat(dataWithName)
              }
            }else if(typeof dataWithName === 'string' || typeof dataWithName === 'number'){
              _dataSource?_dataSource.push(dataWithName):_dataSource=[dataWithName]
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
      return _dataSource;
    }
  }
  return null;
}


export default defineData;