import React, {
    useState,
    useContext,
} from 'react'

import ModalContext from './ModalContext.js'

let uniqueCounter = 0

/**
 * 
 * @param {React.Component} ModalComponent 
 * @returns {function(props):Promise}
 */
export default function useModal(ModalComponent) {
    // called every render

    const [ modalId,    setModalId ]    = useState(null)

    const modalContext = useContext(ModalContext)

    if(!modalContext) {
        throw new Error(`Seems like <ModalProvider /> is not present in the tree above, wrap your app with it or check docs`)
    }

    const closeModal = () => {
        modalContext.removeModal(modalId)

        setModalId(null)
    }

    return props => {
        const id = uniqueCounter++

        setModalId(id)

        let onResolve, onReject
        
        const promise = new Promise( (resolve, reject) => {
            // callbacks passed to component

            onResolve = result => {
                closeModal()

                resolve(result)
            }

            onReject = reason => {
                closeModal()

                reject(reason)
            }
        })

        modalContext.setModal(id, (
            <ModalComponent
                key={id}

                onResolve={onResolve}
                onReject={onReject}

                {...props}
            />
        ))

        return promise
    }
}