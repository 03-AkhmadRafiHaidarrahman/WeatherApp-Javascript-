const City = document.getElementById("City")
const temp = document.getElementById("temp")
const serene = document.getElementById("serene")
const search = document.getElementById("search")
const input = document.getElementById("input")

let apikey = "4b7f4e6b77f6a0513ae55ac488bc46c7"

async function getWeather(kota) {
    try{
    let geocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${kota}&appid=${apikey}`
    let georesponse = await fetch(geocoding)
    const geodata = await georesponse.json()
    let weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${geodata[0].lat}&lon=${geodata[0].lon}&appid=${apikey}&units=metric`
        let weresponse = await fetch(weatherData)
        console.log(weresponse)

        console.log(geodata[0].lat)
        City.textContent = geodata[0].local_names.id
        
        
        if(!georesponse.ok){
            console.log(`Error ${georesponse.status}`)
        }

        const data = await weresponse.json()
        serene.textContent = data.weather[0].main
        console.log(`Weather ${data.main.temp}`)
        console.log(data)
        
        temp.textContent = data.main.temp
       
        document.getElementById("Feels").textContent = data.main.feels_like
        document.getElementById("Humidity").textContent = data.main.humidity
        document.getElementById("WindSpeed").textContent = data.wind.speed
        
    }catch(error){
        console.error(`Error: ${error.message}`)
        City.textContent = `Error ${error.message}`
    }
}
getWeather("Jakarta")


search.addEventListener("click", async (event)=>{
    // console.log(input.value)
    try{
        getWeather(input.value)
    event.preventDefault()
    }catch(error){
        console.error(error)
    }
    
})