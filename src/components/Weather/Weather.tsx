import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import "./Weather.css";
import { OPEN_WEATHER_API_KEY } from "../../helpers/openweather";

const key: string = OPEN_WEATHER_API_KEY;
if (key === undefined) {
  throw new Error(
    "No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY"
  );
}

const keyQuery = `appid=${key}`;

export const Weather = () => {
  const [temp, setTemp] = useState();
  const [hum, setHum] = useState();
  const [clouds, setClouds] = useState();
  const [city, setCity] = useState();
  const [wind, setWind] = useState();
  const [url, setUrl] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&${keyQuery}`
        )
        .then((data) => {
          setCity(data.data.name);
          setTemp(data.data.main.temp);
          setHum(data.data.main.humidity);
          setClouds(data.data.weather[0].main);
          setWind(data.data.wind.speed);

          const url = `http://openweathermap.org/img/w/${data.data.weather[0].icon}.png`;
          setUrl(url);
        });
    });
  });

  return (
    <>
      <div className="footer">
        <Grid
          container
          spacing={0}
          style={{
            margin: "auto",
            width: "300px",
            textAlign: "center",
          }}
        >
          <Grid item xs={12} style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: ".8rem", textAlign: "left" }}>
              localization: {city}
            </span>
          </Grid>
          <Grid item xs={3}>
            <div>
              <p
                style={{
                  fontSize: ".6rem",
                }}
              >
                <img src={url} width="35" height="35"></img>

                {clouds}
              </p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <p>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="2em"
                  width="2em"
                >
                  <path d="M13 15.28V5.5a1 1 0 00-2 0v9.78A2 2 0 0010 17a2 2 0 004 0 2 2 0 00-1-1.72zM16.5 13V5.5a4.5 4.5 0 00-9 0V13a6 6 0 003.21 9.83A7 7 0 0012 23a6 6 0 004.5-10zm-2 7.07a4 4 0 01-6.42-2.2 4 4 0 011.1-3.76 1 1 0 00.3-.71V5.5a2.5 2.5 0 015 0v7.94a1 1 0 00.3.71 4 4 0 01-.28 6z" />
                </svg>
              </p>
              <p
                style={{
                  fontSize: ".6rem",
                }}
              >
                {temp} &deg;C
              </p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <p>
                <svg
                  viewBox="0 0 30 30"
                  fill="currentColor"
                  height="2em"
                  width="2em"
                >
                  <path d="M7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86-.39.91-.91 1.7-1.57 2.36-.66.66-1.45 1.19-2.37 1.58-.92.39-1.89.59-2.91.59-1 0-1.95-.19-2.86-.57-.91-.38-1.7-.89-2.36-1.55-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93zm2.26-2.93c0 .83.17 1.49.52 1.99.35.49.88.74 1.59.74.72 0 1.25-.25 1.61-.74.35-.49.53-1.15.54-1.99-.01-.84-.19-1.5-.54-2-.35-.49-.89-.74-1.61-.74-.71 0-1.24.25-1.59.74-.35.5-.52 1.16-.52 2zm1.57 0v-.35c0-.08.01-.19.02-.33s.02-.25.05-.32.05-.16.09-.24c.04-.08.09-.15.15-.18.07-.04.14-.06.23-.06.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06a.335.335 0 01-.15-.18c-.04-.08-.07-.17-.09-.24-.02-.08-.04-.19-.05-.32-.01-.14-.02-.25-.02-.32v-.34zm.59 7.75h1.32l4.99-10.74h-1.35l-4.96 10.74zm4.3-2.99c.01.84.2 1.5.55 2 .35.49.89.74 1.6.74.72 0 1.25-.25 1.6-.74.35-.49.52-1.16.53-2-.01-.84-.18-1.5-.53-1.99-.35-.49-.88-.74-1.6-.74-.71 0-1.25.25-1.6.74-.36.49-.54 1.15-.55 1.99zm1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45.09-.3.17-.38.19-.12.33-.12c.09 0 .17.02.24.06.07.04.12.1.16.19.04.09.07.17.1.24s.04.18.05.32l.01.32v.69l-.01.32-.05.32-.1.24-.16.19-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53z" />
                </svg>
              </p>
              <p
                style={{
                  fontSize: ".6rem",
                }}
              >
                {hum}%
              </p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <p>
                <svg
                  viewBox="0 0 30 30"
                  fill="currentColor"
                  height="2em"
                  width="2em"
                >
                  <path d="M1.48 21.1c0 .24.09.44.27.6.17.17.37.25.61.25h5.88c.26 0 .48.09.68.28a.932.932 0 010 1.37c-.2.19-.42.29-.68.29-.26 0-.48-.1-.68-.3a.888.888 0 00-.61-.24c-.24 0-.44.08-.6.24-.16.16-.24.36-.24.6s.08.44.24.6c.53.53 1.16.8 1.89.8.74 0 1.37-.26 1.88-.78s.78-1.15.78-1.89-.26-1.37-.78-1.89c-.52-.52-1.15-.78-1.88-.78H2.36a.86.86 0 00-.62.25c-.17.17-.26.37-.26.6zm0-3.01c0 .23.09.42.27.58.16.16.37.24.61.24h10.97c.74 0 1.37-.26 1.89-.78.52-.52.78-1.15.78-1.89s-.26-1.36-.78-1.88c-.52-.51-1.15-.77-1.89-.77-.76 0-1.38.25-1.88.76-.16.16-.23.37-.23.61s.08.44.23.6c.15.15.35.23.6.23.24 0 .44-.08.62-.23.19-.19.41-.28.68-.28s.49.09.68.28.29.42.29.68c0 .27-.1.5-.29.69-.19.19-.42.29-.68.29H2.36a.87.87 0 00-.62.26c-.17.18-.26.38-.26.61zm5.79-6.54c0-.24.09-.44.26-.62.18-.16.38-.24.6-.24h2.03c.23 0 .42.08.58.25.16.17.23.37.23.61s-.08.44-.23.6c-.16.17-.35.25-.58.25H8.13c-.24 0-.44-.08-.61-.25a.816.816 0 01-.25-.6zm2.85-6.92c0-.23.08-.43.23-.61a.98.98 0 01.64-.24c.22 0 .42.08.59.24l1.43 1.47c.16.15.24.35.24.59s-.08.44-.24.6-.36.24-.59.24c-.24 0-.44-.08-.59-.24l-1.47-1.43a.86.86 0 01-.24-.62zm2.56 6.8v-.07c.02-.91.27-1.75.74-2.53A5.29 5.29 0 0115.32 7a5.11 5.11 0 012.57-.67c.7 0 1.37.14 2.02.42.64.28 1.2.65 1.66 1.12.47.47.84 1.02 1.11 1.66s.41 1.32.41 2.02c0 .94-.23 1.8-.69 2.6s-1.09 1.43-1.88 1.89a5.1 5.1 0 01-2.6.71h-.21c-.07 0-.13-.02-.17-.07a.241.241 0 01-.07-.18v-1.22c0-.13.07-.2.22-.2h.24c.96-.01 1.79-.35 2.47-1.05.68-.69 1.03-1.52 1.03-2.49 0-.96-.35-1.78-1.04-2.47-.69-.68-1.52-1.02-2.5-1.02-.94 0-1.76.32-2.44.98-.68.65-1.04 1.44-1.08 2.37 0 .06-.03.11-.08.17s-.14.09-.26.09H12.9c-.15.01-.22-.07-.22-.23zm4.35 9.88v-1.99c0-.24.08-.44.25-.6s.37-.24.6-.24a.821.821 0 01.85.84v1.99c0 .24-.08.45-.25.62-.17.17-.37.25-.6.25-.24 0-.44-.08-.6-.25a.886.886 0 01-.25-.62zm0-17.48V1.78c0-.23.08-.43.25-.6s.37-.25.6-.25c.24 0 .44.08.6.25s.25.37.25.6v2.04c0 .23-.08.42-.25.58-.17.15-.37.23-.6.23-.24 0-.44-.08-.6-.23a.756.756 0 01-.25-.57zm5.53 13.18c0-.23.08-.42.23-.56a.74.74 0 01.57-.23c.24 0 .44.08.6.23l1.45 1.42c.16.17.24.38.24.61 0 .23-.08.43-.24.59-.4.31-.8.31-1.2 0l-1.42-1.43c-.16-.16-.23-.38-.23-.63zm0-10.93c0-.25.08-.45.23-.59l1.42-1.47c.18-.16.37-.24.59-.24.23 0 .43.08.6.25.17.17.25.37.25.6 0 .25-.08.46-.24.62l-1.45 1.43c-.18.16-.38.24-.6.24-.23 0-.41-.08-.57-.24a.806.806 0 01-.23-.6zm2.26 5.47c0-.24.08-.44.24-.62.16-.16.35-.24.57-.24h2.02c.23 0 .43.09.61.26s.26.37.26.6c0 .23-.09.43-.26.6-.18.17-.38.25-.61.25h-2.02c-.23 0-.42-.08-.58-.25a.806.806 0 01-.23-.6z" />
                </svg>
              </p>
              <p
                style={{
                  fontSize: ".6rem",
                }}
              >
                {wind} m/sec
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Weather;
