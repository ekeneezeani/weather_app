let api = `https://api.openweathermap.org/data/2.5/weather?q=winnipeg&appid=237535420ba7973ff08b88e2d19afb48`

const input  = document.getElementById("city");
let city = "";

const form = document.getElementById("input-form")

form.addEventListener('submit',function(event){
  event.preventDefault()
})


input.addEventListener('keyup', function(event){
  if(event.key==="Enter"){
    city = input.value
    console.log(city)
    const data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city || "winnipeg"}&appid=237535420ba7973ff08b88e2d19afb48`)
            .then((response) =>{
              return response.json()
            }).then((data)=>{
              console.log(data.main.temp)
            }).catch((error)=>{
              console.log(error)
            })
  }
})

