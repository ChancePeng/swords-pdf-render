const {createConfig} = require('@swords/tools');


const config = createConfig('library',{
  webpack:{
    externals:/(^react|^babel-runtime|^webpack|^antd|lodash|^@swords-pdf)/,
  },
});

module.exports = config;