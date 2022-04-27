/**
 * 手写深度克隆
 */
function deepClone(target, hash = new WeakMap()) {
  if (target === null) return target;
  if (target instanceof RegExp) return new RegExp(target);
  if (target instanceof Date) return new Date(target);
  if (target instanceof HTMLElement) return target;

  if (typeof target !== "object") return target;

  // 为了解决相互引用问题
  if (hash.has(target)) return hash.get(target);

  //其余需要拷贝整个对象
  const cloneTarget = new target.constructor();
  hash.set(target, cloneTarget)
  // 引入reflect 处理symbol
  Reflect.ownKeys(target).forEach((item) => {
    cloneTarget[item] = deepClone(target[item], hash);
  });
  return cloneTarget;
}
// 测试
const obj = {
  a: true,
  b: 100,
  c: "str",
  d: undefined,
  e: null,
  f: Symbol("f"),
  g: {
    g1: {}, // 深层对象
  },
  h: [], // 数组
  i: new Date(), // Date
  j: /abc/, // 正则
  k: function () {}, // 函数
  l: [document.getElementById("foo")], // 引入 WeakMap 的意义，处理可能被清除的 DOM 元素
};
obj.obj = obj // 循环引用

const name = Symbol('name')
obj[name] = 'lin'  // Symbol 作为键

const newObj = deepClone(obj)

console.log(newObj)

// ---------------------------------------*--------------------------------------------------------
