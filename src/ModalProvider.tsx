import React, {
  useState
} from 'react'

import ModalContext from './ModalContext.js'

interface ModalProviderProps {
  children: React.ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  children
}) => {
  const [shownModals, setShownModals] = useState<Record<number, React.ReactNode>>({})

  /**
     *
     * @param {React.ReactElement} modal
     */
  const setModal = (id: number, modal: React.ReactNode): void => {
    setShownModals({
      ...shownModals,
      [id]: modal
    })
  }

  const removeModal = (id: number): void => {
    const {
      [id]: _removed,
      ...rest
    } = shownModals

    setShownModals(rest)
  }

  const modalArray = Object.keys(shownModals)
    .map(key => {
      const Component = shownModals[key]

      return <Component key={key} />
    })

  return (
    <ModalContext.Provider
      value={{
        setModal,
        removeModal
      }}
    >
      {children}
      {modalArray}
    </ModalContext.Provider>
  )
}

export default ModalProvider
