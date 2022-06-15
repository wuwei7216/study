// import _ from 'lodash';
// import printMe from './print.js';
// import './style.css'
import {
  cube
} from './math.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('pre');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' +
    cube(5)
  ].join('\n\n');

  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);