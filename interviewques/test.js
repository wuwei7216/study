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

// var reg = /([a-z]+)(\d+)/;							//匹配一个或多个字母，和一个或多个数字
// 			reg.test('hello123');						//ture
// 			console.log(RegExp)						//输出 hello，即匹配的第一个括号里的内容
// 			// console.log(RegExp.$2)						//输出 123  ，即匹配的第二个括号里的内容

// import testwu from './test2'
// console.log(testwu())
// console.log(testwu())


// var obj = new Proxy({}, {
// 	get: function (target, propKey, receiver) {
// 		console.log(target)
// 		console.log(propKey)
// 		console.log(receiver)
// 	  return Reflect.get(target, propKey, receiver);
// 	},
// 	set: function (target, propKey, value, receiver) {
// 		console.log('--------------------')
// 		console.log(target)
// 		console.log(propKey)
// 		console.log(value)
// 		console.log(receiver)
// 	  return Reflect.set(target, propKey, value, receiver);
// 	}
//   });

//   obj.count = 1
//   obj.count
// var obj = {a: 1}
// var oldVal = obj.a
// var test = Object.defineProperty(obj, 'a', {
// 	get() {
// 		return oldVal
// 	}
// })

// console.log(test === obj)

// console.log(obj.a)

// 今日头条面试题

// async function async1() {

// 	console.log('async1 start')
  
// 	await async2()
  
// 	console.log('async1 end')

// 	await async2()
  
// 	console.log('async1 end')
  
//   }
  
//   async function async2() {
  
// 	console.log('async2')
  
//   }
  
//   console.log('script start')
  
//   setTimeout(function () {
  
// 	console.log('settimeout')
  
//   })
  
//   async1()
  
//   new Promise(function (resolve) {
  
// 	console.log('promise1')
  
// 	resolve()
  
//   }).then(function () {
  
// 	console.log('promise2')
  
//   })
  
//   console.log('script end')


// try {
// 	new Promise((resolve, reject) => {
// 		console.log(1)
// 		resolve('a')
// 	}).then((res, rej) => {
// 		console.log(res)
// 		throw new Error('-----')
// 	}).then((res) => {
// 		console.log('resa1', res)
// 	}, rej => {
// 		console.log('reja1', rej)
// 		return 'ww'
// 	}).then((res) => {
// 		console.log('resa2', res)
// 		return 33
// 	}, rej => {
// 		console.log('reja2', rej)
// 	}).catch(error => {
// 		console.log('err', error)
// 	}).then(res => {
// 		console.log('22', res);
// 		throw new Error('44444')
// 	}, rej => console.log('33', rej))
// 	.catch(error => console.log('3333', error))
// } catch (error) {
// 	console.log('---23', error)
// }

// 在异步函数中抛出的错误不会被catch捕获到
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         throw 'Uncaught Exception!';
//     }, 1000);
// }).catch(() => {
//     console.log('err'); //不会执行
// });

// new Promise((resolve, reject) => {
// 	console.log('222')
//     setTimeout(() => {
//         reject();
//     }, 1000);
// }).catch(() => {
//     console.log('err'); //err
// })

// Promise.resolve('1').then(res => console.log(res))

// 实现一个 Scheduler 类，完成对Promise的并发处理，最多同时执行2个任务
// class Scheduler {
//     constructor() {
//         this.tasks = [], // 待运行的任务
//         this.usingTask = [] // 正在运行的任务
//     }
//     // promiseCreator 是一个异步函数，return Promise
//     add(promiseCreator) {
//         return new Promise((resolve, reject) => {
//             promiseCreator.resolve = resolve
//             if (this.usingTask.length < 2) {
//                 this.usingRun(promiseCreator)
//             } else {
//                 this.tasks.push(promiseCreator)
//             }
//         })
//     }

//     usingRun(promiseCreator) {
//         this.usingTask.push(promiseCreator)
//         promiseCreator().then(() => {
//             promiseCreator.resolve()
//             this.usingMove(promiseCreator)
//             if (this.tasks.length > 0) {
//                 this.usingRun(this.tasks.shift())
//             }
//         })
//     }

//     usingMove(promiseCreator) {
//         let index = this.usingTask.findIndex(promiseCreator)
//         this.usingTask.splice(index, 1)
//     }
// }

// const timeout = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
// })

// const scheduler = new Scheduler()

// const addTask = (time, order) => {
//     scheduler.add(() => timeout(time)).then(() => console.log(order))
// }

// addTask(400, 4) 
// addTask(100, 2) 
// addTask(300, 3) 

setTimeout(() => console.log('111'), 2000)
setTimeout(() => console.log('222'), 500)
  

