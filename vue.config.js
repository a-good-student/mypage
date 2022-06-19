const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
      // proxy:'http://localhost:5000'//第一种方式
      proxy:{
        '/word':{//匹配所有以api开头的请求
          target:'https://apiv3.shanbay.com/',
          //需要将加入请求的/api1去除，才能发送正确请求
          pathRewrite:{'^/word':''},
          ws:true,
          changeOrigin:true,
        },
        '/upload':{//匹配所有以api开头的请求
          target:'http://localhost:80/',
          //需要将加入请求的/api1去除，才能发送正确请求
          pathRewrite:{'^/upload':''},
          ws:true,
          changeOrigin:true,
        },
      }
    }
})
