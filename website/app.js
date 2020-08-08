/* Global Variables */
const apiKey = "69cfd06582206f010a3a9023a96d64e3";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const generateBtn = document.querySelector("#generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// generateFun to start
const generateFun = async function () {
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  // check if the user entered the valid value first
  if (zipCode.length > 0 && content.length > 0) {
    // fetch weather data
    const url = `${apiUrl}${zipCode}&appid=${apiKey}`;
    let fetchWeather = await fetch(url);
    const weatherData = await fetchWeather.json();
    // check if the fetching success cod 200
    if (weatherData.cod === 200) {
      let temp = weatherData.main.temp + " °F";
      console.log(temp);
      // gather the data
      const data = {
        date: newDate,
        temp,
        content,
      };
      console.log(data);
      // post the data to server
      await postData("/postData", data);
      // update Ui
      updateUi();
    } else {
      alert(weatherData.message);
    }
  } else {
    // if the user didnt enter valid values alert
    alert("please eneter valid values");
  }
};

// postDataFun
const postData = async function (url, data) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
// getData
const getData = async function (url) {
  let response = await fetch(url);
  try {
    let data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

// updateUi
const updateUi = async function () {
  const dateDiv = document.getElementById("date");
  const tempDiv = document.getElementById("temp");
  const contentDiv = document.getElementById("content");
  // get data from server
  let finalData = await getData("/getData");
  console.log(dateDiv);
  dateDiv.innerText = finalData.date;
  tempDiv.innerText = finalData.temp;
  contentDiv.innerText = finalData.content;
};

// add the event listener
generateBtn.addEventListener("click", generateFun);
