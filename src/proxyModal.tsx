import React from 'react'

import ModalComponentProps from './ModalComponentProps'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const proxyModal = <ReturnedType extends unknown = void>(Wrapped: React.ComponentType<ModalComponentProps<ReturnedType> & any>): React.FC<ModalComponentProps<ReturnedType>> => ({
  onResolve,
  onReject
}) => (
  <Wrapped
    onResolve={onResolve}
    onReject={onReject}
  />
)

export default proxyModal
