import { useCallback } from 'react'

import ModalComponentProps from './ModalComponentProps'
import useCancellableModal from './useCancellableModal'

/**
 *
 * @param {React.Component} ModalComponent
 * @returns {function(props):Promise}
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export default function useModal<ModalPropsT, ReturnedType = void> (
  ModalComponent: React.ComponentType<ModalComponentProps<ReturnedType> & ModalPropsT>
): (props: ModalPropsT) => Promise<ReturnedType> {
  const callCancellableModal = useCallback(
    useCancellableModal<ModalPropsT, ReturnedType>(ModalComponent),
    [ModalComponent]
  )

  return async props => await callCancellableModal(props)[0]
}
