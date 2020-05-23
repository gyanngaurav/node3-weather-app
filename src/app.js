const path = require('path')
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name:'Gyan Gaurav'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Gyan Gaurav'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help message',
        name:'Gyan Gaurav'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }
    geocode(req.query.address,(error,response)=>{
        if(error){
               return res.send({
                    error: error
               })
        }
        forecast(response.latitude, response.longitude, (error, data) => {
            if(error){
                return res.send({
                    error: error
               })
            }
            res.send({
                forecast : data,
                location: req.query.address
            })
          })
    
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
         
    }
    console.log(req.query.key)
    res.send({
        forcast:'Its 50 degress',
        location:'NewYork'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help message',
        name:'Gyan Gaurav',
        errorMessage:'Help content not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'Help message',
        name:'Gyan Gaurav',
        errorMessage:'Page not found'
    })

})
//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})