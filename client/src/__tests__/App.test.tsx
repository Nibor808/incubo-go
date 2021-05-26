import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders the App', () => {
  render(<App />);
});

describe('Renders Components', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders logo image', () => {
    const logoImage = screen.getByTestId('logo-img');
    expect(logoImage).toBeInTheDocument();
  });

  test('renders portfolio article', () => {
    const portfolio = screen.getByTestId('portfolio');
    expect(portfolio).toBeInTheDocument();
  });

  test('renders github link', () => {
    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
  });

  test('renders contact article', () => {
    const contact = screen.getByTestId('contact');
    expect(contact).toBeInTheDocument();
  });

  test('renders 2020 list', () => {
    const list2020 = screen.getByTestId('2020-list');
    expect(list2020).toBeInTheDocument();
  });

  test('renders 2017 list', () => {
    const list2017 = screen.getByTestId('2017-list');
    expect(list2017).toBeInTheDocument();
  });

  test('renders 2016 list', () => {
    const list2016 = screen.getByTestId('2016-list');
    expect(list2016).toBeInTheDocument();
  });

  test('renders contact div', () => {
    const contactDiv = screen.getByTestId('contact-div');
    expect(contactDiv).toBeInTheDocument();
  });

  test('renders contact form', () => {
    const contactForm = screen.getByTestId('contact-form');
    expect(contactForm).toBeInTheDocument();
  });
});
