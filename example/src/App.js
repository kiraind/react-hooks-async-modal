import React, { useState } from 'react'

import { useModal } from 'react-hooks-async-modal'
import { useRef } from 'react'

const PromptModal = ({
    message,
    onResolve,
    onReject,
}) => {
    const inputRef = useRef(null)

    return (
        <div>
            <p>{message}</p>
            <input
                ref={inputRef}
            />
            <button
                onClick={onReject}
            >Cancel</button>
            <button
                onClick={() => onResolve(inputRef.current.value)}
            >Ok</button>
        </div>
    )
}

const App = () => {
    const [ promptedText, setPromptedText ] = useState('none')

    const callPromptModal = useModal(PromptModal)


    const onPrompt = async () => {
        const text = await callPromptModal()

        setPromptedText(text)
    }

    return (
        <div>
            <div>Prompted text: {promptedText}</div>
            <button
                onClick={onPrompt}
            >Prompt!</button>
        </div>
    )
}

export default App
