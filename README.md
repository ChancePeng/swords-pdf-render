
# @swords-pdf/render
> 配合@swords-pdf/react库使用

# 快速使用
`yarn add @swords-pdf/render`或`npm i @swords-pdf`
> 在您使用此库时，建议导入`@swords-pdf/react`UI组件库

# 场景
## 报告导出  
> 因传统的模板样式生成报告(pdf)的方式，存在不美观，开发节奏缓慢等一系列缺点，我们放弃此种方式，而利用puppeteer(无头浏览器)可对网页生成pdf的特性，我们将pdf以网页的方式呈现，而面对页面与后端数据的交互，决定抽离出一个库render，通过简单的配置，即可生成美观，动态的html结构

# 扩展性

当@swords-pdf/react中的组件无法满足现有的开发需求，render方法提供的配置参数中的pfcs可帮您扩展相应的组件

```tsx
import Component from 'component';
import {render} from '@swords-pdf/render';

const config = [];
const data = {};

const Page = () => {
  return (
    <div>
    {
      render(config,data,{
        pfcs:{
          /**
           * 注意：
           * 此处的Component必须遵循接口PFC规范
           * import type {PFC} from '@swords-pdf/react'
           * 
          */
          component:Component
        }
      }).run()
    }
    </div>
  )
}
```

# 图表能力
> `@swords-pdf/react`的`<ChartsModel />`组件结合`@ant-design/charts`做了进一步的封装，方便对接钩端数据

## 使用：
`import {ChartsModel} from '@swords-pdf/react`
### 使用组件：
```tsx
import {ChartsModel} from '@swords-pdf/react';

const Page = () => {
  return <ChartsModel modalType="line" config={{}} dataSource={[]} >
}

```
### 交由render库的配置方式
```tsx
const config = [
  {
    type:'charts-modal',
    config:{},
    // name字段会从data中获取相应key为name的value值注入组件dataSource中，当然，如果此处为静态数据，可直接配置dataSource为相应数据即可，无需配置name,name和dataSource同时存在时，dataSource将被覆盖
    name:'',
  }
];

const {run} = render(config)
```

# 关于构建
使用了@swords/tools构建整个render为lib库，react库类似，详情查看wepack.config配置

# 关于puppeteer那些坑
放弃了常规的pdf生成方式，相应的puppeteer存在很对坑等着大家一起入
## 后端数据还未完全加载就生成pdf?
在page.goto时配置waitUnitil为networdidle2
```ts
const page = await browser.newPage();
await page.goto('http://www.baidu.com',{
  waitUnitl:'networdidle2'
})
```
## 服务器运行报错
> 确定您都导入了官方介绍的依赖依旧报错  
检查puppeteer携带的chrome浏览器可执行文件是否含有w权限，没有建议chmod

## 关于puppeteer作为node服务打包部署
> 需要打包所有的出node资源之外的所有依赖，通过webpack打包即可


### puppeteer如何打包
> 建议将项目根目录的node_modules/puppeteer下的无头浏览器文件夹放入公共目录,并配置puppeteer的启动路劲指向该路径,webpack打包将公共目录打包进入即可

```ts
const browser = await puppeteer.launch({
  // public/chorme/chrome即为屋头浏览器执行文件地址，当然此处的可执行文件必须具有可执行权限
  executablePath:path.resolve(process.cwd(),'./public/chorme/chrome')
})
```






