import React, { useState, useEffect, useRef } from 'react';
import logo from '../styles/images/incubo_logo.png';
import linkedIn from '../styles/images/linkedin.jpg';
import { MyLink } from '../utils/my_link';

const Header = ({ toPortfolio, toContact }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [modeText, setModeText] = useState('dark');
  const topRef = useRef();

  const toTop = ev => {
    ev.preventDefault();

    setTimeout(() => {
      topRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      setModeText('light');
    } else {
      document.body.classList.remove('dark-mode');
      setModeText('dark');
    }
  }, [darkMode]);

  return (
    <header ref={topRef}>
      <nav className='navbar navbar-expand-lg fixed-top navbar-light'>
        <div className='container'>
          <img
            id='logo-img'
            data-testid='logo-img'
            src={logo}
            alt='incubo web solutions logo'
            className='img-fluid navbar-brand'
            onClick={toTop}
          />

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#content'
            aria-controls='content'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='content'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <button className='nav-link' onClick={toPortfolio}>
                  Portfolio
                </button>
              </li>
              <li className='nav-item'>
                <button className='nav-link' onClick={toContact}>
                  Contact
                </button>
              </li>
            </ul>

            <div className='linkedin'>
              <MyLink
                title={<img src={linkedIn} alt='Robin Erickson linkedIn' />}
                href='https://www.linkedin.com/in/robinerickson08/'
                klass='img-link'
              />
            </div>

            <div className='custom-control custom-switch'>
              <input
                type='checkbox'
                className='custom-control-input'
                id='dark-light-toggle'
                onClick={() => setDarkMode(!darkMode)}
              />
              <label
                className='custom-control-label mode'
                htmlFor='dark-light-toggle'
              >
                {modeText}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
