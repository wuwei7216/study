function foo() {
  let x = 1
  {
    let x = 2
    function bar(params) {
      return x
    }
  }
  console.log('a', x)
  return bar
}
const fn = foo()
console.log('b', fn())