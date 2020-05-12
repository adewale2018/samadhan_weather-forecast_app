import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [state, setState] = useState("");
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div className='container center'>
      <div className='row center'>
        <div className='col s12 center'>
          <h5>Enter City Name</h5>
          <form className='input-field center'>
            <input
              type='text'
              placeholder='E.g. Lagos, Nigeria'
              value={state}
              onChange={handleChange}
              className='white grey-text'
            />
            <button className='submit waves-effect waves-light btn btn-large teal lighten-5'>
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
