module.exports=(req,res,next)=>{
    const startPage=req.query
    //处理数据加到req
    console.log(startPage);
    next()
}