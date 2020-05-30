import React, {
    useState,
} from 'react'

/**
 * 
 * @param {React.Component} ModalComponent 
 * @returns {function(props):Promise}
 */
export default function useModal(ModalComponent) {
    // called every render

    const [ modalShown, setModalShown ] = useState(false)
    const [ modalProps, setModalProps ] = useState({})

    const [ onResolve, setOnResolve ] = useState(null)
    const [ onReject,  setOnReject  ] = useState(null)

    const clearCallbacks = () => {
        setModalProps({})
        setOnResolve(null)
        setOnReject(null)
    }

    console.log(
        modalShown ? (
            <ModalComponent
                onResolve={onResolve}
                onReject={onReject}

                {...modalProps}
            />
        ) : null,
    )

    return props => {
        setModalProps(props)
        setModalShown(true)

        return new Promise( (resolve, reject) => {
            // callbacks passed to component

            setOnResolve(() => result => {
                setModalShown(false)
                clearCallbacks()

                resolve(result)
            })

            setOnReject(() => reason => {
                setModalShown(false)
                clearCallbacks()

                reject(reason)
            })
        })
    }
}