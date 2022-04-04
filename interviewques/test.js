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


try {
	new Promise((resolve, reject) => {
		console.log(1)
		resolve('a')
	}).then((res, rej) => {
		console.log(res)
		throw new Error('-----')
	}).then((res) => {
		console.log('resa1', res)
	}, rej => {
		console.log('reja1', rej)
		return 'ww'
	}).then((res) => {
		console.log('resa2', res)
		return 33
	}, rej => {
		console.log('reja2', rej)
	}).catch(error => {
		console.log('err', error)
	}).then(res => {
		console.log('22', res);
		throw new Error('44444')
	}, rej => console.log('33', rej))
	.catch(error => console.log('3333', error))
} catch (error) {
	console.log('---23', error)
}

  

