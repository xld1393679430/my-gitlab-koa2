/*
 * @Author: your name
 * @Date: 2021-05-11 10:21:09
 * @LastEditTime: 2021-05-11 11:49:56
 * @LastEditors: liangdong.xu
 * @Description: In User Settings Edit
 * @FilePath: /my-gitlab-koa2/utils/dir.js
 */
const url = require('url')
const fs = require('fs')
const path = require('path')

const walk = require('./walk')

/**
 * @description: 目录内容
 * @param {*} url 当前请求上下文的URL 即ctx.url
 * @param {*} reqPath 请求静态资源的完整本地路径
 * @return {*} 返回目录内容 封装成html
 */
function dir(url, reqPath) {
    let contentList = walk(reqPath)
    let html = '<ul>'
    for(let [index, item] of contentList.entries()) {
        html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>`
    }
    html = `${html}</ul>`
    return html
}

module.exports = dir