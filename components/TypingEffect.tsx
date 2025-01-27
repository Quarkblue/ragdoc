'use client'
import { useEffect, useState } from 'react'

interface TypingEffectProps {
  textArray: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
}

const TypingEffect = ({
  textArray,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
  className = '',
}: TypingEffectProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [textLength, setTextLength] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const typeText = () => {
      if (isTyping) {
        if (textLength < textArray[currentIndex].length) {
          setTextLength(textLength + 1)
        } else {
          setIsTyping(false)
          setTimeout(() => setIsTyping(false), delayBetweenTexts)
        }
      } else {
        if (textLength > 0) {
          setTextLength(textLength - 1)
        } else {
          setIsTyping(true)
          setCurrentIndex((prev) => (prev + 1) % textArray.length)
        }
      }
    }

    const interval = setInterval(
      typeText,
      isTyping ? typingSpeed : deletingSpeed
    )

    // Blinking cursor logic
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [
    isTyping,
    textLength,
    currentIndex,
    textArray,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
  ])

  return (
    <div
      className={`text-customGreen font-mono text-lg inline-block relative ${className}`}
    >
      <span>{textArray[currentIndex].slice(0, textLength)}</span>
      {cursorVisible && <span className="block-cursor inline-block"></span>}
    </div>
  )
}

export default TypingEffect
