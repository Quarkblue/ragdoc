import React, { FC, ReactNode } from 'react'

interface TerminalTextProps {
  children: ReactNode
}

const TerminalText: FC<TerminalTextProps> = ({ children }) => {
  return <div className=" font-normal font-mono w-full">{children}</div>
}

export default TerminalText
