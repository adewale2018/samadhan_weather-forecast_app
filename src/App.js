import React from "react";
import WeatherApp from './components/weather_app/WeatherApp';
import NavBar from './components/navbar/NavBar';
function App() {
  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <main>
        <section
          id='searchBar'
          className='section section-search darken-1 white-text center'
        >
          <WeatherApp />
        </section>
      </main>
    </div>
  );
}

export default App;
