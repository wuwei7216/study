
import { createAppAPI } from './apiCreateApp'
import {setCurrentInstance} from './component'
import {queueJob} from './scheduler'
import {isSameVNodeType} from './vnode'
import {effect} from '../reactivity'
import {ShapeFlags} from '../shared'
export function createRenderer(options) {

  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId,
  } = options
  // 核心调度逻辑
  // n1和n2是新老虚拟dom元素
  function patch(n1, n2, container) {

    if(n1==n2){
      return 
    }
    if(n1 && isSameVNodeType(n1,n2)){
      //n1和n2类型不同 直接销毁n1 挂载n2
      unmount(n1)
      n1 = null
    }
    const { type, shapeFlag } = n2
    switch (type) {
      case Text:
        processText(n1, n2, container)
        break
      // 还有注释，fragment之类的可以处理，这里忽略
      default:
        // 通过shapeFlag判断类型
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          processComponent(n1, n2, container)
        }
    }
  }

  //处理组件
  function processComponent(n1, n2, container) {
    // 老规矩，么有n1就是mount
    if (!n1) {
      // 初始化 component
      mountComponent(n2, container)
    } else {
      updateComponent(n1, n2, container)
    }
  }
  // 处理html元素
  function processElement(n1, n2, container, anchor) {
    if (!n1) {
      mountElement(n2, container, anchor)
    } else {
      // todo
      updateElement(n1, n2, container, anchor)
    }
  }
  // 处理文本元素
  function processText(n1, n2, container) {
    if (n1 === null) {
      // 新增文本
      n2.el = hostCreateText(n2.children)
      hostInsert(n2.el, container)
    } else {
      if (n1.children !== n2.children) {
        n2.el = n1.el
        // 文本不同，更新文本
        hostSetText(n2.el, n2.children)
      }
    }
  }
  function shouldComponentUpdate(prevVnode,nextVnode){
    const prev = prevVnode.props
    const next = nextVnode.props
    if(prev===next){
      return false
    }
    return true
    // @todo 对比props 没有变化就不需要更新，遍历一波
    // https://github.com/vuejs/vue-next/blob/a31303f835f47c7aa5932267342a2cc2b21db948/packages/runtime-core/src/componentRenderUtils.ts#L321
  }
  // 更新组件
  function updateComponent(n1,n2,container) { 
    n2.component = n1.component
    if(shouldComponentUpdate(n1,n2)){
      // 需要更新
      instance.next = n2
      // setupRenderEffect里面注册的update方法
      // next里面调用patch
      instance.update() // 注册的更新函数
    }else{
      // 不需要更新 简单覆盖一下属性
      n2.component = n1.component
      instance.vnode = n2
    }
  }
  // 更新html元素
  function updateElement(n1, n2, container) {
    const oldProps = n1?.props || {}
    const newProps = n2.props || {}

    n2.el = n1.el
    // @todo 根据patchProps判断class style等属性
    patchProps(el, oldProps, newProps)

    // 对比 children
    patchChildren(n1, n2, el, container)

  }

  function patchProps(el, oldProps, newProps) {
    // 遍历newprops，覆盖old props
    // @todo 属性兼容性问题
    for (const key in newProps) {
      const prev = oldProps[key]
      const next = newProps[key]
      if (prev !== next) {
        hostPatchProp(el, key, prev, next)
      }
    }
    // 遍历oldprops，如果new props中没有就删除
    for (const key in oldProps) {
      const prev = oldProps[key]
      if (!prev in newProps) {
        hostPatchProp(el, key, prev, null)
      }
    }
  }
  //挂载组件
  function mountComponent(vnode, container) {
    // 创建组件实例，其实就是个对象，包含组件的各种属性
    const instance = vnode.component = {
      vnode,
      type:vnode.type,
      props:vnode.props,
      setupState:{}, //响应式状态
      slots:{},
      ctx:{},
      emit:()=>{}
    }
    // 启动setup函数中的各种响应式数据
    setupComponent(instance)

    setupRenderEffect(instance, container)
  }
  
  //组件预渲染
  function setupComponent(instance) {
    const { props, children } = instance.vnode
    // 其实还需要处理slot，根据flags 这里忽略一下下@todo
    // initSlots(instance, children) 
    // 只考虑了composition语法的setup函数
    const component = instance.type
    // script setup写的函数都在setup内部
    const { setup } = component
    // 设置正在处理的componeng实例 
    setCurrentInstance(instance)

    // 不用script setup，setup中的参数就是来源这里
    // export default {
    //   setup(props,{attr,slots,emit})
    // }
    // 所以setup函数内部就可以通过getCurrrntInstance获取当前组件的实例
    const setupContext = {
      attrs:instance.attrs,
      slots:instance.slots,
      emit:instance.emit // @todo 还没实现emit
    }
    const setupResult = setup ? setup(instance.props, setupContext) :null
    setCurrentInstance(null)
    instance.ctx = {
      ...instance.props,
      ...instance.setupState,
    }
    // setup函数返回的数据，需要传递给template使用
    // 如果返回的是函数，就是render函数处理，不需要template了
    if (typeof setupResult === "function") {
      instance.render = setupResult
    }else{
      instance.setupState = setupResult
    }
    // 如果没有render并且又template，需要把template处理成render函数
    // render函数的目的就是返回虚拟dom，compiler就是compiler模块需要实现的
    if (!component.render && component.template) {
      let { template } = component
      if (template[0] === '#') {
        const el = document.querySelector(template)
        template = el ? el.innerHTML : ''
      }
      component.render = new Function('ctx', compile(template))
    }
    
   }

  //设置setup函数
  function setupRenderEffect(instance,container) { 
    const {vnode} = instance
    const { type: Component } = vnode;

    instance.update = effect(componentEffect, {
      scheduler: () => {
        queueJob(instance.update)
      },
    })

    function componentEffect(){
      //加载了 
      if(instance.isMounted){
        const {vnode,next} = instance
        if (next) {
          next.el = vnode.el
          // 更新组件的props和slots等
          instance.props = next.props
          instance.slots = next.slots        
        }
        const nextTree = (instance.subTree = instance.render(instance.ctx))
        patch(instance.subTree, nextTree, container)
      }else{
        // 还没挂载
        const subTree = (instance.subTree = Component.render(instance.ctx) )
        patch(null, subTree, container)
        instance.isMounted = true
      }
    }
  }

  // 挂载html元素
  function mountElement(vnode, container, anchor) {
    const { shapeFlag, props, children, type } = vnode
    let el = vnode.el = hostCreateElement(type)
    // 支持单子组件和多子组件的创建
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 子元素是childern
      hostSetElementText(vnode.el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 是一个数组，比如多个div元素
      mountChildren(vnode.children, el)
    }
    // 新增props
    if (props) {
      for (const key in props) {
        const nextVal = props[key]
        hostPatchProp(el, key, null, nextVal)
      }
    }
    hostInsert(vnode.el, container, anchor)

  }
  // 挂载children
  function mountChildren(children, container) {
    // 子元素啥类型都有可能 挨个patch 
    children.forEach((child) => {
      patch(null, child, container)
    })
  }
  // 卸载/删除vnode
  function unmount(vnode) {
    const { shapeFlag, el } = vnode
    if (shapeFlag & ShapeFlags.COMPONENT) {
      unmountComponent(vnode)
    } else {
      // 调用runtime-dom的删除子元素方法 卸载
      hostRemove(el)
    }
  }

  function unmountComponent(vnode) {
    unmount(vnode.component.subTree)
  }
  // patch组元素 复杂的逻辑
  function patchChildren(n1, n2, container) {
    const prevFlag = n1.shapeFlag
    const c1 = n1.children
    const nextFlag = n1.shapeFlag
    const c2 = n1.children

    // 新的vdom是文本
    if (nextFlag & ShapeFlags.TEXT_CHILDREN) {
      if(prevFlag & ShapeFlags.ARRAY_CHILDREN){
        // 老的vdom是数组。unmount
        c1.forEach(child=>unmount(child))
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2)
      }
    } else {
      // 老的vdom是数组
      if (prevFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 新的vdom也是数组，
        if (nextFlag & ShapeFlags.ARRAY_CHILDREN) {
          // 最简单粗暴的方法就是unmountChildren(c1), 再mountChildren(c2)
          // 这样所有dom都没法复用了

          // 这里也有两种情况，没写key和写了key, key就想虚拟dom的身份证让
          // 在新老数组中的虚拟dom的key相同，就默认可以复用dom
          // <li :key="xx"></li>
          if(c1[0].key && c2[0].key){
            patchKeyedChildren(c1, c2, container, anchor, parentComponent)

          }else{
            // 么有key，只能暴力复用一个类型的dom
            patchUnKeyedChildren(c1, c2, container, anchor, parentComponent)
          }
        }else{
          // next是null
          unmountChildren(c1)
        }
      }else{
        if (nextFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2, container)
        }
      }
    }
   }
  function patchKeyedChildren(c1, c2, container, ) { 
    // 最复杂的就是这里了，每个元素都有key，都能判断出是否需要复用
    // 需要做的就是找到最短的操作路径,全部代码见github
    // https://github.com/vuejs/vue-next/blob/a31303f835f47c7aa5932267342a2cc2b21db948/packages/runtime-core/src/renderer.ts#L1762
    let i = 0
    let e1 = c1.length - 1
    let e2 = c2.length - 1
    // 1. 新老数组头部相同vdom判断
    // key的判断可能要换成isSameVNodetype
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2 && isSameVNodetype(c1[i],c2[i])) {
      patch(c1[i], c2[i], container)
      i++
    }
    // 2.尾部相同vdom判断
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2 && isSameVNodetype(c1[i],c2[i])) {
      patch(c1[e1], c2[e2], container, anchor)
      e1--
      e2--
    }

    if (i > e1 && i <= e2) {
      // 3.如果i比e1大，说明老的遍历完了，新的还有元素，直接mount
      // (a b)
      // (a b) c
      // i = 2, e1 = 1, e2 = 2
      // (a b)
      // c (a b)
      // i = 0, e1 = -1, e2 = 0
      const nextPos = i + 1
      const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor
      for (let j = i; j <= e2; j++) {
        patch(null, c2[j], container, anchor)
      }
    } else if (i > e2) {
      // 4.否则如果i比e2大，说明新的遍历完了，老的还有元素 直接unmount
      // (a b) c
      // (a b)
      // i = 2, e1 = 2, e2 = 1
      // a (b c)
      // (b c)
      // i = 0, e1 = 0, e2 = -1
      while (i <= e1) {
        unmount(c1[i])
        i++
      }
    } else{
      // 需要对比的序列
    // a [h b f d c] g
    // a [b c d e f] g
    // i = 1, e1 = 5, e2 = 5
      let s1 = i
      let s2 = i
      //存储key和在新的虚拟dom的newIndex映射关系，方便后续基于key找到在新书组的位置
      const keyToNewIndexMap = new Map()  
      // 遍历新数组中剩下的元素
      for (let i = s2; i <= e2; i++) {
        const nextChild = c2[i]
        keyToNewIndexMap.set(nextChild.key, i)
      }
      let patched = 0 //处理节点的数量
      const toBePatched = e2 - s2 + 1
      // 使用newIndexToOldIndexMap建立一个节点在新老数组中的位置关系, 方便确认最长递增子序列，默认都是0
      const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
      //move元素是否需要有移动，通过maxNewIndexSoFar来判断
      let maxNewIndexSoFar = 0
      let move = false
      for (i = s1; i <= e1; i++) {
        const prev = c1[i]

        if (patched >= toBePatched) {
          // 更新的借点数大于全部新数组要处理的数量，剩下的直接删除
          unmount(prevChild)
          continue
        }

        const newIndex = keyToNewIndexMap.get(prev.key)
        // 新节点的第newIndex个元素在newIndexToOldIndexMap的值是老数组中的索引比如
        // a [h b f d c] g
        // a [b c d e f] g
        // i = 1, e1 = 5, e2 = 5
        // keyToNewIndexMap: { b:1, c:2,d:3,e:4,f:5}
        // newIndexToOldIndexMap: [0,3，6，5，0，3]
        // 但是在newIndexToOldIndexMap中处理了头部已经预判的元素，也就是[newIndex-s2]
        // 所以就是[3，6，5，0，3]
        // 大概意思就是b这个元素在新数组中位置是1， 根据1去newIndexToOldIndexMap查询得到在老数组的位置是5
        // i+1避免0是0的情况        
        newIndexToOldIndexMap[newIndex-s2] = i + 1
        

        if (newIndex === undefined) {
          // 新的数组里没有 直接删除
          hostRemove(prev.el)
        } else {
          // 新老节点都有 patch一下下
          if (newIndex >= maxNewIndexSoFar) {
            // 出现比maxNewIndexSoFar大的，说明需要移动元素了
            move = true
          } else {
            maxNewIndexSoFar = newIndex
          }
          patch(prev, c2[newIndex], container)
        }
      }
      // 完成新旧子序列的节点的unmount和patch,
      const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : []

        j = increasingNewIndexSequence.length - 1

        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i
          const next = c2[nextIndex] 
          const anchor =
            nextIndex + 1 < l2 ? (c2[nextIndex + 1] ).el : anchor
          if (newIndexToOldIndexMap[i] === 0) {
            // mount new
            patch(null, next, container, anchor )
          } else if (moved) {

            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              hostInsert(next,container,anchor)
            } else {
              j--
            }
          }
        }
    }
  }

  
  function patchUnKeyedChildren(c1, c2, container) {
    // v-for或者多个子元素没写key
    // prev: a b c d 
    // new:  a c d e f g 
    // 由于没写key，无从判断a c d是否复用，只能是默认索引位置一样的dom复用
    // a复用，b和c如果一样的html标签，就复用标签，  c和d，d和e，然后f和g新增
    // 这里cd其实是可以服用的，不过没有key导致了性能的浪费，这也是为啥要写key

    const oldLen = c1.length
    const newLen = c2.length
    const len = Math.min(oldLen, newLen)
    for (let i = 0 ;i < len; i++) {
      patch(c1[i], c2[i], container) // 挨个复用 
    }
    if (newLen > oldLen) {
      mountChildren(c2.slice(len), container)
    } else if (newLen < oldLen) {
      unmountChildren(c1.slice(len))
    }
  }

  function render(vnode, container) {
    const prevVNode = container._vnode

    if (vnode == null) {
      if (preVNode) {
        unmount(preVNode) // 传递vnode是null，直接全部卸载
      }
    } else {
      // 调用patch
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode // 缓存vnode，作为下次render的prev
  }
  return {
    createApp: createAppAPI(render)
  }
}

function getSequence(arr) {
  // copy一份，存储更新result前最后一个索引，key就是要更新的值
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      // 二分 找到比arrI小的节点，更新result
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}