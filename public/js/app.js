console.log('Javascript loaded')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const error = document.querySelector(".error")
const forecast = document.querySelector(".forecast")
weatherform.addEventListener('submit',(e)=>{
    forecast.textContent = ''
    error.textContent = ''
    e.preventDefault()
    const location = search.value
    console.log(location)
    var url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                error.textContent = data.error
            }else{
                forecast.textContent = data.forecast
                console.log(data.forecast)
                console.log(data.location)
            }
        })
    })

})