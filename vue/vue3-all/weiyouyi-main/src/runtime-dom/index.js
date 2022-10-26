
import { isOn } from "../shared"
import { createRenderer } from "../runtime-core"

export * from '../runtime-core'
let renderer
function ensureRenderer() {
  // 缓存
  return (
    renderer ||
    (renderer = createRenderer(nodeOps))
  )
}

export const createApp = (...args) => {
  return ensureRenderer().createApp(...args)
}

const nodeOps = {
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  },
  remove(child) {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  createElement(type) {
    return document.createElement(type)
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(node, text) {
    node.nodeValue = text
  },
  setElementText(el, text) {
    el.textContent = text
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  querySelector: selector => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, '')
  },
  patchProp
}

function patchProp(el, key, prev, next) {
  // 其实要处理的内容很多
  if(key==='class'){
    patchClass(el,next) //class
  }else if(key==="style"){
    patchStyle(el, prev, next) //style
  }else if (isOn(key)) {
    const invokers = el._events || (el._events = {})
    const existingInvoker = invokers[key]
    if (next && existingInvoker) {
      existingInvoker.value = next
    } else {
      const eventName = key.slice(2).toLowerCase()
      if (next) {
        const invoker = (invokers[key] = next)
        el.addEventListener(eventName, invoker)
      } else {
        el.removeEventListener(eventName, existingInvoker)
        invokers[key] = undefined
      }
    }
  } else {
    if (next === null || next === "") {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, next)
    }
  }
}

function patchClass(el,value){
  if (value == null) {
    el.removeAttribute('class')
  } else if (isSVG) {
    el.setAttribute('class', value)
  } else {
    el.className = value
  }
}
function patchStyle(el,prev,next){
  const currentDisplay = el.style.display
  if(!next){
    el.removeAttribute('style')
  }
  for (const key in next) {
    el.style[key] = next[key]
  }
  if (prev && !isString(prev)) {
    for (const key in prev) {
      if (next[key] == null) {
        el.style[key] =''
      }
    }
  }
}



