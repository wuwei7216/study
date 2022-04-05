/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
    const wL = word.length
    const iL = board.length
    const jL = board[0].length
    // console.log(wL, iL, jL)
    //     console.log(board[0][0])
    //     console.log(word[0])
    var fun = function (i, j, k) {
        if (i === 2 && j === 3 && k === 0) {
            console.log(i, j)
        }
        if (i < 0 || i >= iL || j < 0 || j >= jL || board[i][j] !== word[k]) return false
        if (k === wL - 1 ) return true
        console.log(i,j)
        // console.log(board)
        board[i][j] = ''
        k++
        const ret = fun(i, j + 1, k) || fun(i, j - 1, k) || fun(i + 1, j, k) || fun(i - 1, j, k)
        board[i][j] = word[k]
        return ret
    }
    for (let i = 0; i < iL; i++) {
        for (let j = 0; j < jL; j++) {
            console.log(`----${i}----${j}`)
            if (fun(i, j, 0)) return true
        }
    }
    
    return false
};

exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "EEDA")






/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var movingCount = function(m, n, k) {
    const db = new Array(m).fill(null)
    for (let i = 0; i < m; i++) {
        db[i] = new Array(n).fill(0)
    }
    let temp = 0
    var dfs = function(i, j) {
        let temI = i
        let temJ = j
        let sum = 0
        while (temI) {
            sum += (temI % 10)
            temI = Math.floor(temI/10)
            console.log(temI)
        }
        while (temJ) {
            sum += (temJ % 10)
            temJ = Math.floor(temJ/10)
        }
        if (i >=m || j >= n || sum > k || db[i][j] !== 0) return false
        db[i][j] = 1
        temp++
        console.log(i, j)
        return dfs(i, j + 1) || dfs(i + 1, j)
    }
    dfs(0, 0)
    return temp
};


movingCount(4, 11, 13)
