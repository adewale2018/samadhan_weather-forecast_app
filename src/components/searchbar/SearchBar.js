import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ searchCity }) => {
  const [state, setState] = useState("");
  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCity(state);
  };
  return (
    <div className='container center'>
      <div className='row center'>
        <div className='col s12 center'>
          <h5>Enter City Name</h5>
          <form className='input-field center' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='E.g. Lagos, Nigeria'
              value={state}
              onChange={handleChange}
              className='white grey-text'
              required
            />
            <button className='submit waves-effect waves-light btn btn-large teal darken-5'>
              <i className='material-icons right'>send</i>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
