import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { MainTemperature } from '../components/MainTemperature';
import { Home } from '../pages/Home';
import { Weather } from '../pages/Weather';

jest.mock('axios');
const MockedAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse = {
  current: {
    temp_c: 24,
  },
};
MockedAxios.get.mockResolvedValue({ data: mockedResponse });

describe('Home page test', () => {
  let history: MemoryHistory;
  beforeAll(() => {
    history = createMemoryHistory();
  });

  test('Renders Home title', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
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
  // beforeEach(() => jest.clearAllMocks());
  // let history: MemoryHistory;
  // beforeAll(() => {

  // });

  it('should render MainTemperature Component', async () => {
    render(
      <MainTemperature
        currentTemp={24}
        maxTemp={34}
        minTemp={20}
        theme="sunny"
      />
    );
    expect(screen.getByText('24').innerHTML).toEqual('24');
  });

  // it('shoudl render city name', async () => {
  //   const history = createMemoryHistory({
  //     initialEntries: ['/weather/recife'],
  //   });
  //   render(
  //     <Router location={history.location} navigator={history}>
  //       <Weather />
  //     </Router>
  //   );

  //   screen.debug();

  // const city = history.location.pathname.split('/')[2];
  // const response = await MockedgetWeatherByCity(city);
  // expect(MockedgetWeatherByCity).toHaveBeenCalledWith(city);
  // console.log('city', city);
  // await waitFor(() => {
  //   screen.debug();
  // });
  // });
});
