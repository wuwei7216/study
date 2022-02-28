// 类
class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

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
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
  public sex:string;
  constructor(sex) { super("Rhino"); this.sex = sex }
}

class Employee {
  protected name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino('hh');
let employee = new Employee("Bob");
// animal.name   // 属性“name”为私有属性，只能在类“Animal”中访问。
// employee.name  // 属性“name”受保护，只能在类“Employee”及其子类中访问。
rhino.sex
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
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {
  }
}