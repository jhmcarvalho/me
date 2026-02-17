import NavBar from "@/components/NavBar";
import IntroCard from "@/components/IntroCard";
import ToggleCard from "@/components/ToggleCard";
import GitHub from "@/components/GitHub";
import DiscordCard from "@/components/DiscordCard";
import MailCard from "@/components/MailCard";
import SpotifyCard from "@/components/SpotifyCard";
import { useState } from "react";
import MapCard from "@/components/MapCard";
import OnlineCard from "@/components/OnlineCard";
import TimeCard from "@/components/TimeCard";
import WeatherCard from "@/components/WeatherCard";

function Home() {
  const [section, setSection] = useState("all");
  return (
    <div className="flex flex-col m-5 font-nunito">
      <NavBar setSection={setSection} />
      <div
        className="grid grid-cols-3 gap-2 md:grid-cols-3 
			md:gap-3 mt-5 custom-container mx-auto xl:px-20 transparent"
      >
        <IntroCard section={section} />
        <div className="flex flex-col gap-5"><ToggleCard section={section} />
          <WeatherCard section={section} /></div>
        <SpotifyCard section={section} />
        <MapCard section={section} />
        <OnlineCard section={section} />
        <GitHub section={section} />
        <DiscordCard section={section} />
        {/*<MailCard section={section} />*/}
        <TimeCard section={section} />
      </div>
    </div>
  );
}

export default Home;
