module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: "http://192.168.113.117:8080", // 访问数据的计算机域名
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理,
        pathRewrite: {'^/api': '/'}

      }
    }
  }
};
