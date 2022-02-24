// var
// let
// const
// function
// 解构
let [, second, , fourth] = [1, 2, 3, 4];
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a, b } = o;
// 默认值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}