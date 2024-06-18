function livelyPropertyListener(name, val) {
  switch(name) {
    case "sceneMargin":
      positionDateContainer(-val);
      positionWeatherContainer(-val);
      updateSceneMargin(-val);
      break;
    case "sceneAnimation":
      enableAnimation(val);
      break;
    case "sceneColor":
      dateContainer.style.color = val;
      weatherContainer.style.color = val;
      weatherIcon.setAttribute("style","fill:"+val);
      break;
    case "sceneAdjustWeather":
      root.adjustSceneToWeather = val;
      if (!val) {
        document.getElementById("sceneS1").style.visibility = 'visible';
        document.getElementById("sceneS2").style.visibility = 'visible';
      } else 
        showWeather(root.weatherData);
      break;
    case "weatherShow":
      root.showWeather = val;
      weatherContainer.style.visibility = val ? "visible" : "hidden";
      break;
    case "weatherAddressInput":
      root.apiData.address = val;
      break;    
    case "weatherApiInput":
      root.apiData.apiKey = val;
      break;
    case "weathermapApiInput":
      root.apiData.mapapiKey = val;
      break;
    case "weathertempUnitInput":
      root.apiData.tempUnit = val;
      break;
    case "weatherRefreshFreq":
      root.weatherRefreshRate = val;
      clearInterval(weatherInterval);
      getWeather();
      weatherInterval = setInterval(getWeather, root.weatherRefreshRate*60*1000);
      break;
    case "weatherBtnRefresh":
      // update weather and redraw scene
      reDrawWeatherScene();
      break;
    case "miscHour12":
      // set hour format
      root.hour12 = val;
      drawDate();
      break;
    case "miscLanguage":
      root.locale = languages[val];
      drawDate();
      getWeather();
      break;
    case "miscSunrise":
      root.defaultSunrise = val;
      // Re-set default values of weather (when api is not used)
      if (root.apiData.address === "" || root.apiData.address === "132 My Street, Kingston, New York 12401 or US 12401" || root.apiData.mapapiKey === "" || root.apiData.mapapiKey === "mapbox.com key" || root.apiData.apiKey === "" || root.apiData.apiKey === "openweathermap.org key") {
        reDrawWeatherScene();
      }
      break;
    case "miscSunset":
      root.defaultSunset = val;
      // Re-set default values of weather (when api is not used)
      if (root.apiData.address === "" || root.apiData.address === "132 My Street, Kingston, New York 12401 or US 12401" || root.apiData.mapapiKey === "" || root.apiData.mapapiKey === "mapbox.com key" || root.apiData.apiKey === "" || root.apiData.apiKey === "openweathermap.org key") {
        reDrawWeatherScene();
      }
      break;
  }
}

function reDrawWeatherScene(){
  getWeather();
  drawScene();
}