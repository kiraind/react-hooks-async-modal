import React, { useCallback, useContext } from 'react'

import ModalComponentProps from './ModalComponentProps'
import ModalContext from './ModalContext'

let uniqueCounter = 0

/**
 *
 * @param {React.Component} ModalComponent
 * @returns {function(props):Promise}
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export default function useCancellableModal<ModalPropsT, ReturnedType = void> (
  ModalComponent: React.ComponentType<ModalComponentProps<ReturnedType> & ModalPropsT>
): (props: ModalPropsT) => [Promise<ReturnedType>, () => void] {
  // called every render

  const modalContext = useContext(ModalContext)

  if (modalContext === null) {
    throw new Error('Seems like <ModalProvider /> is not present in the tree above, wrap your app with it or check docs')
  }

  return useCallback((props: ModalPropsT): [Promise<ReturnedType>, () => void] => {
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
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        onResolve={onResolve!}
        onReject={onReject!}
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
        {...props}
      />
    ))

    const cancel = (): void => onReject('Closed from outside')

    return [promise, cancel]
  }, [ModalComponent])
}
