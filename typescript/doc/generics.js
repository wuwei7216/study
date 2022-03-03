// 泛型之hello world
// function identity<T>(arg: T): T {
//     return arg;
// }
// 两种使用方式 第一种常用 自己能推断T是什么类型，第二种是手动指明T
// let output = identity("myString");  // type of output will be 'string'
// let output = identity<string>("myString");  // type of output will be 'string'
// 使用泛型变量
// 泛型类型
// function identity<T>(arg: T): T {
//     return arg;
// }
// let myIdentity: <T>(arg: T) => T = identity;
// 将对象字面量定义为接口形式
// interface GenericIdentityFn {
//     <T>(arg: T): T;
// }
// function identity<T>(arg: T): T {
//     return arg;
// }
// let myIdentity: GenericIdentityFn = identity;
// let myIdentity: {<T>(arg: T): T} = identity; // 直接用对象字面量
// interface GenericIdentityFn<T> {
//     (arg: T): T;
// }
// function identity<T>(arg: T): T {
//     return arg;
// }
// let myIdentity: GenericIdentityFn<number> = identity;
// myIdentity(55)
// 泛型类 
// 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
// 类的静态属性不能使用这个泛型类型。
// class GenericNumber<T> {
//     zeroValue: T;
//     add: (x: T, y: T) => T;
// }
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; };
// 泛型约束
// 我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。
// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // Error: T doesn't have .length
//     return arg;
// }
// 为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：
// interface Lengthwise {
//     length: number;
// }
// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//     console.log(arg.length);  // Now we know it has a .length property, so no more error
//     return arg;
// }
// loggingIdentity(3);  // Error, number doesn't have a .length property
// 在泛型约束中使用类型参数
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
