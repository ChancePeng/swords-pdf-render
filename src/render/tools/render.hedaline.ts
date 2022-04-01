import React from 'react';
import toChineseNumeral from '../../utils/toChineseNumeral';

const statistics:Record<string,any> = {
  h1:0,
  h2:0,
  h3:0,
}

const renderHeadLine = (headline?:Record<string,any>,bool?:boolean) => {
  return Object.keys(headline||{}).map(key => {
    let text = headline?.[key] || '';
    if(bool){
      if(key==='h1'){
        statistics.h1 += 1;
        text = `${toChineseNumeral(statistics.h1)}、${text}`;
        statistics.h2 = 0;
        statistics.h3 = 0;
      }else if(key==='h2'){
        statistics.h2 += 1;
        statistics.h3 = 0;
        text = `${statistics.h1}.${statistics.h2} ${text}`;
      }else if(key === 'h3'){
        statistics.h3 += 1;
        text = `${statistics.h3}. ${text}`
      }
    }

    return React.createElement(key,{
      key,
      children:text
    })
  })
}

export default renderHeadLine;