import { render, screen } from '@testing-library/react';
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
  beforeEach(() => jest.clearAllMocks());

  it("should first render loader", async () => {
    render(
      <BrowserRouter>
        <Weather />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should call api", async () => {
    const mockedResponse = {
      location: {
        name: "Recife",
        region: "Pernambuco",
        country: "Brazil",
        lat: -8.05,
        lon: -34.9,
        tz_id: "America/Noronha",
        localtime_epoch: 1644014858,
        localtime: "2022-02-04 20:47"
      },
      current: {
        temp_c: 24,
        condtion: {
          text: "Clear"
        }
      },
    };
    MockedAxios.get.mockResolvedValue({ data: mockedResponse });
    const res = await axios.get("Recife");
    
    expect(axios.get).toHaveBeenCalled();
    expect(res.data.location.name).toEqual("Recife")
  });

  it('should render MainTemperature Component', async () => {
    render(
      <MainTemperature
        currentTemp={24}
        maxTemp={34}
        minTemp={20}
        theme="sunny"
      />
    );
    expect(screen.getByTestId('currentTemperature').innerHTML).toEqual('24');
    expect(screen.getByTestId('maxTemperature').innerHTML).toEqual('34');
    expect(screen.getByTestId('minTemperature').innerHTML).toEqual('20');
  });
});
