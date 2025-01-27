import React, { useState, DragEvent, ChangeEvent } from 'react'

const FileUploadTerminal: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filler, setFiller] = useState('=')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setFiller('#')
    } else if (event.type === 'dragleave') {
      setFiller('=')
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setFiller('=')

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0])
    }
  }

  const borderLine = filler.repeat(80)

  return (
    <div
      className="flex flex-col items-start justify-center bg-black text-customGreen font-mono"
      style={{ lineHeight: '1' }}
    >
      <div className="text-center">{borderLine}</div>
      <div
        className="relative"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">{borderLine}</div>
        <div className="flex items-center justify-center text-center bg-black">
          <span>{filler.repeat(10)}</span>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="text-md cursor-pointer text-customGreen mx-2 px-1 rounded hover:bg-customGreen hover:text-black "
          >
            {selectedFile ? selectedFile.name : 'CHOOSE A FILE'}
          </label>
          <span>{filler.repeat(10)}</span>
        </div>
        <div className="text-center text-md">
          <span>
            {filler.repeat(13)} or drag and drop your file here{' '}
            {filler.repeat(13)}
          </span>
        </div>
        <div className="text-center">{borderLine}</div>
      </div>
      <div className="text-center">{borderLine}</div>
    </div>
  )
}

export default FileUploadTerminal
