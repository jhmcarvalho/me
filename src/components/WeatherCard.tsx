import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";

const WeatherCard = ({ section }) => {
  const latitude = -24.7199;
  const longitude = -53.7433;
  const apiKey = "265899120e6bcf38fbc50a861d00bf33";
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

  const { data: weatherData } = useSWR(weatherAPIUrl, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const temperature = weatherData ? Math.round(weatherData.main.temp) : null;

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
      className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm relative weather-card flex-1 min-h-[150px]"
    >
      <div className="absolute inset-0 bg-black/5 dark:bg-white/5 pointer-events-none" />
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
            Toledo, PR
          </h2>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-gray-900 dark:text-gray-100 text-4xl font-bold">
              {temperature !== null ? `${temperature}°` : "--"}
            </span>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
          OpenWeatherMap
        </div>
      </div>
    </motion.div>
  );
};


export default WeatherCard;
