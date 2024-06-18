window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    if (properties.sceneMargin) {
      positionDateContainer(properties.sceneMargin.value);
      positionWeatherContainer(properties.sceneMargin.value);
      updateSceneMargin(properties.sceneMargin.value);
    }
    if (properties.sceneAnimation) {
      enableAnimation(properties.sceneAnimation.value);
    }
    if (properties.sceneColor) {
      dateContainer.style.color = properties.sceneColor.value;
      weatherContainer.style.color = properties.sceneColor.value;
      weatherIcon.setAttribute("style","fill:"+properties.sceneColor.value);
    }
    if (properties.sceneAdjustWeather) {
      root.adjustSceneToWeather = properties.sceneAdjustWeather.value;
      if (!properties.sceneAdjustWeather.value) {
        document.getElementById("sceneS1").style.visibility = 'visible';
        document.getElementById("sceneS2").style.visibility = 'visible';
      } else 
        showWeather(root.weatherData);
    }
    if (properties.weatherShow) {
      root.showWeather = properties.weatherShow.value;
      weatherContainer.style.visibility = properties.weatherShow.value ? "visible" : "hidden";
      if (root.showWeather) reDrawWeatherScene();
    }
    if (properties.weatherAddressInput) {
      root.apiData.address = properties.weatherAddressInput.value;
    }
    if (properties.weatherApiInput) {
      root.apiData.apiKey = properties.weatherApiInput.value;
    }
    if (properties.weathermapApiInput) {
      root.apiData.mapapiKey = properties.weathermapApiInput.value;
    }
    if (properties.weathertempUnitInput) {
      root.apiData.tempUnit = properties.weathertempUnitInput.value;
    }
    if (properties.weatherRefreshFreq) {
      root.weatherRefreshRate = properties.weatherRefreshFreq.value;
      clearInterval(weatherInterval);
      getWeather();
      weatherInterval = setInterval(getWeather, root.weatherRefreshRate*60*1000);
    }
    if (properties.miscHour12) {
      root.hour12 = properties.miscHour12.value;
      drawDate();
    }
    if (properties.miscLanguage) {
      root.locale = languages[properties.miscLanguage.value];
      drawDate();
      getWeather();
    }
    if (properties.miscSunrise) {
      root.defaultSunrise = properties.miscSunrise.value;
      // Re-set default values of weather (when api is not used)
      if (root.apiData.address === "" || root.apiData.address === "132 My Street, Kingston, New York 12401 or US 12401" || root.apiData.mapapiKey === "" || root.apiData.mapapiKey === "mapbox.com key" || root.apiData.apiKey === "" || root.apiData.apiKey === "openweathermap.org key") {
        reDrawWeatherScene();
      }
    }
    if (properties.miscSunset) {
      root.defaultSunset = properties.miscSunset.value;
      // Re-set default values of weather (when api is not used)
      if (root.apiData.address === "" || root.apiData.address === "132 My Street, Kingston, New York 12401 or US 12401" || root.apiData.mapapiKey === "" || root.apiData.mapapiKey === "mapbox.com key" || root.apiData.apiKey === "" || root.apiData.apiKey === "openweathermap.org key") {
        reDrawWeatherScene();
      }
    }
  },
};

function reDrawWeatherScene(){
  getWeather();
  drawScene();
}