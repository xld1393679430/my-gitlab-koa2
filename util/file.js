const fs = require('fs')

/**
 * @description: 读取文件
 * @param {*} filePath 文件本地的绝对路径
 * @return {*} 
 */
function file(filePath) {
    return fs.readFileSync(filePath, 'binary')
}

module.exports = file