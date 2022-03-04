// 枚举
// 数字枚举 如果第一位为数字，则会递增
enum Direction {
    Up = 1, // 不写的话默认0
    Down, // 递增 2
    Left, // 递增 3
    Right = 'ee',
}
Direction.Down // 2
console.log(Direction[1]) // up

// 字符串枚举
enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// 计算的和常量成员
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member  
    G = "123".length  // 只有这个一个是计算得出的 看编译后的结果就知道了 "123" 也可是变量
}

// 联合枚举与枚举成员的类型
enum ShapeKind {
    Circle,
    Square,
}
interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}
interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}
let c: Circle = {
    kind: 4,
    // kind: ShapeKind.Square,  // 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle” 但是在这里可以填一个数字 kind: 4 估计应该是“ShapeKind.Circle”类型继承了Number类型
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100,
}

// 运行时的枚举

// 反向映射 
// 除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字
// 要注意的是 不会为字符串枚举成员生成反向映射。
enum Enum {
    A,
    B = 'hh'
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A" Enum[0]也可

// const枚举
// 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。转为js文件后你不会看到它
const enum Enum1 {
    A = 1,
    B = A * 2
}

// 外部枚举 不会生成反向映射 不会生成该对象，其实他是默认 当前环境可以取到Enum2对象，并且该对象中有A B C 等成员，如果没有 Enum2对象，runtime 使用的时候就会出错
// 作用当前环境下 有个js文件 这个js文件中有Enum2这个对象  我想在ts文件中调用，就写这个外部枚举
declare enum Enum2 {
    A = 1,
    B,
    C = 2
}
var testen = Enum2.A
console.log(testen)

// 外部常量枚举（declare 和 const 关键词联合声明）
// 声明语 + 修饰符 + 关键词 + 枚举名称
// 这个枚举类型和 const 枚举类型并没有什么区别，只是会提示是否有枚举命名冲突和成员冲突，该枚举类型不会生成反向映射
declare const enum ChineseZodiac {
    rat = 1,
    cattle,
    tiger,
    rabbit,
    dragon
  }