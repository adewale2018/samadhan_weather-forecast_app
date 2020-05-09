import React from "react";

const NavBar = () => {
  return (
      <div className='navbar-fixed' >
        <nav className='teal' style={{borderBottom: ".2rem solid #fff"}}>
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
                <sup>
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
                </sup>
              </a>

              <ul className='right hide-on-med-and-down'>
                <li>
                  <a
                    href='https://github.com/adewale2018/samadhan_weather-forecast_app'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Check on GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
  
  );
};

export default NavBar;
