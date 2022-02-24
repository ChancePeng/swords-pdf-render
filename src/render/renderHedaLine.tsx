import React from 'react';

const renderHeadLine = (headline?:Record<string,any>) => {
  return Object.keys(headline||{}).map(key => {
    return React.createElement(key,{
      key,
      children:headline?.[key]
    })
  })
}

export default renderHeadLine;