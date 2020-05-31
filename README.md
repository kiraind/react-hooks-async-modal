# react-hooks-async-modal

> Library for creating async modal-calling functions in React

[![NPM](https://img.shields.io/npm/v/react-hooks-async-modal.svg)](https://www.npmjs.com/package/react-hooks-async-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-hooks-async-modal
```

## Usage

First, import `ModalProvider` and wrap your App with it:

```jsx
import { ModalProvider } from 'react-hooks-async-modal'

ReactDOM.render(
    (
        <ModalProvider>
            <App />
        </ModalProvider>
    ),
    document.getElementById('root')
)

```

Then create component for modal, it must have `onResolve` and `onReject` callback props. May have custom props like `message`. Here is an example async implementation of browser's `prompt`:

```jsx
const PromptModal = ({
    message,
    
    onResolve,
    onReject,
}) => {
    const inputRef = useRef(null)
    const backRef  = useRef(null)

    return (
        <div
            className="ModalWrap"
            ref={backRef}

            onClick={e =>
                // prevent triggering while clicked on child
                (e.target === backRef.current)
                    && onReject('Clicked outside modal')
            }
        >
            <div className="ModalBody">
                <p>{message}</p>
                <input
                    ref={inputRef}
                />
                <button
                    onClick={() => onReject('Input cancelled')}
                >Cancel</button>
                <button
                    onClick={() => onResolve(inputRef.current.value)}
                >Ok</button>
            </div>
        </div>
    )
}
```

To use it as an async function, import `useModal` like here:

```jsx
import { useModal } from 'react-hooks-async-modal'

const App = () => {
    const [ promptedText, setPromptedText ] = useState('none')
    const [ thrownText,   setThrownText ]   = useState('none')

    // creating async function
    const callPromptModal = useModal(PromptModal)

    const onPrompt = async () => {
        try {
            // passing custom props as an argument
            const text = await callPromptModal({ message: 'Enter some text' })
            setPromptedText(text)
        } catch(error) {
            setThrownText(error.toString())
        }
    }

    return (
        <main>
            <p>
                Prompted text: {promptedText}
            <br/>
                Thrown: {thrownText}
            </p>
            <button
                onClick={onPrompt}
            >Prompt!</button>
        </main>
    )
}
```