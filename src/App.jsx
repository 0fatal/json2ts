import { useState } from 'react'
import './App.css'
import { Json2Ts } from './utils/json2ts'

function App() {
    const [jsonStr, setJsonStr] = useState('')
    const [tsStr, setTsStr] = useState('')

    const handleConvert = () => {
        const j2t = new Json2Ts()
        if (!j2t.isJson(jsonStr)) {
            alert('Invalid JSON')
            return
        }
        const res = j2t.convert(jsonStr)
        alert(res)
        setTsStr(res)
    }

    return (
        <div className='App'>
            <div>
                <h1>JSON</h1>
                <textarea
                    value={jsonStr}
                    onChange={(e) => setJsonStr(e.target.value)}
                ></textarea>
            </div>
            <div className='operation'>
                <button onClick={handleConvert}>Convert 👉 </button>
            </div>
            <div>
                <h1>Typescript</h1>
                <textarea value={tsStr}></textarea>
            </div>
        </div>
    )
}

export default App
