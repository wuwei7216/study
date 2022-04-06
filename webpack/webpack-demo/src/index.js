// import _ from 'lodash';
// import printMe from './print.js';

async function component() {
  const { default: _ } = await import('lodash');
  const element = document.createElement('div');
  // const btn = document.createElement('button');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;

  // element.appendChild(btn);

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});