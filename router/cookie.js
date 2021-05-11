/*
 * @Date: 2021-05-11 13:03:25
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-11 13:12:14
 * @FilePath: /my-gitlab-koa2/router/cookie.js
 */
const Router = require('koa-router')

const CookieRouter = new Router()
CookieRouter.get('/', async ctx => {
    ctx.cookies.set('cid2', 'hello2', {
        domain: 'localhost',
        path: '/index',
        maxAge: 10 * 60 * 1000,
        expires: new Date('2021-05-11 13: 10'),
        httpOnly: false,
        overwrite: true
    })
    ctx.body = 'cookies is ok'
})

module.exports = CookieRouter