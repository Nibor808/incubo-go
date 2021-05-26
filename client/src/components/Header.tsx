import React, { useEffect, useState } from 'react';
import logo from '../styles/images/incubo_logo.png';
import linkedIn from '../styles/images/linkedin.jpg';
import { MyLink } from './MyLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

type HeaderProps = {
  toPortfolio: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  toContact: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  toTop: (ev: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

const Header = ({ toPortfolio, toContact, toTop }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [modeIcon, setModeIcon] = useState<JSX.Element>(
    <FontAwesomeIcon icon={faSun} />
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      setModeIcon(<FontAwesomeIcon icon={faSun} />);
    } else {
      document.body.classList.remove('dark-mode');
      setModeIcon(<FontAwesomeIcon icon={faMoon} />);
    }
  }, [darkMode]);

  return (
    <header>
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
            data-bs-toggle='collapse'
            data-bs-target='#content'
            aria-controls='content'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='content'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <button
                  className='nav-link'
                  onClick={toPortfolio}
                  data-testid='portfolio-link'
                >
                  Portfolio
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='nav-link'
                  onClick={toContact}
                  data-testid='contact-link'
                >
                  Contact
                </button>
              </li>
            </ul>

            <div className='d-flex ms-auto align-items-center'>
              <div className='linkedin'>
                <MyLink
                  title={<img src={linkedIn} alt='Robin Erickson linkedIn' />}
                  href='https://www.linkedin.com/in/robinerickson08/'
                  klass='img-link'
                />
              </div>

              <div className='form-check form-switch'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='dark-light-toggle'
                  data-testid='dark-light-toggle'
                  onClick={() => setDarkMode(!darkMode)}
                />
                <label
                  className='form-check-label mode-icon'
                  htmlFor='dark-light-toggle'
                >
                  {modeIcon}
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
