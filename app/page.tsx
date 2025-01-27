'use client'
import TerminalText from '@/components/ui/glowText'
import TypingEffect from '@/components/TypingEffect'
import FileUpload from '@/components/fileUpload'
function TerminalPrompt({ path }: { path: string }) {
  return (
    <>
      <span className="text-white">
        <span className="text-customGreen">Dev@Chupacabraz</span>:
        <span className="text-customBlue">ragdoc/{path}</span>&#36;&nbsp;
      </span>
    </>
  )
}

export default function Home() {
  return (
    <div className="px-4 py-2 flex h-screen bg-black">
      <TerminalText>
        <h1 className="text-lg  text-customGreen">Welcome to the RagDoc</h1>
        <span className="flex items-center text-md text-customGreen">
          &gt;&gt;&gt; Talk To your&nbsp;
          <TypingEffect
            className="font-mono text-md"
            textArray={['ppt', 'pdf', 'word', 'excel']}
            typingSpeed={300}
            deletingSpeed={100}
            delayBetweenTexts={2000}
          />
        </span>
        <br />
        <FileUpload />
        <TerminalPrompt path="ragdoc" />
      </TerminalText>
    </div>
  )
}
