import React from "react";

const NavBar = () => {
  return (
      <div className='navbar-fixed' >
        <nav className='teal'>
          <div className='nav-wrapper'>
              <a
                href='/'
                className='brand-logo left'
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "700",
                  marginLeft: "1rem",
                  letterSpacing: ".1rem"
                }}
              >
               <i className='fas fa-cloud-sun-rain center'></i>
                Weather Forecast
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
        </nav>
      </div>
  
  );
};

export default NavBar;
