import React from 'react';

const renderHeadLine = (headline?:Record<string,any>) => {
  const _headline = headline || {}
  delete _headline.title;
  return Object.keys(_headline).map(key => {
    return React.createElement(key,{
      key,
      children:_headline?.[key]
    })
  })
}

export default renderHeadLine;