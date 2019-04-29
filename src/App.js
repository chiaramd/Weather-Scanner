// Importing components from relative path
import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";

// API Key to be able to use the OpenWeatherMap API
const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends React.Component {

  // Initialize state to undefined for all relevant data points
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    windspeed: undefined,
    currentTime: undefined,
    error: undefined,
    sunrise: undefined,
    sunset: undefined,
    timeOfDay: undefined
  }

  // getWeather is a method we'll use to make the API call
  // It is passed in as the loadWeather prop to Form component in the render function below
  // Use async keyword to specify it's an asynchronous function in response to an event e
  getWeather = async (e) => {
    // Store city and country values based on current value in form
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    // fetch keyword for API call, await to show it's asynchronous,
    // URL defined at https://openweathermap.org/current
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${Api_Key}`);
    // response stored as json in `response` variable
    const response = await api_call.json();
    console.log(response);
    if(city && country){
      const now = response.dt;
      const sunrise = response.sys.sunrise;
      const sunset = response.sys.sunset;
      var time = "It's nighttime!";
      if(now > sunrise && now < sunset){
        time = "It's daytime!";
      }

      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        windspeed: response.wind.speed,
        description: response.weather[0].description,
        currentTime: now,
        error: "",
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset,
        timeOfDay: time
      })
      //if(this.currentTime > this.sunrise && this.currentTime < this.sunset){
        //this.setState({
            //timeOfDay: "It's daytime!"
        //})
      //}else {
          //this.setState({
            //if(this.currentTime > this.sunrise && this.currentTime < this.sunset){
              //timeOfDay: "It's nighttime!"
          //  }

          //})
      //}
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  // Render function updates view whenever the state changes
  // Components that were imported (Titles, Weather, Form) are called below as HTML tags,
  //   with props as attributes associated with that component
  // Within the tag, props can be passed in to populate the component with the syntax
  //   <componentName prop={value}>
  // Look at the component definitions within the imported files (lines 2-5)
  //   to see how the props populate each component!
  render() {

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    windspeed={this.state.windspeed}
                    error={this.state.error}
                    now={this.state.currentTime}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    timeOfDay={this.state.timeOfDay}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
// App is exported as a component which allows it to be imported by another file
export default App
