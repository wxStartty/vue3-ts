import { createApp } from 'vue'
// 1 import { registerApp } from './global'
import { globalRegister } from './global'
// import wxRequest from './service'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)
// 1 registerApp(app)

app.use(globalRegister)
app.use(router)
app.use(store)
setupStore()
app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// wxRequest
//   .get<DataType>({
//     url: '/home/multidata'
//     // interceptors: {
//     //   requestInterceptor: (config) => {
//     //     console.log('单独请求的拦截config')
//     //     return config
//     //   },
//     //   responseInterceptor: (res) => {
//     //     console.log('单独响应的拦截response')
//     //     return res
//     //   }
//     // }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
