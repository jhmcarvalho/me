import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

const WeatherCard = ({ section }) => {
  const latitude = -24.7199;
  const longitude = -53.7433;
  const apiKey = "265899120e6bcf38fbc50a861d00bf33"; // Substitua pelo seu próprio API Key

  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=pt_br`; // Defina lang=pt_br para obter resultados em português

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get(weatherAPIUrl).then((response) => {
      setWeatherData(response.data);
    });
  }, [weatherAPIUrl]);

  const temperature = useMemo(() => {
    if (!weatherData) return null;

    const temperatureKelvin = weatherData.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;

    return temperatureCelsius.toFixed(0);
  }, [weatherData]);

  const weatherDescription = useMemo(() => {
    if (!weatherData) return null;

    return weatherData.weather[0].description;
  }, [weatherData]);

  return (
    <motion.div
      whileHover="groupHover"
      variants={{
        groupHover: {
          scale: 1.01,
          transition: {
            duration: 0.1,
            ease: "easeInOut",
          },
        },
      }}
      animate={{
        opacity: section && ["all", "about"].includes(section) ? 1 : 0.3,
      }}
      className={`text-white rounded-lg p-4 mx-4 my-4 dark:bg-gray-900 hover:bg-blue-900 transition-colors cursor-pointer weather-card`}
    >
      <div>
        <h2 className="text-2xl font-bold font-23">Clima atual - Toledo/PR</h2>
        {temperature && (
          <p className="text-xl mt-2 font-semibold">
            <span className="font-23">Temperatura:</span>
            <br></br>
            <br></br>
            <span className="font-85 ml-2">{temperature}°C</span>
          </p>
        )}
        {weatherDescription && (
          <p className="text-xl mt-2 font-semibold">
            <span className="font-23">Clima:</span>
            <span className="font-23 ml-2">{weatherDescription}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default WeatherCard;
