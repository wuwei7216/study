// jsonp
(function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    window[callback] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    };
    params = { ...params, callback }; // wd=b&callback=show
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join("&")}`;
    document.body.appendChild(script);
  });
})({
  url: "http://localhost:3000/say",
  params: { wd: "Iloveyou" },
  callback: "show",
}).then((data) => {
  console.log(data);
});
(function jsonp({url, params, callback}) {
    const temp = new Promise((resolve, reject) => {
        window[callback] = function(data) {
            resolve(data)
        }
        let script = document.createElement('script')
        let arrs = [`callback=${callback}`]
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                const element = params[key];
                arrs.push(`${key}=${element}`)
            }
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
    return temp 
})({
    url: 'http://localhost:3000/say',
    params: {wd: 'iloveyou'},
    callback: 'show1'
}).then(res => {
    console.log(res)
})
//