import React, { useState } from 'react'

import { useModal } from 'react-hooks-async-modal'

import PromptModal, { PromptModalProps } from './PromptModal'

const App = () => {
  const [promptedText, setPromptedText] = useState('none')
  const [thrownText, setThrownText] = useState('none')

  const callPromptModal = useModal<PromptModalProps, string>(PromptModal)

  const onPrompt = async () => {
    try {
      const text = await callPromptModal({ message: 'Enter some text' })
      setPromptedText(text)
    } catch (error) {
      setThrownText(error.toString())
    }
  }

  return (
    <main>
      <p>
        Prompted text: {promptedText}
        <br />
        Thrown: {thrownText}
      </p>
      <button
        onClick={onPrompt}
      >Prompt!
      </button>
    </main>
  )
}

export default App
