import React, {
    useState,
} from 'react'

import ModalContext from './ModalContext.js'

const ModalProvider = ({
    children,
}) => {
    const [ shownModals, setShownModals ] = useState({})

    /**
     * 
     * @param {React.ReactElement} modal 
     */
    const setModal = (id, modal) => {
        setShownModals({
            ...shownModals,
            [id]: modal,
        })
    }
    
    const removeModal = id => {
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