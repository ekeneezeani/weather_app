// let api = `https://api.openweathermap.org/data/2.5/weather?q=winnipeg&appid=237535420ba7973ff08b88e2d19afb48`

const input  = document.getElementById("city");
let city = "";

const form = document.getElementById("input-form")

form.addEventListener('submit',function(event){
  event.preventDefault()
})

let weather = {};
const KELVIN = 273.15

// if('geolocation' in navigator){
//   navigator.geolocation.getCurrentPosition(setPosition,showError)
// }else{
//   alert("Browser does not support geolocation")
// }
// function setPosition(position){
//   lon = position.coords.longitude
//   lat = position.coords.latitude

//   console.log(log,lat)
// }


// function showError(error){
//   console.log(error)
// }
const iconElemenet= document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature p");
const cityElement = document.querySelector(".city p")



input.addEventListener('keyup', function(event){
  if(event.key==="Enter"){
    city = input.value
    console.log(city)
    const data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city || "winnipeg"}&appid=237535420ba7973ff08b88e2d19afb48`)
            .then((response) =>{
              return response.json()
            }).then((data)=>{
              console.log(data.main.temp,data.name,data.sys.country,data.weather[0].icon)
              weather.city = data.name;
              weather.temp = Math.ceil(data.main.temp - KELVIN);
              weather.country = data.sys.country;
              const iconId = data.weather[0].icon;
              weather.iconUrl =`https://openweathermap.org/img/w/${iconId}.png`
              weather.description = data.weather[0].description;
            })
            .then(()=>{
              
              iconElemenet.innerHTML = `<img src="${weather.iconUrl}" />`
              tempElement.innerHTML = `${weather.temp} &#8451;`
              cityElement.innerHTML =`${weather.city}, ${weather.country}`
              
            }).catch((error)=>{
              console.log(error)
            })
  }
})

console.log(weather)