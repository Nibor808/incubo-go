import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import PortfolioList from './PortfolioList';
import { list2016 } from '../utils/list_2016';
import { list2017 } from '../utils/list_2017';
import { list2020 } from '../utils/list_2020';
import Modal from './Modal';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<React.MouseEvent<
    HTMLImageElement,
    MouseEvent
  > | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setLogoImg(document.getElementById('logo-img'));
  }, []);

  window.onscroll = () => {
    if (logoImg) {
      if (
        document.body.scrollTop > 30 ||
        document.documentElement.scrollTop > 30
      ) {
        logoImg.style.height = '80px';
        logoImg.style.width = '185px';
        logoImg.style.transition = '0.4s';
      } else {
        logoImg.style.height = '110px';
        logoImg.style.width = '258px';
      }
    }
  };

  const toTop = (ev: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    ev.preventDefault();

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const toPortfolio = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    setTimeout(() => {
      portfolioRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 75);
  };

  const toContact = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    setTimeout(() => {
      contactRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 75);
  };

  const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
    setIsOpen(true);
    ev.persist();
    setEvent(ev);
  };

  const showModal = (): JSX.Element | null => {
    const target = event?.target as HTMLImageElement;

    return isOpen ? (
      <span key='a1'>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          srcText={target?.dataset.text} // using dataset.text to hold path to full size image
          headerText={target?.alt}
        />
      </span>
    ) : null;
  };

  return (
    <React.Fragment>
      {showModal()},
      <Header
        key='a2'
        toContact={toContact}
        toPortfolio={toPortfolio}
        toTop={toTop}
      />
      ,
      <section key='a3' className='landing container'>
        <article className='about'>
          <div className='about-container'>
            <About />
          </div>
        </article>

        <article
          className='portfolio'
          ref={portfolioRef}
          data-testid='portfolio'
        >
          <div className='header-container'>
            <div className='row'>
              <div className='col-12'>
                <h1>Portfolio</h1>
                <a
                  href='https://github.com/Nibor808'
                  target='_blank'
                  rel='noopener noreferrer'
                  data-testid='github-link'
                >
                  github
                </a>
              </div>
            </div>
          </div>

          <div className='portfolio-container'>
            <PortfolioList
              year='2020'
              list={list2020}
              sideBarName='sidebar2020'
              handleClick={handleClick}
            />

            <PortfolioList
              year='2017'
              list={list2017}
              sideBarName='sidebar2017'
              handleClick={handleClick}
            />

            <PortfolioList
              data-testid='2016-list'
              year='2016'
              list={list2016}
              sideBarName='sidebar2016'
              handleClick={handleClick}
            />
          </div>
        </article>

        <article className='contact' ref={contactRef} data-testid='contact'>
          <div className='header-container'>
            <div className='row'>
              <div className='col-12'>
                <h1>Contact</h1>
                <p>Want to work together? Get in touch!</p>
              </div>
            </div>
          </div>

          <div className='contact-container'>
            <Contact />
          </div>
        </article>
      </section>
    </React.Fragment>
  );
};

export default App;
