import React, { createContext } from 'react'

interface ModalContextValue {
  setModal: (id: number, modal: React.ReactNode) => void
  removeModal: (id: number) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)
ModalContext.displayName = 'ModalContext'

export default ModalContext
