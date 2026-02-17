import Link from "next/link";
import SocialIcon from "./SocialIcon";
import { useTheme } from 'next-themes';

function Social() {
  const { resolvedTheme } = useTheme();

  // Defina os ícones e URLs sociais em uma matriz
  const socialItems = [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jeferson-carvalho-b4b060233/', darkIcon: '/icons/linkedinIconDark.png', lightIcon: '/icons/linkedinIconLight.png' },
    { platform: 'Instagram', url: 'https://instagram.com/jhmcarvalho/', darkIcon: '/icons/instagramIconDark.png', lightIcon: '/icons/instagramIconLight.png' },
    { platform: 'GitHub', url: 'https://github.com/jhmcarvalho/', darkIcon: '/icons/gitIconDark.png', lightIcon: '/icons/gitIconLight.png' },
    { platform: 'Spotify', url: 'https://open.spotify.com/user/12182792554', darkIcon: '/icons/spotifyIconDark.png', lightIcon: '/icons/spotifyIconLight.png' },
  ];

  return (
    <div>
      {socialItems.map((item, index) => (
        <Link key={index} href={item.url}>
          <a>
            <SocialIcon
              src={resolvedTheme === 'dark' ? item.darkIcon : item.lightIcon}
              alt={`${item.platform} Icon`}
              width={125}
              height={125}
            />
          </a>
        </Link>
      ))}
    </div>
  );
}

export default Social;
