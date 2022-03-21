// var audio = document.getElementById("audio1")
// function play(){
//     console.log('111')
//     audio.play()
// }
// function pause() {
//     audio.pause()
// }

// console.log('hh3')
// document.getElementById('hhh').onclick = temClick

// function temClick () {
//     console.log(this)
//     setTimeout(function () {
//         console.log(this)
//     }, 1000)
// }

// const a = 'hah'
// var b = 'xx'

// if (window.a) {
//     var c = '34'
//     b = '12'
// }

// console.log(a)
// console.log(b)
// console.log(c)

// ----------
// for (r = 0; r < 4;r++){
//     console.log(str)
//     for (var i = 0,str = '';i < 4;i++) {
//         str += i < (3-r) ? ' ' : '1';
//     }
//     console.log(str);
// }

// console.log(i)

// const test = {
//     rules: false
    
//   };
//   function Build() {
//     this.rules = true;
//     test.fun = function () {
//         console.log(this.rules)
//     }
//     return test
//   }
//   const build = new Build();
//   build.fun()
//   console.log(build.rules);

// var tempArr = [1,20,3,5,4]

// tempArr.sort((a, b) => {
//     console.log(a, b)
//     console.log(tempArr)
//     console.log('-------------')
    
//     return b - a
// })

// function fun () {
//     b = 4
//     delete window.b
//     console.log(b)
// }

// fun()

// for(var i = 0; i < 5; i++) {
//     console.log(i)
// }

// function fun () {
//     var a = 1
//     // console.log(a++)
//     // console.log(a)
//     return ++a
// }
// console.log(fun())
// setInterval('alert(hello);', 3000);


// class Dog {
//     static dog() {
//         console.log(this)
//     }
//     bark() {
//         console.log('goujiao')
//     }
    
// }

// var dog = new Dog()
// console.log(Dog.prototype.constructor)
// Dog.dog()

var reg = /([a-z]+)(\d+)/;							//匹配一个或多个字母，和一个或多个数字
			reg.test('hello123');						//ture
			console.log(RegExp)						//输出 hello，即匹配的第一个括号里的内容
			// console.log(RegExp.$2)						//输出 123  ，即匹配的第二个括号里的内容

import testwu from './test2'
console.log(testwu())
console.log(testwu())
