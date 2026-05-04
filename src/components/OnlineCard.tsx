
import { useMemo } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

// Resolve CDN URL handling animated (a_) hashes
const cdnUrl = (base: string, hash: string, ext = "png", size = 256) =>
  `${base}/${hash.startsWith("a_") ? `${hash}.gif` : `${hash}.${ext}`}?size=${size}`;

const OnlineCard = ({ section }: { section?: string }) => {
  const { data } = useSWR(`/api/online`, (url) => fetch(url).then((res) => res.json()), {
    refreshInterval: 15000,
    revalidateOnFocus: true,
  });

  const [status, statusColor, textColor] = useMemo(() => {
    if (!data) return ["Loading...", "bg-gray-400", "text-gray-500"];
    switch (data?.data?.discord_status) {
      case "online":
        return ["Online", "bg-[#23a559]", "text-[#23a559]"];
      case "idle":
        return ["Idle", "bg-[#f0b232]", "text-[#f0b232]"];
      case "dnd":
        return ["Do Not Disturb", "bg-[#f23f43]", "text-[#f23f43]"];
      case "offline":
      default:
        return ["Offline", "bg-[#80848e]", "text-[#80848e]"];
    }
  }, [data]);

  const discordUser = data?.data?.discord_user;
  const userId = discordUser?.id;

  // Avatar — supports animated avatars (a_ prefix)
  const avatarUrl = discordUser?.avatar && userId
    ? cdnUrl(`https://cdn.discordapp.com/avatars/${userId}`, discordUser.avatar, "png", 256)
    : null;

  // Banner — supports animated banners
  // const bannerUrl = discordUser?.banner && userId
  //   ? cdnUrl(`https://cdn.discordapp.com/banners/${userId}`, discordUser.banner, "png", 480)
  //   : null;

  const bannerUrl = "/images/banner.jpg";

  // Banner color fallback (Discord default blurple if nothing set)
  const bannerColor = discordUser?.banner_color ?? "#5865F2";

  // Avatar decoration overlay (Nitro feature)
  const decorationUrl = discordUser?.avatar_decoration_data?.asset
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${discordUser.avatar_decoration_data.asset}.png?size=256`
    : null;

  // Profile nameplate (clan badge / profile effect label) — shown below username
  const clanTag = discordUser?.clan?.tag ?? null;
  const clanBadge = discordUser?.clan?.badge && discordUser?.clan?.identity_guild_id
    ? `https://cdn.discordapp.com/clan-badges/${discordUser.clan.identity_guild_id}/${discordUser.clan.badge}.png?size=32`
    : null;

  const isAnimated = ["online", "idle", "dnd"].includes(data?.data?.discord_status);

  return (
    <motion.div
      animate={{
        opacity: section && ["all", "about"].includes(section) ? 1 : 0.3,
      }}
      className="group text-gray-900 dark:text-white rounded-3xl flex relative overflow-hidden aspect-square shadow-sm bg-white dark:bg-[#1E1F22] border border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      {/* ── Banner ── */}
      <div
        className="absolute top-0 w-full h-[32%] overflow-hidden transition-colors duration-300 bg-transparent"
      >
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Discord Banner"
            className="w-full h-full object-cover opacity-70"
          />
        ) : (
          /* Discord logo watermark when no banner image */
          <div className="absolute top-3 right-3 opacity-20 mix-blend-overlay pointer-events-none">
            <svg width="48" height="48" viewBox="0 0 127.14 96.36" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7 8.07001C99.7101 4.40001 91.18 1.54001 82.26 0C81.18 1.93001 79.99 4.30001 79.13 6.36001C69.74 4.96001 60.43 4.96001 51.2 6.36001C50.34 4.30001 49.11 1.92001 48.06 0C39.11 1.54001 30.6 4.40001 22.59 8.07001C6.27003 32.39 1.63001 56.09 3.86001 79.54C14.65 87.49 25.1 92.29 35.34 95.39C37.89 91.95 40.15 88.23 42.06 84.3C38.3 82.95 34.73 81.25 31.39 79.25C32.31 78.58 33.2 77.87 34.05 77.12C55.08 86.84 75.39 86.84 96.11 77.12C96.97 77.87 97.87 78.58 98.79 79.25C95.44 81.24 91.86 82.94 88.08 84.3C90.01 88.22 92.27 91.94 94.81 95.39C105.07 92.29 115.54 87.49 126.33 79.54C128.98 52.88 122.56 29.56 107.7 8.07001ZM42.19 65.04C35.43 65.04 29.85 58.8 29.85 51.14C29.85 43.48 35.21 37.24 42.19 37.24C49.27 37.24 54.73 43.59 54.63 51.14C54.63 58.8 49.16 65.04 42.19 65.04ZM88.16 65.04C81.4 65.04 75.82 58.8 75.82 51.14C75.82 43.48 81.18 37.24 88.16 37.24C95.24 37.24 100.7 43.59 100.6 51.14C100.6 58.8 95.13 65.04 88.16 65.04Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="absolute top-[22%] md:top-[20%] left-5 md:left-6 flex flex-col w-[calc(100%-2.5rem)] md:w-[calc(100%-3rem)] h-[70%]">

        {/* ── Avatar Area ── */}
        <div className="relative w-[70px] h-[70px] md:w-[84px] md:h-[84px]">
          {/* Base avatar */}
          {avatarUrl ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-full h-full rounded-full border-[5px] border-white dark:border-[#1E1F22] object-cover bg-gray-200 dark:bg-[#2B2D31] transition-colors duration-300 shadow-sm"
            />
          ) : (
            <div className="w-full h-full rounded-full border-[5px] border-white dark:border-[#1E1F22] bg-gray-200 dark:bg-[#2B2D31] transition-colors duration-300 shadow-sm animate-pulse" />
          )}

          {/* Avatar Decoration overlay (Nitro) — sits on top of avatar, scaled to bleed outside */}
          {decorationUrl && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={decorationUrl}
              alt="Avatar Decoration"
              className="absolute pointer-events-none select-none"
              style={{
                width: "160%",
                height: "160%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            />
          )}

          {/* Status Indicator */}
          <div
            className="absolute bottom-1 right-1 w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] border-white dark:border-[#1E1F22] bg-white dark:bg-[#1E1F22] flex items-center justify-center transition-colors duration-300"
            style={{ zIndex: 20 }}
          >
            <span className={`absolute w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full ${statusColor}`} />
            {isAnimated && (
              <span className={`animate-ping absolute w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full opacity-75 ${statusColor}`} />
            )}
          </div>
        </div>

        {/* ── User Info ── */}
        <div className="mt-2 md:mt-3 flex flex-col flex-1 justify-between pb-2 md:pb-4">
          <div className="flex flex-col gap-0.5">
            {/* Display name */}
            {discordUser ? (
              <span className="text-lg md:text-xl font-bold truncate tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {discordUser.display_name || discordUser.username}
              </span>
            ) : (
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            )}

            {/* Username */}
            {discordUser && (
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium truncate transition-colors duration-300">
                {discordUser.username}
              </span>
            )}

            {/* ── Clan / Nameplate Tag ── */}
            {clanTag && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full text-xs font-bold
                           bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-300
                           border border-black/10 dark:border-white/10"
              >
                {clanBadge && (
                  <img src={clanBadge} alt="Clan Badge" className="w-3.5 h-3.5 object-contain" />
                )}
                <span>{clanTag}</span>
              </motion.div>
            )}
          </div>

          {/* ── Status Box ── */}
          <div className="mt-auto p-2.5 md:p-3 bg-gray-50 dark:bg-[#2B2D31] rounded-[14px] flex items-center justify-between border border-transparent group-hover:border-black/5 dark:group-hover:border-white/5 transition-all duration-300 group-hover:shadow-sm">
            <span className="text-xs md:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Status
            </span>
            <span className={`text-sm md:text-base font-bold ${textColor}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnlineCard;
