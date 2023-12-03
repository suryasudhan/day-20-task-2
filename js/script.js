//getting required details using DOM api

let btnSearch = document.querySelector(".btn-search");
let inputSearch = document.querySelector(".input-search");
let btnRefresh = document.querySelector(".btn-refresh");
let displayContainer = document.querySelector(".display-container");
let spinner = document.querySelector(".loading");
let error = document.querySelector(".error");

// adding event listener for buttons through document for updating weather

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputSearch.value == "") {
    alert("please enter the city to search");
  } else {
    spinner.classList.add("active");
    setTimeout(() => {
      spinner.classList.remove("active");
    }, 1000);
    updateData(inputSearch.value);
    inputSearch.value = "";
    inputSearch.select();
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    if (inputSearch.value == "") {
      alert("please enter the city to search");
    } else {
      spinner.classList.add("active");
      setTimeout(() => {
        spinner.classList.remove("active");
      }, 1000);
      updateData(inputSearch.value);
      inputSearch.value = "";
    }
  }
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  error.classList.remove("active");
  if (e.target.dataset.set) {
    let city = document.querySelector(".city");
    if (city.innerText == "--") {
      alert("please enter the city to search");
    } else {
      spinner.classList.add("active");
      setTimeout(() => {
        spinner.classList.remove("active");
      }, 1000);
      updateData(city.innerText);
    }
  }
});

// creating async function for fetching from api
async function updateData(x) {
  const apiKey = "6eb1180161eccb06843669dbee0f87b3";
  let location = x;
  // 6eb1180161eccb06843669dbee0f87b3 got through online
  // 2eccac9cf0dd4165c2ae14a650b3d746 got through my mail
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == "404") {
        alert("kindly enter valid city");
      } else {
        let cityName = data.name;
        let displayTemp = data.main.temp;
        let condition = data.weather[0].main;
        let feltTemp = data.main.feels_like;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let visibility = data.visibility / 1000;
        let maxTemp = data.main.temp_max;
        let minTemp = data.main.temp_min;
        // weather input
        let cityDOM = document.querySelector(".city");
        let displayTempDOM = document.querySelector(".display-temp");
        let conditionDOM = document.querySelector(".condition");
        let feltTempDOM = document.querySelector(".feltTemp");
        let humidityDOM = document.querySelector(".humidity");
        let windDOM = document.querySelector(".wind");
        let visibilityDOM = document.querySelector(".visibility");
        let maxTempDOM = document.querySelector(".maxTemp");
        let minTempDOM = document.querySelector(".minTemp");
        cityDOM.innerText = cityName;
        displayTempDOM.innerHTML = `${displayTemp}&#x2103`;
        conditionDOM.innerText = condition;
        feltTempDOM.innerHTML = `${feltTemp}&#x2103`;
        humidityDOM.innerText = humidity;
        windDOM.innerText = `${wind} Km/h`;
        visibilityDOM.innerText = `${visibility} Km`;
        maxTempDOM.innerHTML = `${maxTemp}&#x2103`;
        minTempDOM.innerHTML = `${minTemp}&#x2103`;
        if (condition == "Haze") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center haze";
        } else if (condition == "Clouds") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center cloud";
        } else if (condition == "Clear") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center clear";
        } else if (condition == "Rain") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center rain";
        } else if (condition == "Mist") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center mist";
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// another way to update
/*
document.addEventListener("click", (e) => {
  e.preventDefault();
  error.classList.remove("active");
  let city = document.querySelector(".city");
  if (e.target.dataset.set) {
    let city = document.querySelector(".city");
    if (city.innerText == "--") {
      alert("please enter the city to search");
    } else {
      getWeatherData(city.innerText)
        .then((weatherData) => {
          spinner.classList.add("active");
          setTimeout(() => {
            spinner.classList.remove("active");
          }, 1000);
          // displayContainer.innerHTML = weatherData;
        })
        .catch((error) => {
          console.log(error);
          document.querySelector(".error").classList.add("active");
        });
    }
  }
});

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputSearch.value == "") {
    alert("please enter the city to search");
  } else {
    spinner.classList.add("active");
    setTimeout(() => {
      spinner.classList.remove("active");
    }, 1000);
    getWeatherData(inputSearch.value)
      .then((weatherData) => {
        // displayContainer.innerHTML = weatherData;
      })
      .catch((error) => {
        console.log(error);
        error.classList.add("active");
      });
  }
});

async function getWeatherData(location) {
  const apiKey = "6eb1180161eccb06843669dbee0f87b3";
  // 6eb1180161eccb06843669dbee0f87b3 got through online
  // 2eccac9cf0dd4165c2ae14a650b3d746 got through my mail
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == "404") {
        alert("kindly enter valid city");
      } else {
        let cityName = data.name;
        let displayTemp = data.main.temp;
        let condition = data.weather[0].main;
        let feltTemp = data.main.feels_like;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let visibility = data.visibility / 1000;
        let maxTemp = data.main.temp_max;
        let minTemp = data.main.temp_min;
        // weather input
        let cityDOM = document.querySelector(".city");
        let displayTempDOM = document.querySelector(".display-temp");
        let conditionDOM = document.querySelector(".condition");
        let feltTempDOM = document.querySelector(".feltTemp");
        let humidityDOM = document.querySelector(".humidity");
        let windDOM = document.querySelector(".wind");
        let visibilityDOM = document.querySelector(".visibility");
        let maxTempDOM = document.querySelector(".maxTemp");
        let minTempDOM = document.querySelector(".minTemp");
        cityDOM.innerText = cityName;
        displayTempDOM.innerHTML = `${displayTemp}&#x2103`;
        conditionDOM.innerText = condition;
        feltTempDOM.innerHTML = `${feltTemp}&#x2103`;
        humidityDOM.innerText = humidity;
        windDOM.innerText = `${wind} Km/h`;
        visibilityDOM.innerText = `${visibility} Km`;
        maxTempDOM.innerHTML = `${maxTemp}&#x2103`;
        minTempDOM.innerHTML = `${minTemp}&#x2103`;

        //   let htmlData = `<div class="row d-flex justify-content-evenly mt-3 ">
        //   <div class="col-4 bg-dark-subtle text-center rounded-3">
        //     <div class="col-12 display-6 p-1 fs-5 city">${cityName}</div>
        //     <div class="col-12 display-3 p-1 display-temp">${displayTemp}&#x2103</div>
        //     <div class="col-12 display-6 fs-5 p-1 condition">${condition}</div>
        //     <div class="col-12 p-1">
        //       <button class="btn btn-outline-dark btn-refresh" data-set='refresh'>
        //         <i class="fa-solid fa-arrows-rotate" data-set='refresh'></i>
        //       </button>
        //     </div>
        //   </div>
        //   <div class="col-7 bg-dark-subtle text-center rounded-3 p-2">
        //     <div
        //       class="container-fluid d-flex align-items-center justify-content-between"
        //       style="height: 100%;"
        //     >
        //       <div class="col p-3">
        //         <div class="display-6 fs-6 p-1">Felt Temp.</div>
        //         <div class="display-6 fs-6 p-1">Humidity</div>
        //         <div class="display-6 fs-6 p-1">Wind</div>
        //         <div class="display-6 fs-6 p-1">Visibilty</div>
        //         <div class="display-6 fs-6 p-1">Max Temp.</div>
        //         <div class="display-6 fs-6 p-1">Min Temp.</div>
        //       </div>
        //       <div class="col bg-primary rounded-3 p-3">
        //         <div class="display-6 fs-6 p-1 feltTemp">${feltTemp}&#x2103</div>
        //         <div class="display-6 fs-6 p-1 humidity">${humidity} %</div>
        //         <div class="display-6 fs-6 p-1 wind">${wind} Km/h</div>
        //         <div class="display-6 fs-6 p-1 visibility">${visibility} Km</div>
        //         <div class="display-6 fs-6 p-1 maxTemp">${maxTemp}&#x2103</div>
        //         <div class="display-6 fs-6 p-1 minTemp">${minTemp}&#x2103</div>
        //       </div>
        //     </div>
        //   </div>
        // </div>`;

        // return htmlData;
      }
    });
}
*/
