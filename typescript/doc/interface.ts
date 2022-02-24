interface LabelledValue {
  label: string;
  size1?: number;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!
p1 = { x: 10, y: 21 }; // 但是可以这样修改 y的值  猜测 做法应该是 给p1的属性赋值的时候 给个onlyRead，但是重新给p1赋一个对象的时候缺能绕过这个操作
console.log(p1)

let a1: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a1;
ro = [1,2,4] // 也是内部属性不可改 ，但是对象整体可以改
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a1 = ro; // error!

const testArr: ReadonlyArray<number> = [1,3,5] // 这样能保证一个数组绝对不能修改（这个只能正对于值修改，地址（当泛型为对象的时候）不变，内部值改了 也可绕过）

// 额外的属性检查
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
  return { color: 'string', area: 11 }
}

// let mySquare = createSquare({ colour: "red", width: 100 }); // error
// let testwu = { colour: "red", width: 100 }
// let mySquare = createSquare(testwu)   // true

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 可索引的类型
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
myArray = {1: 'hha', 3:'hah'}
let myStr: string = myArray[0];

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

// 类类型
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
      this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

// 继承接口
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 混合类型
// 先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。
// 一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c1 = getCounter();
c1(10);
c1.reset();
c1.interval = 5.0;

// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image1 implements SelectableControl {
//   select() { }
// }

class Location1 {

}