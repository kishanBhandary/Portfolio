import React, { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log("Autoplay blocked. User interaction needed.", error);
        }
      }
    };

    playMusic();
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/bgmusic.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;
