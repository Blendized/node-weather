const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=18f88c0ab7884801f8013bf461011342&query=' + lat + ',' + long 
    request ({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to location services')
        }else if(body.error){
            callback('Unable to find location. Please try another search')
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}
module.exports = forecast