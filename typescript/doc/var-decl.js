// var
// let
// const
// function
// 解构
var _a = [1, 2, 3, 4], second = _a[1], fourth = _a[3];
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
// 默认值
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
}
