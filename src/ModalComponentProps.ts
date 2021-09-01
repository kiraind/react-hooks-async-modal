// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export default interface ModalComponentProps<ReturnedType = void> {
  onResolve: (value: ReturnedType) => void
  onReject: (reason: any) => void
}
