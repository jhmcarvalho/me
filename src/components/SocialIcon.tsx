import Image from "next/image";
import { useState } from "react";

function SocialIcon({ src, alt, width, height }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const imageStyle = {
    transform: hovered ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.2s",
    opacity: hovered ? 1 : 0.8, // Define a opacidade desejada quando o mouse está sobre o ícone.
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={imageStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  );
}

export default SocialIcon;