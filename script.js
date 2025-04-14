// const wrapper = document.querySelector(".wrapper");
// const weatherResult = document.getElementById("#weatherResult");
// async function getWeather() {
//     const apiKey = "905ab7068aa7414c800112023251402";
//     const city = document.querySelector("city").value;
//     if (!city) {
//         alert("Please enter a city name.");
//         return;
//     }
// }
// const url = `https://api.weatherapi.com/v1/current.json?key=$%7BapiKey%7D&q=$%7Bcity%7D&aqi=no`;
// try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.error) {
//         alert(data.error.message);
//         return;
//     } else {
//         wrapper.innerHTML = ``;
//         const div = document.createElement("div");
//         let iconUrl = '';
//         if (data.current.condition.text === "Overcast") {
//             iconUrl = "https://cdn-icons-png.flaticon.com/512/2242/2242879.png";
//         }
//         else if (data.current.condition.text === "Sunny") {
//             iconUrl = "https://cdn-icons-png.flaticon.com/512/2108/2108730.png";
//         }
//     }
//     }
// }



const wrapper = document.getElementById("weatherResult");

async function getWeather() {
  const apiKey = "905ab7068aa7414c800112023251402";
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

    wrapper.innerHTML = ""; // Очистим старую погоду

    const div = document.createElement("div");
    const condition = data.current.condition.text;
    let iconUrl = "";

    if (condition === "Overcast") {
      iconUrl = "https://cdn-icons-png.flaticon.com/512/2242/2242879.png";
    } else if (condition === "Sunny") {
      iconUrl = "https://cdn-icons-png.flaticon.com/512/2108/2108730.png";
    } else {
      iconUrl = data.current.condition.icon; // Дефолтная иконка от API
    }

    div.innerHTML = `
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <img src="${iconUrl}" alt="${condition}" width="64">
            <p><strong>${condition}</strong></p>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Feels like: ${data.current.feelslike_c}°C</p>
        `;

    wrapper.appendChild(div);
  } catch (error) {
    console.error("Something went wrong:", error);
    alert("Oops! Failed to fetch weather. Are you connected to the internet?");
  }
}

