# react-hooks-async-modal

> Library for creating async modal-calling functions in React

[![NPM](https://img.shields.io/npm/v/react-hooks-async-modal.svg)](https://www.npmjs.com/package/react-hooks-async-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org)

## Install

```bash
npm install --save react-hooks-async-modal
```

## Usage

First, import `ModalProvider` and wrap your App with it:

```tsx
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

Then create component for modal, it must have `onResolve` and `onReject` callback props. May have custom props like `message`. [Here](https://github.com/kiraind/react-hooks-async-modal/tree/master/example) is an example async implementation of browser's `prompt`:

```tsx
import { ModalComponentProps } from 'react-hooks-async-modal'

export interface PromptModalProps {
  message: string
}

const PromptModal: React.FC<PromptModalProps & ModalComponentProps<string>> = ({
  message,

  onResolve,
  onReject
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const backRef = useRef(null)

  return (
    <div
      className='ModalWrap'
      ref={backRef}

      onClick={e =>
        // prevent triggering if clicked on a child
        (e.target === backRef.current) &&
          onReject!('Clicked outside modal')}
    >
      <div className='ModalBody'>
        <p>{message}</p>
        <input
          ref={inputRef}
        />
        <button
          onClick={() => onReject!('Input cancelled')}
        >Cancel
        </button>
        <button
          onClick={() => onResolve(inputRef.current!.value)}
        >Ok
        </button>
      </div>
    </div>
  )
}
```

To use it as an async function, import `useModal` like here:

```jsx
import { useModal } from 'react-hooks-async-modal'

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
      >
        Prompt!
      </button>
    </main>
  )
}
```

If you're connecting your modal to Redux or using some other HOC that returns type incompatible with `useModal` argument you can use `proxyModal`:

```tsx
import { proxyModal } from 'react-hooks-async-modal'

export default proxyModal<string>(
  connect(mapStateToProps, mapDispatchToProps)(PromptModalInner)
)
```

## License

MIT
