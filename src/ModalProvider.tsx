import React, {
    useState,
} from 'react'

import ModalContext from './ModalContext.js'

interface ModalProviderProps {
    children: React.ReactChildren
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    children,
}) => {
    const [shownModals, setShownModals] = useState<Record<number, React.ReactNode>>({})

    /**
     * 
     * @param {React.ReactElement} modal 
     */
    const setModal = (id: number, modal: React.ReactNode) => {
        setShownModals({
            ...shownModals,
            [id]: modal,
        })
    }
    
    const removeModal = (id: number) => {
        const {
            [id]: _removed,
            ...rest
        } = shownModals

        setShownModals(rest)
    }

    const modalArray = Object.keys(shownModals)
        .map(key => shownModals[key])

    return (
        <ModalContext.Provider
            value={{
                setModal,
                removeModal,
            }}
        >
            {children}
            {modalArray}
        </ModalContext.Provider>
    )
}

export default ModalProvider