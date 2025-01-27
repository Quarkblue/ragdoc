'use client'
import type React from 'react'
import { useRef, useEffect, useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={message}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className="w-full resize-none bg-transparent outline-none text-customWhite"
      style={{
        height: '20px',
        overflow: 'hidden',
      }}
    />
  )
}

export default ChatInput
