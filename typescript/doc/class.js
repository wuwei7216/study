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
// 类
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
// 继承
// class Animal {
//   name: string;
//   constructor(theName: string) { this.name = theName; }
//   move(distanceInMeters: number = 0) {
//       console.log(`${this.name} moved ${distanceInMeters}m.`);
//   }
// }
// class Snake extends Animal {
//   constructor(name: string) { super(name); }
//   move(distanceInMeters = 5) {
//       console.log("Slithering...");
//       super.move(distanceInMeters);
//   }
// }
// class Horse extends Animal {
//   constructor(name: string) { super(name); }
//   move(distanceInMeters = 45) {
//       console.log("Galloping...");
//       super.move(distanceInMeters);
//   }
// }
// let sam = new Snake("Sammy the Python");
// let tom: Animal = new Horse("Tommy the Palomino");
// sam.move();
// tom.move(34);
// 公共，私有与受保护的修饰符
// 默认为 public 在任何地方都可以访问  调用
// private  该类  指class内部 {} 可调用
// protected 该类以及子类   派生类   改类内部及子类内部
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    return Animal;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino(sex) {
        var _this = _super.call(this, "Rhino") || this;
        _this.sex = sex;
        return _this;
    }
    return Rhino;
}(Animal));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal = new Animal("Goat");
var rhino = new Rhino('hh');
var employee = new Employee("Bob");
// animal.name   // 属性“name”为私有属性，只能在类“Animal”中访问。
// employee.name  // 属性“name”受保护，只能在类“Employee”及其子类中访问。
rhino.sex;
animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.
// readonly修饰符 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
// class Octopus {
//   readonly name: string;
//   readonly numberOfLegs: number = 8;
//   constructor (theName: string) {
//       this.name = theName;
//   }
// }
// let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
// 参数属性
var Octopus = /** @class */ (function () {
    function Octopus(name) {
        this.name = name;
        this.numberOfLegs = 8;
    }
    return Octopus;
}());

// 存取器
// 下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。 我们把对 fullName的直接访问改成了可以检查密码的 set方法。 我们也加了一个 get方法，让上面的例子仍然可以工作。
// 该存取器针对的是 fullName属性   不是 _fullName属性   _fullName属性是为了检测密码用的
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}

