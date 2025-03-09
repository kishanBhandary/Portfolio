"use client"

import { useState, useEffect } from "react"
import NetflixIntro from "./components/NetflixIntro"
import BackgroundMusic from "./components/BackgroundMusic"
import MainContent from "./components/MainContent"

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Handle user interaction to enable audio
  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true)
    }
  }

  useEffect(() => {
    // Add event listeners for user interaction
    const events = ["click", "touchstart", "keydown"]
    events.forEach((event) => document.addEventListener(event, handleUserInteraction, { once: true }))

    return () => {
      events.forEach((event) => document.removeEventListener(event, handleUserInteraction))
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black" onClick={handleUserInteraction}>
      {!introComplete ? (
        <NetflixIntro name="KISHAN BHANDARY" onComplete={() => setIntroComplete(true)} />
      ) : (
        <MainContent />
      )}

      {userInteracted && (
        <BackgroundMusic introSrc="/bgmusic.mp3" mainSrc="/bgmusic.mp3" isIntroComplete={introComplete} />
      )}

      {!userInteracted && (
        <div className="fixed bottom-4 left-0 right-0 text-center text-white bg-black/80 p-2 rounded-md mx-auto max-w-xs">
          Click anywhere to enable sound
        </div>
      )}
    </main>
  )
}

export default App

