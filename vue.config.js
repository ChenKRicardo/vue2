module.exports = {
    lintOnSave:false,//关闭eslintre语法检查
    //开启代理服务器（方式一）
    // devServer: {
    //     proxy: 'http://localhost:5000'
    //   }
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            pathRewrite:{'^/api':''},
            ws: true,//用于支持webscoket
            changeOrigin: true//
          },
          '/foo': {
            target: 'http://localhost:5001',
            pathRewrite:{'^/foo':''}
          }
        }
      }
}