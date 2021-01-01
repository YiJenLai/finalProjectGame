const express = require('express');
const path = require('path');
const app = express();
//引入路由
const router = express.Router();


router.get('/hello',(req,res)=>{
    res.send('hello');
})

app.get('/homePage',(req,res)=>{
    res.send('hello')
})


// 所有靜態資源訪問都從public資料夾下去找
app.use(express.static(path.join(__dirname,'public')));

//設置模板引擎ejs
app.get('/hello',(req,res)=>{
    res.send('test');
})

//使用router
// app.use('/router',router);
app.listen(3000);
console.log("服務器開啟成功");