import React from "react";

const NavBar = () => {
  return (
    <div>
      <div className='navbar-fixed'>
        <nav className='teal'>
          <div className='nav-wrapper'>
            <div className='container'>
              <i className='hide-on-small-only fas fa-cloud-sun-rain'></i>
              <a
                href='/'
                className='brand-logo'
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "700",
                  marginLeft: "1rem",
                }}
              >
                Weather{" "}
                <sub>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: "100",
                      letterSpacing: ".2rem",
                    }}
                  >
                    Forecast
                  </span>
                </sub>
              </a>

              <ul className='right hide-on-med-and-down'>
                <li>
                  <a href='/'>Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
