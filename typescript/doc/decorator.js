var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 装饰器
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __decorate([
        f(),
        g()
    ], C.prototype, "method", null);
    return C;
}());
// new C().method()
// 转为js后
// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
//   // c为参数长度             c小于3，则r=target（即C.prototype），否则（如果desc为null，则desc=C.prototype上的key（"method"）的描述符，否则desc=desc）r=desc
//   var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//   if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//   //   循环装饰器                                            如果装饰器存在 d=decorators[i]  如果c<3 r=d(r) 否则 如果c>3 r=d(C.prototype, 'method', desc)     
//   else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//   // 
//   return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// function f() {
//   console.log("f(): evaluated");
//   return function (target, propertyKey, descriptor) {
//       console.log("f(): called");
//   };
// }
// function g() {
//   console.log("g(): evaluated");
//   return function (target, propertyKey, descriptor) {
//       console.log("g(): called");
//   };
// }
// var C = /** @class */ (function () {
//   function C() {
//   }
//   C.prototype.method = function () { };
//   __decorate([
//       f(),
//       g()
//   ], C.prototype, "method", null);
//   return C;
// }());
// new C().method();
// 类装饰器 
var decorator;
(function (decorator) {
    // 类修饰器，参数只有一个为类的构造器
    // function sealed(constructor: Function) {
    //   console.log('constructor', constructor)
    //   Object.seal(constructor);
    //   Object.seal(constructor.prototype);
    // }
    // @sealed
    // class Greeter {
    //     greeting: string;
    //     constructor(message: string) {
    //         this.greeting = message;
    //     }
    //     greet() {
    //         return "Hello, " + this.greeting;
    //     }
    // }
    // 方法装饰器
    // 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。
    //   方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    // 成员的名字。
    // 成员的属性描述符。
    var Greeter = /** @class */ (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        __decorate([
            enumerable(false)
        ], Greeter.prototype, "greet", null);
        return Greeter;
    }());
    function enumerable(value) {
        return function (target, propertyKey, descriptor) {
            descriptor.enumerable = value;
        };
    }
    // 访问器装饰器
    // 问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。 访问器装饰器应用于访问器的 属性描述符并且可以用来监视，修改或替换一个访问器的定义。 访问器装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。
    //  TypeScript不允许同时装饰一个成员的get和set访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的。
    // 访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    // 成员的名字。
    // 成员的属性描述符。
    var Point = /** @class */ (function () {
        function Point(x, y, name) {
            this._x = x;
            this._y = y;
            this.name = name;
        }
        Point.prototype.method = function () { };
        Object.defineProperty(Point.prototype, "x", {
            get: function () { return this._x; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () { return this._y; },
            enumerable: false,
            configurable: true
        });
        __decorate([
            configurable(false)
        ], Point.prototype, "method", null);
        __decorate([
            configurable(false)
        ], Point.prototype, "x", null);
        __decorate([
            configurable(false)
        ], Point.prototype, "y", null);
        return Point;
    }());
    function configurable(value) {
        return function (target, propertyKey, descriptor) {
            descriptor.configurable = value;
        };
    }
    // 属性装饰器
    // 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
    // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    // 成员的名字。
    // 参数装饰器
    // 参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 declare的类）里。
    // 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    // 成员的名字。
    // 参数在函数参数列表中的索引。
    // 注意  参数装饰器只能用来监视一个方法的参数是否被传入。
})(decorator || (decorator = {}));
