function testt() {
    function Fun(name) {
        this.name = name
    }
    
    // Fun.prototype.testwu = 1
    Object.defineProperty(Fun.prototype, 'testwu', {
        value: 23,
        enumerable: true,
        configurable: true,
        writable: true
    })
    
    var temp = new Fun('hh')
    
    // console.log(temp)
    
    for (const key in temp) {
        console.log(key)
        // if (Object.hasOwnProperty.call(temp, key)) {
        //     const element = temp[key];
        // }
    }
}

testt()

function testLoop(temp){
    for (const key in temp) {
        if (Object.hasOwnProperty.call(temp, key)) {
            const element = temp[key];
            console.log(element)
        }
    }
}