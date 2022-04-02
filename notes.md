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
  4.完成面包屑
  5.父组件定义响应式对象(ref)formData通过v-model传给子组件，而不通过props的方式传给子组件，
    通过v-model传给子组件，则需要在子组件的props使用modelValue来接收（组件的双向绑定）
  6.el-table-column 可传插槽
  7.通过插槽来定义el-table每列的单元格 (可见user.vue/table.vue)

39day
  1.package.json文件不能正确的显示包的版本，package.lock文件中有显示具体安装包的版本号，因此该文件也很重要，
    可防止其他人在安装node_modules时，在运行不会报错
  2.在main.ts中定义全局属性通过 app.config.globalProperties
  3.使用时间格式化工具dayjs可格式化utc格式
  4.使用watch监听props时，需要写成回调形式 watch(() => props.modelValue, (newValue) => {})

  问题：表单数据由user -> page-search -> form 之间的数据实现同步更新解决方法
  重置功能page-search from表单的值没有清空，暂时使用watch监听, 可存在超过调用执行栈的问题，这种方式不好（不建议使用）
  解决一：利用深浅拷贝的特性，浅拷贝会影响数据最外层，影响不到内层，所以在page-search组件中更改每个属性值来达到form组件中的数据点击“重置”时进行同步清空的效果 （可用）
  解决二：
    1.在page-search公共组件通过v-model的方式传入fromData数据给 wx-form公共组件，并在page-search的重置按钮事件中直接使用
    formData.value = formOriginData即可，
    2.然后在wx-form公共组件中通过modelValue属性把每个field字段值绑定到对应el-xx 组件上，再绑定v-model发出的事件(update:modelValue)

40day
  1.跨组件插槽的应用(page-content中对otherPropSlot循环，根据content.config.ts中对应列中slotName来动态插入插槽)
  <template
    v-for="item in otherPropSlots"
    :key="item.prop"
    #[item.slotName]="scope"
  >
    <template v-if="item.slotName">
      <slot :name="item.slotName" :row="scope.row"></slot>
    </template>
  </template>

41day
  1.typeScript语法 !.(非空断言)
  2.在部门以及角色枚举获取过程中，直接通过store(store.state.entireDepartment)的方式拿到的state不是响应式的，又因为actions是异步的，所以导致页面拿不到数据
  解决方法：通过computed来使数据变成响应式

42day
  1.在store子模块中调用根root的action：dispatch('getInitialDataAction', null, { root: true })
  2.问题：在编辑函数的回调函数(editCallBack)中使用ref获取ElTree的实例elTreeRef，通过实例elTreeRef的方法调用setCheckedKeys方法发现，该实例是是undefined(elTreeRef.value为undefined)
  解决：通过使用nextTick来使对应实例加载完再进行回调函数的执行
  3.前端可视化的工具
    常见的框架：echarts、g2、d3、vis、hightChart
    g2封装的框架：bizcharts(react) viser(vue)
    地理可视化：g2 L7 高德的Loca 菜鸟的鸟图
    3D可视化：three.js
  4.setup先于template模板执行

43day
  1.gsap数字动画库
  2.在script标签上使用setup 更新vue到3.2.4 npm install vue@3.2.4  更新@vue/compiler-sfc到3.2.4
  3.在script标签上使用setup方式定义props
    导入两个函数defineProps、withDefaults
    withDefaults(defineProps<{
      width?: string
      height? string
    }>(), {// 默认值
      width: '100%',
      height: 360px
    })
  4.暴露函数 在vue中导入 defineExpose 或者 defineEmits
