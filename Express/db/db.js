
const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/express')

const articleSchema=new mongoose.Schema({
    title:String,
    articler:String
})

const article=mongoose.model('Article',articleSchema)

module.exports=article