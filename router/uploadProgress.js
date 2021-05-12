/*
 * @Date: 2021-05-11 15:53:00
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 11:11:09
 * @FilePath: /my-gitlab-koa2/router/uploadProgress.js
 */
const Router = require('koa-router')
const path = require('path')
const { uploadFile } = require('../utils/uploadFile')

const UploadProgressRouter = new Router()

UploadProgressRouter.get('/', async ctx => {
  await ctx.render('uploadProgress')
})

UploadProgressRouter.post('/', async ctx => {
  let result = {
    success: false
  }
  let serverFilePath = 'static/image'

  result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})

module.exports = UploadProgressRouter