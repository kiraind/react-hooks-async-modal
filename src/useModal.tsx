import React, { useContext } from 'react'

import ModalContext from './ModalContext.js'

export interface ModalComponentProps<ReturnedType> {
  key: number
  onResolve: (value: ReturnedType) => void
  onReject?: (reason: any) => void
}

let uniqueCounter = 0

/**
 *
 * @param {React.Component} ModalComponent
 * @returns {function(props):Promise}
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export default function useModal<ModalPropsT, ReturnedType = void> (
  ModalComponent: React.ComponentType<ModalComponentProps<ReturnedType> & ModalPropsT>
): (props: ModalPropsT) => Promise<ReturnedType> {
  // called every render

  const modalContext = useContext(ModalContext)

  if (modalContext === null) {
    throw new Error('Seems like <ModalProvider /> is not present in the tree above, wrap your app with it or check docs')
  }

  return async (props: ModalPropsT): Promise<ReturnedType> => {
    const id = uniqueCounter++

    let onResolve: (value: ReturnedType) => void
    let onReject: (reason: any) => void

    const promise = new Promise<ReturnedType>((resolve, reject) => {
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
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        onResolve={onResolve!}
        onReject={onReject!}
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
        {...props}
      />
    ))

    return promise
  }
}
