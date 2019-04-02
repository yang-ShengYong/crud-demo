var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置模板引擎和bodyParser必须在挂载路由之前
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(router)

app.listen(3000, function () {
  console.log('running...')
})

// 之前页面显示错乱是因为bootstrap@4版本太高了，后来卸载重装bootstrap@3就好了