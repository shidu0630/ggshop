const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser")
const session = require('express-session')
//数据库连接
require('./model/mongoose')
const admin = require('./router/admin')
//模板渲染
app.engine('art',require('express-art-template'))
//模板存放的位置
app.set('views',path.join(__dirname,'common'))
//模板默认后缀
app.set('view engine','art')
//实现静态资源访问
app.use(express.static(path.join(__dirname,'static')))
//获取post参数
app.use(bodyParser.urlencoded({extended:false}))
//session设置
app.use(session({
    secret:'li bi',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*5} //指定cookie有效时常
}))
app.use('/admin',(req,res,next)=>{
    const path = req.path
    if(path != '/login' && path != '/reg'){
        if(!req.session.email ){
            res.redirect('/admin/login')
        }      
    }
    next()
})
app.use('/admin',admin)
app.listen(3000)
