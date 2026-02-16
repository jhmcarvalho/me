import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { isBefore, isAfter, parse, sub, isValid } from "date-fns";

import NightComponent from "./time-components/NightComponent";
import DayComponent from "./time-components/DayComponent";

const latitude = -24.721932;
const longitude = -53.744984;

const TimeCard = ({ section }) => {
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=-24.721932&lng=-53.744984`;

  const { data, isLoading } = useSWR(apiUrl, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const [sunriseTime, sunsetTime] = useMemo(() => {
    if (!data) return [null, null];

    // Parse the sunrise and sunset times
    const sunrise = parse(data.results.sunrise, "h:mm:ss a", new Date());
    const sunset = parse(data.results.sunset, "h:mm:ss a", new Date());

    if (!isValid(sunrise) || !isValid(sunset)) {
      return [null, null];
    }

    // Subtract 3 hours to adjust for your region
    const adjustedSunriseTime = sub(sunrise, { hours: 3 });
    const adjustedSunsetTime = sub(sunset, { hours: 3 });

    return [adjustedSunriseTime, adjustedSunsetTime];
  }, [data]);

  const timeComponent = useMemo(() => {
    if (!data) return null;

    const currentTime = new Date(); // Get the current time

    if (isBefore(currentTime, sunsetTime) && isAfter(currentTime, sunriseTime)) {
      return <DayComponent />; // It's daytime
    } else {
      return <NightComponent />; // It's nighttime
    }
  }, [data, sunriseTime, sunsetTime]);

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
      className={`text-white rounded-3xl flex relative overflow-hidden aspect-square`}
    >
      {timeComponent}
    </motion.div>
  );
};

export default TimeCard;
