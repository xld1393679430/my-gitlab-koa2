/*
 * @Date: 2021-05-11 15:53:00
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 10:17:30
 * @FilePath: /my-gitlab-koa2/router/fileUpload.js
 */
const Router = require('koa-router')
const multer = require('koa-multer')

var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    // var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    // cb(null, fileFormat[0] + "." + fileFormat[fileFormat.length - 1]);
    cb(null, file.originalname)
  }
})

//加载配置
var upload = multer({ storage: storage });

const FileUploadRouter = new Router()

FileUploadRouter.get('/', async ctx => {
  ctx.body = `
        <form action="/fileUpload/upload" 
              method="POST"
              enctype="multipart/form-data">
            <input type="file" name="file" placeholder="请选择文件" />
            <button type="submit">提交</button>
        </form>
    `
})

FileUploadRouter.post('/upload', upload.single('file'), async ctx => {
  console.log(ctx.req.file, 'abc')
  ctx.body = {
    filename: ctx.req.file.filename//返回文件名
  }
})

module.exports = FileUploadRouter