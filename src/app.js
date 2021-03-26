const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 2000


//definimi i rrugeve per express
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Customize your server
app.use(express.static(publicDir))  

app.get('',(req,res)=>{
    res.render('index',{
        title:'Koha Sot',
        name:'Blend Zeqiri'
    })//no need for the file such as index.hbs jsut the file name;

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:' About Me ',
        name: 'Blend Zeqiri'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        message:'here',
        title: 'Help',
        name: 'Blend Zeqiri'
    })
})

app.get('/weather', (req,res )=>{
    if(!req.query.address){
        return res.send({
            error:'Invalid address'
        });
    }
    geoCode(req.query.address,(error,{latitude, longitude, location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })

        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Provide a search term'
        });
    }

    console.log(req.query.search)
    res.send({
        products:[]
    });
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage:'Help page not found'
    });
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage:'Page not found'
    });
})

//to start the server we use this method 
app.listen(port, ()=>{
    console.log('Server is on port' + port)
})