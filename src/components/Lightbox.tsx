'use client'

import React, { useEffect, useCallback, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  // Close modal on ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    // Only listen for keydown if modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  // Create a portal to place the modal at the root level, above all other components
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
      onClick={onClose}  // close on backdrop click
    >
      {/* Stop clicks from closing modal if they happen within the child container */}
      <div
        className="relative max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-200"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
