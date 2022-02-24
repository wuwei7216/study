var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
var p1 = { x: 10, y: 20 };
// p1.x = 5; // error!
p1 = { x: 10, y: 21 }; // 但是可以这样修改 y的值  猜测 做法应该是 给p1的属性赋值的时候 给个onlyRead，但是重新给p1赋一个对象的时候缺能绕过这个操作
console.log(p1);
var a1 = [1, 2, 3, 4];
var ro = a1;
ro = [1, 2, 4]; // 也是内部属性不可改 ，但是对象整体可以改
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a1 = ro; // error!
var testArr = [1, 3, 5]; // 这样能保证一个数组绝对不能修改（这个只能正对于值修改，地址（当泛型为对象的时候）不变，内部值改了 也可绕过）
function createSquare(config) {
    // ...
    return { color: 'string', area: 11 };
}
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
var myArray;
myArray = ["Bob", "Fred"];
myArray = { 1: 'hha', 3: 'hah' };
var myStr = myArray[0];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var square = {};
square.color = "blue";
square.sideLength = 10;
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c1 = getCounter();
c1(10);
c1.reset();
c1.interval = 5.0;
// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
// 错误：“Image”类型缺少“state”属性。
// class Image1 implements SelectableControl {
//   select() { }
// }
var Location1 = /** @class */ (function () {
    function Location1() {
    }
    return Location1;
}());
