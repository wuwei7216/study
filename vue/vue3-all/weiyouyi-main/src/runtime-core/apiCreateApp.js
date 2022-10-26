import { createVNode } from "./vnode"

let uid = 0
export function createAppAPI(render) {
  return function createApp(rootComponent) {
    // 上下文对象
    const context = {
      provides:{},
      components:{},
      directives:{},
      plugins:new Set()
    }
    const app = {
      _uid:uid++,
      _context:context,
      _component: rootComponent,
      mount(rootContainer) {
        const vnode = createVNode(rootComponent)
        vnode.appContext = context //全局的context
        render(vnode, rootContainer)
      },
      // app.use
      use(plugin,options){
        if(!context.plugins.has(plugin)){
          context.plugins.add(plugin)
          //执行插件的install方法，传入app
          plugin.install(app,...options)
        }
      },
      // app.provide
      provide(key,val){
        // 简单的数据存储在对象里
        context.provides[key] = val
      },
      component(name,component){
        // 注册的组件存储在context上
        context.components[name] = component
      }
      // directive什么的也是类似
    }

    return app
  }
}
