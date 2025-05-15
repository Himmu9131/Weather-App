/**let btn=document.getElementById("button");
let apiUrl="https://official-joke-api.appspot.com/random_joke";
btn.addEventListener('click',()=>{
    const res=fetch(apiUrl).then((res)=>{
      console.log(res);
      return res.json();
    }).then((res)=>{
      document.getElementById("para").innerText = `${res.setup}-${res.punchline}`;
      
    }).catch((error)=>{
      console.log(error);
    });
});**/



let cityName=document.getElementById("city_name");
let curTemp=document.getElementById("cur_temp");
let icon=document.getElementById("icon");
let weatherCond=document.getElementById("weather_cond");
let date=document.getElementById("todate");
let btn=document.querySelector(".btn");


const getWeatherData=async ()=>{
  const city=document.querySelector("#input_city").value.trim();
  if(!city){
alert("Plz enter city ..!!");
}

  const weatherURL=`https://api.weatherapi.com/v1/current.json?key=bab6249f1c66483c8d9182207251204&q=${city}&aqi=no`;
 const forecastURL=`https://api.weatherapi.com/v1/forecast.json?key=bab6249f1c66483c8d9182207251204&q=${city}&days=3&aqi=no&alerts=no`; 
  try{
    const res=await fetch(weatherURL);
     const data=await res.json();
    const {
      location,
      current: {
        temp_c,
        feelslike_c,
        condition: { text, icon }
      }
    } = data;
    cityName.innerText=`${location.name},${location.country}`;
    curTemp.textContent=`${temp_c}°C`;
    icon.innerHTML=`<img src="https:${icon}" alt="${text}" />`;
    weatherCond.textContent=`${text}`;
    const dateObj = new Date(location.localtime);

// Now map day/month to readable format
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dayName = days[dateObj.getDay()];
const monthName = months[dateObj.getMonth()];
const dateNum = dateObj.getDate();

date.textContent = `${dayName}, ${monthName} ${dateNum}`;

    }catch(error){
    console.log(error);
  }
  try {
    const res = await fetch(forecastURL);
    const data = await res.json();
    const forecastDays = data.forecast.forecastday;
  
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; // Clear previous content
  
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    forecastDays.slice(1).forEach((day) => {
      const dateObj = new Date(day.date);
      const dayName = days[dateObj.getDay()];
      const { maxtemp_c, mintemp_c, condition } = day.day;
      console.log(`Forecast for ${day.date}: Max ${maxtemp_c}, Min ${mintemp_c}`);

      forecastContainer.innerHTML += `
        <div class="col-6 col-md-2 forecast-card">
          <p><strong>${dayName}</strong></p>
          <p><img src="https:${condition.icon}" alt="${condition.text}" /></p>
          <p>${maxtemp_c}°C / ${mintemp_c}°C</p>
        </div>`;
    });
  
  } catch (error) {
    console.log("Error fetching forecast:", error);
  }
}
  
document.body.addEventListener("load",getWeatherData());
btn.addEventListener('click',getWeatherData);