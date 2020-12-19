import React, { useContext } from 'react'

import ModalContext from './ModalContext.js'

interface ModalComponentProps<ReturnedType> {
    key: number
    onResolve: (value: ReturnedType) => void
    onReject: (reason: any) => void
}

let uniqueCounter = 0

/**
 * 
 * @param {React.Component} ModalComponent 
 * @returns {function(props):Promise}
 */
export default function useModal<ModalPropsT, ReturnedType = void>(
    ModalComponent: React.ComponentType<ModalComponentProps<ReturnedType> & ModalPropsT>
) {
    // called every render

    const modalContext = useContext(ModalContext)

    if(modalContext === null) {
        throw new Error(`Seems like <ModalProvider /> is not present in the tree above, wrap your app with it or check docs`)
    }

    return (props: ModalPropsT) => {
        const id = uniqueCounter++

        let onResolve: (value: ReturnedType) => void
        let onReject: (reason: any) => void
        
        const promise = new Promise( (resolve, reject) => {
            // callbacks passed to component

            onResolve = (result: ReturnedType) => {
                modalContext.removeModal(id)

                resolve(result)
            }

            onReject = (reason: any) => {
                modalContext.removeModal(id)

                reject(reason)
            }
        })

        modalContext.setModal(id, (
            <ModalComponent
                key={id}

                onResolve={onResolve!}
                onReject={onReject!}

                {...props}
            />
        ))

        return promise
    }
}