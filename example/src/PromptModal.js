import React, { useRef } from 'react'

const PromptModal = ({
  message,

  onResolve,
  onReject
}) => {
  const inputRef = useRef(null)
  const backRef = useRef(null)

  return (
    <div
      className='ModalWrap'
      ref={backRef}

      onClick={e =>
        // prevent triggering if clicked on a child
        (e.target === backRef.current) &&
            onReject('Clicked outside modal')}
    >
      <div className='ModalBody'>
        <p>{message}</p>
        <input
          ref={inputRef}
        />
        <button
          onClick={() => onReject('Input cancelled')}
        >Cancel
        </button>
        <button
          onClick={() => onResolve(inputRef.current.value)}
        >Ok
        </button>
      </div>
    </div>
  )
}

export default PromptModal
