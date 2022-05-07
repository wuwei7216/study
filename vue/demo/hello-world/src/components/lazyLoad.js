import { throttle } from 'lodash'
// 懒加载
function LazyLoad (el, options) {
  if (!(this instanceof LazyLoad)) {
    return new LazyLoad(el)
  }

  this.setting = Object.assign({}, { src: 'data-src', srcset: 'data-srcset', selector: '.lazyload' }, options)

  if (typeof el === 'string') {
    el = document.querySelectorAll(el)
  }
  this.images = Array.from(el)

  this.listener = this.loadImage()
  this.listener()
  this.initEvent()
}

LazyLoad.prototype = {
  loadImage () {
    return throttle(function () {
      // eslint-disable-next-line no-debugger
      // debugger
      let startIndex = 0
      while (startIndex < this.images.length) {
        const image = this.images[startIndex]
        if (isElementInViewport(image)) {
          const src = image.getAttribute(this.setting.src)
          const srcset = image.getAttribute(this.setting.srcset)
          if (image.tagName.toLowerCase() === 'img') {
            if (src) {
              image.src = src
            }
            if (srcset) {
              image.srcset = srcset
            }
          } else {
            image.style.backgroundImage = `url(${src})`
          }
          this.images.splice(startIndex, 1)
          continue
        }
        startIndex++
      }
      
      if (!this.images.length) {
        this.destroy()
      }
    }, 300).bind(this)
  },
  initEvent () {
    window.addEventListener('scroll', this.listener, false)
  },
  destroy () {
    window.removeEventListener('scroll', this.listener, false)
    this.images = null
    this.listener = null
  }
}

function isElementInViewport (el) {
  const { top, height, left, width } = el.getBoundingClientRect()
  const w = window.innerWidth || document.documentElement.clientWidth
  const h = window.innerHeight || document.documentElement.clientHeight
  return (
    top <= h &&
    (top + height) >= 0 &&
    left <= w &&
    (left + width) >= 0
  )
}

//方法二
function LazyLoad2 (images, options = {}) {
  // console.log('======')
  if (!(this instanceof LazyLoad2)) {
    return new LazyLoad2(images, options)
  }
  this.setting = Object.assign({}, { src: 'data-src', srcset: 'data-srcset', selector: '.lazyload' }, options)
  this.images = Array.from(images || document.querySelectorAll(this.setting.selector))
  this.observer = null
  this.init()
}

LazyLoad2.prototype.init = function () {
  // let self = this
  let observerConfig = {
    root: null,  // 所监听对象的具体祖先元素(element)。如果未传入值或值为null，则默认使用顶级文档的视窗。
    rootMargin: '0px', // 计算交叉时添加到根(root)边界盒bounding box (en-US)的矩形偏移量， 可以有效的缩小或扩大根的判定范围从而满足计算需要
    // 一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。如果构造器未传入值, 则默认值为0。
    // 例如 元素a超过 50% 显示在视图内，触发回调  则这个值应该改为[0.5] 取值范围在0到1之间
    threshold: [0, 0.1]
  }
  this.observer = new IntersectionObserver(entries => {
    console.log('-----------')
    entries.forEach(entry => {
      const target = entry.target
      // If intersectionRatio is 0, the target is out of view
  // and we do not need to do anything.
      if (entry.intersectionRatio > 0) {
        this.observer.unobserve(target)
        // eslint-disable-next-line no-debugger
        // debugger
        const src = target.getAttribute(this.setting.src)
        const srcset = target.getAttribute(this.setting.srcset)
        if ('img' === target.tagName.toLowerCase()) {
          if (src) {
            target.src = src
          }
          if (srcset) {
            target.srcset = srcset
          }
        } else {
          target.style.backgroundImage = `url(${src})`
        }
      }
    })
  }, observerConfig)

  this.images.forEach(image => this.observer.observe(image))
}


export {
  LazyLoad,
  LazyLoad2
}