import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { Home } from '../pages/Home';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Weather } from '../pages/Weather';

describe('Home page test', () => {
  let history: MemoryHistory;
  beforeAll(() => {
    history = createMemoryHistory();
  });

  test('Renders Home title', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    );

    const title = screen.getByText('WEATHER');
    expect(title).toBeInTheDocument();
  });

  it('should navigate to weather page', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    );

    userEvent.click(screen.getByRole('link', { name: /dallol/i }));
    expect(history.location.pathname).toEqual('/weather/dallol');
  });
});

describe('Weather page test', () => {
  let history: MemoryHistory;
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('shoudl render city name', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Weather />
      </Router>
    );

    screen.getByRole('');
  });
});
