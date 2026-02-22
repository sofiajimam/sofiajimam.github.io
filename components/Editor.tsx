"use client"

import { useRef } from "react"

interface Props {
  value: string
  onChange: (value: string) => void
  onCursorChange: (line: number, col: number, chars: number) => void
}

export default function Editor({ value, onChange, onCursorChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const updateCursor = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const pos = textarea.selectionStart
    const text = textarea.value.substring(0, pos)

    const lines = text.split("\n")
    const line = lines.length
    const col = lines[lines.length - 1].length + 1

    onCursorChange(line, col, textarea.value.length)
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
        updateCursor()
      }}
      onClick={updateCursor}
      onKeyUp={updateCursor}
      className="w-full h-full resize-none outline-none font-mono text-sm p-4"
      spellCheck={false}
    />
  )
}