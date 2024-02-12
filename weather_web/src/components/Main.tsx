import axios, { AxiosResponse } from "axios";
import { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import CurrentDate from "./CurrentDate";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
}

const Main = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [location, setLocation] = useState<string>("");
  const [result, setResult] = useState<WeatherData | undefined>(undefined);

  const searchWeather = async () => {
    try {
      const { data }: AxiosResponse<WeatherData> = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`,
      });
      setResult(data);
    } catch (err) {
      alert("일치하는 도시가 없습니다.");
    }
  };

  const handleSearch = (
    e:
      | KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      (e as KeyboardEvent<HTMLInputElement>).key === "Enter" ||
      (e as React.MouseEvent<HTMLButtonElement, MouseEvent>).type === "click"
    ) {
      searchWeather();
    }
  };

  const convertToCelsius = (kelvinTemp: number): number => {
    return kelvinTemp - 273.15;
  };

  return (
    <AppWrap>
      <CurrentDate />
      <div className="appContentWrap">
        <input
          type="text"
          placeholder="도시를 입력해주세요."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={handleSearch}>확인</button>
        {result !== undefined && (
          <ResultWrap>
            <div className="city">{result.name}</div>
            <div className="temp">
              현재 날씨: {Math.floor(convertToCelsius(result.main.temp))}°C
            </div>
            <div className="sky">Weather: {result.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
};

export default Main;

const AppWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  .appContentWrap {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 24px;
    border-radius: 10px;
  }
  button {
    width: 100%;
    border: none;
    outline: none;
    background: linear-gradient(to left, #eb5757, #000000);
    color: #fff;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
  }
`;

const ResultWrap = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  .city {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .temp,
  .sky {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;
