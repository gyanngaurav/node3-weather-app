const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZ3lhbm5nYXVyYXYiLCJhIjoiY2thNzBqdjV6MGNkajJxcG54eW5hMDY3OSJ9.BdklpTPeT0U7Z9oDV03PHA&limit=1'
    request({url: url,json: true},(error, response)=>{
        if(error){
            callback('Unable to connect to the maps API', undefined)
        }else if(response.body.features.length ===0){
            callback('Counldn\'t find the search term', undefined)
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].places_name
            })
        }
        
    })
}





module.exports = geocode