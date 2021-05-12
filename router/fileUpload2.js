/*
 * @Date: 2021-05-11 15:53:00
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 10:49:52
 * @FilePath: /my-gitlab-koa2/router/fileUpload2.js
 */
const Router = require('koa-router')
const path = require('path')
const { uploadFile } = require('../utils/uploadFile')

const FileUploadRouter = new Router()

FileUploadRouter.get('/', async ctx => {
  ctx.body = `
        <form action="/fileUpload2/upload" 
              method="POST"
              enctype="multipart/form-data">
            <input type="file" name="file" placeholder="请选择文件" />
            <button type="submit">提交</button>
        </form>
    `
})

FileUploadRouter.post('/upload', async ctx => {
  let result = {
    success: false
  }
  result = await uploadFile(ctx, {
    fileType: 'uploads',
    path: 'public'
  })

  ctx.body = result
})

module.exports = FileUploadRouter