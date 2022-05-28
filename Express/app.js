const express=require('express')
const app=express()
const Artilce=require('./db/db')
const session=require('express-session')

const port=process.env.PORT||3000

app.use(express.json())//解析json数据,不然接收不到body数据
app.use(session({
    secret:'chili',
    resave: false,
    saveUninitialized: true
}))

const page =require('./middleware/page')

app.get('/',(req,res)   =>{
    console.log(req.session);
    res.send('Hello Express')
})

app.get('/articles',page,(req,res,next)=>{
    console.log(req.session);
    res.send('get')
})

app.post('/articles',(req,res,next)=>{
    console.log(req.session);
    Artilce.create(req.body)
    console.log(req.body);
    res.send('ok')
})

app.get('/articles/:id',(req,res,next)=>{
    console.log(req.session.code);
    req.session.code='chili'
    const id=req.params.id
    res.send({
        id
    })
})

app.delete('/articles',(req,res,next)=>{
    res.send('delete')
})


app.listen(port,()=>{
    console.log('running in http://127.0.0.1:3000');
})