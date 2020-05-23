const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=395b4d0c34cb27dc25ed2108d5129bf5&query='+encodeURIComponent( lat)+','+ encodeURIComponent ( long)
    
    request({url: url, json: true},(error, response)=>{
        if(error){
            callback('Unable to connect to api',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,response.body.location.name+'This is currently '+response.body.current.temperature+' degrees out.  With a '+response.body.current.precip+'% change of rain')
        }
    })
}
module.exports = forecast