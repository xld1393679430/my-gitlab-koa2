/*
 * @Date: 2021-05-11 10:21:04
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 10:24:15
 * @FilePath: /my-gitlab-koa2/utils/content.js
 */
const path = require('path')
const fs = require('fs')

// 封装获取目录内容方法
const dir = require('./dir')
// 读取文件内容方法
const file = require('./file')


/**
 * @description: 获取静态资源内容
 * @param {object} ctx koa上下文
 * @param {string} 静态资源目录在本地的绝对路径
 * @return {string} 请求获取到的本地内容
 */
async function content(ctx, fullStaticPath) {
    // 资源的绝对路径
    let reqPath = path.join(fullStaticPath, ctx.url)
    // 资源是否为目录或者文件
    let exist = fs.existsSync(reqPath)
    let content = ''
    if(!exist) {
        content = '404 not found'
    } else {
        // 判断访问地址是文件夹还是文件
        let stat = fs.statSync(reqPath)
        if (stat.isDirectory()) {
            content = dir(ctx.url, reqPath)
        } else {
            content = file(reqPath)
        }
    }
    return content
}

module.exports = content
