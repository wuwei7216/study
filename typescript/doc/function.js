// 函数类型
// 为函数定义类型
function add(x, y) {
    return x + y;
}
// let myAdd = function(x: number, y: number): number { return x + y; };
// 书写完整函数类型   (x: number, y: number) => number   这个是定义一个函数的类型  参数以及返回类型 = 后面是赋值
var myAdd = function (x, y) { return x + y; };
// 也可以如下写  只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。  参数名字只是为了增加可读性
// let myAdd: (baseValue: number, increment: number) => number =
//     function(x: number, y: number): number { return x + y; };
// 推断类型 如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：
// 可选参数和默认参数 可选参数必须跟在必须参数后面  默认值
// TypeScript里的每个函数参数都是必须的。 这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。
// 有默认值的参数放在必填参数前，调用的时候必须，放在之后可不写  下例子中firstName就是必填参数
function buildName(firstName, hhhh, lastName) {
    if (hhhh === void 0) { hhhh = 'jj'; }
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName("Bob"); // works correctly now
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
var result3 = buildName("Bob", "Adams"); // ah, just right
// 重载
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
