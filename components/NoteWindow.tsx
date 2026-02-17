"use client"

import { motion } from "framer-motion"
import { ReactNode, useState } from "react"

interface NoteWindowProps {
  title: string
  children: ReactNode
  defaultPosition?: { x: number; y: number }
}

export default function NoteWindow({
  title,
  children,
  defaultPosition = { x: 0, y: 0 },
}: NoteWindowProps) {
  const [zIndex, setZIndex] = useState(1)

  const bringToFront = () => {
    setZIndex(Date.now())
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={bringToFront}
      initial={{ x: defaultPosition.x, y: defaultPosition.y }}
      style={{ zIndex }}
      className="absolute w-[380px] max-w-[90vw] bg-[#fffef2] border border-gray-400 shadow-xl"
    >
      {/* Header */}
      <div className="bg-gray-200 px-3 py-2 flex justify-between items-center border-b border-gray-400 cursor-move">
        <span className="text-xs tracking-wide">{title}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-yellow-400" />
          <div className="w-3 h-3 bg-green-400" />
          <div className="w-3 h-3 bg-red-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-sm whitespace-pre-wrap leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
