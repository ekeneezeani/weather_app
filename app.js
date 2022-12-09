
/** Create variables to access HTML ELEMENTS */
const input  = document.getElementById("city");
const iconElemenet= document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature p");
const cityElement = document.querySelector(".city p")
const form = document.getElementById("input-form")
const btnLocation = document.getElementById("btnLocation")
const descriptionElement = document.querySelector(".description p")
/**Initializing Variables */
let city = "";
let count = 1;
let weather = {};
const KELVIN = 273.15
let longitude = 0.00;
let latitude = 0.00;

/**Display the weather of your present location */
btnLocation.addEventListener('click',function(){
  getWeatherByPresentLocation(longitude,latitude)
})

/**Prevent form submission when Enter key is pressed */
form.addEventListener('submit',function(event){
  event.preventDefault()
})

/**to get long and lat of current location */

if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition,showError)
}else{
  alert("Browser does not support geolocation")
}

/**Callback function for getCurrentPosition method */
function setPosition(position){
  longitude = position.coords.longitude
  latitude = position.coords.latitude

  console.log(longitude,latitude)
  getWeatherByPresentLocation(longitude,latitude)
  
}

/**Callback function for getCurrentPosition method */
function showError(error){
  console.log(error)
}

function getWeatherByPresentLocation(longitude, latitude){
  const data = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}.34&lon=${longitude}.99&appid=237535420ba7973ff08b88e2d19afb48`)
  .then((response)=>{
   return response.json()
  })
  .then((data)=>{
   console.log(data.main.temp,data.name,data.sys.country,data.weather[0].icon)
   weather.city = data.name;
   weather.temp = Math.ceil(data.main.temp - KELVIN);
   weather.country = data.sys.country;
   const iconId = data.weather[0].icon;
   weather.iconUrl =`https://openweathermap.org/img/w/${iconId}.png`
   weather.description = data.weather[0].description;
  })
  .then(()=>{
   displayWeather(weather)
  })
  .catch((error)=>{
   console.log(error)
  })
}


input.addEventListener('keyup', function(event){
  if(event.key==="Enter"){
    city = input.value
    console.log(city)
    const data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city || "winnipeg"}&appid=237535420ba7973ff08b88e2d19afb48`)
                .then((response) =>{
                  return response.json()
                })
                .then((data)=>{
                  console.log(data.main.temp,data.name,data.sys.country,data.weather[0].icon)
                  weather.city = data.name;
                  weather.temp = Math.ceil(data.main.temp - KELVIN);
                  weather.country = data.sys.country;
                  const iconId = data.weather[0].icon;
                  weather.iconUrl =`https://openweathermap.org/img/w/${iconId}.png`
                  weather.description = data.weather[0].description;
                })
                .then(()=>{
                  displayWeather(weather)
                }).catch((error)=>{
                  console.log(error)
                })
  }
})
/**function to display weather info on the index page */
function displayWeather(weather){
  iconElemenet.innerHTML = `<img src="${weather.iconUrl}" />`
  tempElement.innerHTML = `${weather.temp} &#8451;`
  cityElement.innerHTML =`${weather.city}, ${weather.country}`
  descriptionElement.innerHTML = `${weather.description}`
}


console.log(weather)