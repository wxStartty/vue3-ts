import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

// export function globalRegister(app: App): void {
//   registerElement(app)
// }

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}

// 通过 app.use() 注册组件
// export default {
//   install(app: App): void {
//     registerElement(app)
//   }
// }
