const path = require('path')
const mimes = require('./mimes')

// 解析资源类型
function parseMime(url) {
    let extName = path.extname(url)
    extName = extName ? extName.slice(1): 'unknown'
    return mimes[extName]
}

module.exports = {
    parseMime
}