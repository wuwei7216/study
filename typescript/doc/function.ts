// 函数类型
// 为函数定义类型
function add(x: number, y: number): number {
  return x + y;
}
// let myAdd = function(x: number, y: number): number { return x + y; };
// 书写完整函数类型   (x: number, y: number) => number   这个是定义一个函数的类型  参数以及返回类型 = 后面是赋值
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
// 也可以如下写  只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。  参数名字只是为了增加可读性
// let myAdd: (baseValue: number, increment: number) => number =
//     function(x: number, y: number): number { return x + y; };
// 推断类型