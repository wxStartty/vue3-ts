36day
1. npm install coderwhy -g // 实现自动路由映射，不需要手动写

37day
问题
1.进入到某个路由，然后点击浏览器刷新按钮，not found
  原因：在main.ts文件
    app.use(router) => install() => 获取到当前的 path => router.routes => notFound
    => setupStore() => 注册动态路由routes
    路由守卫(回调) => to() (notFound组件)

注意事项
  1.props中属性的default选项需要写成箭头函数形式 () => {}

38day
  1.解决37day问题1
  2.解决刷新显示默认页问题
  3.解决 重定向 /main 定位到 firstMenu的问题
  2.完成面包屑
