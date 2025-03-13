/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useRef, useState } from "react"

export default function BackgroundMusic({ introSrc, mainSrc, isIntroComplete }) {
  const introAudioRef = useRef(null)
  const mainAudioRef = useRef(null)
  const [introEnded, setIntroEnded] = useState(false)

  useEffect(() => {
    const playIntroMusic = async () => {
      if (introAudioRef.current) {
        try {
          introAudioRef.current.volume = 0.7
          await introAudioRef.current.play()
        } catch (error) {
          console.log("Autoplay blocked. User interaction needed.", error)
        }
      }
    }

    playIntroMusic()
  }, [])

  useEffect(() => {
    // When intro is complete, fade out intro music and start main music
    if (isIntroComplete && !introEnded) {
      const fadeOutIntro = () => {
        if (introAudioRef.current && introAudioRef.current.volume > 0.1) {
          introAudioRef.current.volume -= 0.1
          setTimeout(fadeOutIntro, 100)
        } else if (introAudioRef.current) {
          introAudioRef.current.pause()
          setIntroEnded(true)

          // Start main music
          if (mainAudioRef.current) {
            mainAudioRef.current.volume = 0
            mainAudioRef.current.play()
            fadeInMain()
          }
        }
      }

      const fadeInMain = () => {
        if (mainAudioRef.current && mainAudioRef.current.volume < 0.7) {
          mainAudioRef.current.volume += 0.1
          setTimeout(fadeInMain, 100)
        }
      }

      fadeOutIntro()
    }
  }, [isIntroComplete, introEnded])

  return (
    <>
      <audio ref={introAudioRef} loop={!isIntroComplete}>
        <source src={"./intro.mp3"} type="audio/mp3" />
      </audio>
      <audio ref={mainAudioRef} loop>
        <source src={"./bgmusic.mp3"} type="audio/mp3" />
      </audio>
    </>
  )
}

