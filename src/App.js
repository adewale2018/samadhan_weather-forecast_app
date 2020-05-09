import React from "react";
import NavBar from "./components/navbar/NavBar";
import SearchBar from "./components/searchbar/SearchBar";

function App() {
  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <main>
        <section
          id='searchBar'
          className='section section-search teal darken-1 white-text center'
        >
          <SearchBar />
        </section>
      </main>
    </div>
  );
}

export default App;
