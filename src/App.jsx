"use client"

import { useState, useEffect } from "react"
import NetflixIntro from "./components/NetflixIntro"
import BackgroundMusic from "./components/BackgroundMusic"
import MainContent from "./components/MainContent"
import TransitionAnimation from "./components/TransitionAnimation"
import CustomCursor from "./components/CustomCursor"

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false)
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

  // Handle intro completion
  const handleIntroComplete = () => {
    setIntroComplete(true)
    setShowTransition(true)
  }

  // Handle transition completion
  const handleTransitionComplete = () => {
    setShowTransition(false)
    setShowMainContent(true)
  }

  return (
    <>
      <CustomCursor />

      <main className="flex min-h-screen flex-col items-center justify-center bg-black" onClick={handleUserInteraction}>
        {!introComplete && <NetflixIntro name="KISHAN" onComplete={handleIntroComplete} />}

        {showTransition && <TransitionAnimation onComplete={handleTransitionComplete} />}

        {showMainContent && <MainContent />}

        {userInteracted && (
          <BackgroundMusic introSrc="/intro-music.mp3" mainSrc="/main-music.mp3" isIntroComplete={showMainContent} />
        )}

        {!userInteracted && (
          <div className="fixed bottom-4 left-0 right-0 text-center text-white bg-black/80 p-2 rounded-md mx-auto max-w-xs z-50">
            Click anywhere to enable sound
          </div>
        )}
      </main>
    </>
  )
}

export default App

