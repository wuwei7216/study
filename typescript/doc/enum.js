// 枚举
// 数字枚举 如果第一位为数字，则会递增
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction["Right"] = "ee";
})(Direction || (Direction = {}));
Direction.Down; // 2
console.log(Direction[1]); // up
// 字符串枚举
var Direction1;
(function (Direction1) {
    Direction1["Up"] = "UP";
    Direction1["Down"] = "DOWN";
    Direction1["Left"] = "LEFT";
    Direction1["Right"] = "RIGHT";
})(Direction1 || (Direction1 = {}));
// 计算的和常量成员
var FileAccess;
(function (FileAccess) {
    // constant members
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member  
    FileAccess[FileAccess["G"] = "123".length] = "G"; // 只有这个一个是计算得出的 看编译后的结果就知道了 "123" 也可是变量
})(FileAccess || (FileAccess = {}));
// 联合枚举与枚举成员的类型
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
var c = {
    kind: 4,
    // kind: ShapeKind.Square,  // 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle” 但是在这里可以填一个数字 kind: 4 估计应该是“ShapeKind.Circle”类型继承了Number类型
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100
};
// 运行时的枚举
// 反向映射 
// 除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字
// 要注意的是 不会为字符串枚举成员生成反向映射。
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum["B"] = "hh";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A" Enum[0]也可
var testen = Enum2.A;
console.log(testen);
