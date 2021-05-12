/*
 * @Date: 2021-05-12 13:15:44
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 13:22:50
 * @FilePath: /my-gitlab-koa2/router/jsonp2.js
 */
const Router = require('koa-router')
const Jsonp2Router = new Router()

/**
 * @description: 通过koa-jsonp实现jsonp
 * @param {*}
 * @return {*}
 */
Jsonp2Router.get('/', async ctx => {
    let returnData = {
        success: true,
        data: {
            text: 'hello'
        }
    }

    ctx.body = returnData
})

module.exports = Jsonp2Router