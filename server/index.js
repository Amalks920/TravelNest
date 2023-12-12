const express=require('express')
const app=express()
const morgan=require('morgan')

app.use(morgan('combined'))

app.listen(process.env.PORT | 4000,()=>{
    console.log('server running')
})
