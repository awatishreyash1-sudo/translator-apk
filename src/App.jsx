import { useState } from "react"
import axios from "axios"
import {Loader} from "lucide-react"

function App() {
  const [ textInput, SetTextInput ] = useState("")
  const [ selectValue, SetSelectValue ] = useState("")
  const [ result, SetResult ] = useState("")
  const [ loading, SetLoading ] =useState(false)

  const handleTextTranslation = async () => {
    SetLoading(true)
    try{
      const options = {
  method: 'POST',
  url: 'https://google-translator9.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-key': '4218e772d8mshd3036d10d2f0012p1a8adbjsnbdbc9d7a30a6',
    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    q: `${textInput}`,
    source: 'en',
    target: `${selectValue}`,
    format: 'text'
  }
};

const response = await axios.request(options)
SetLoading(false)
console.log(response?.data?.data?.translations?.[Number(0)]?.translatedText)
SetResult(response?.data?.data?.translations?.[Number(0)]?.translatedText)
    }catch (error){
      SetLoading(false)
      console.log(error?.data)
    }
  }

  console.log(textInput)
  console.log(selectValue)
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
  <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col gap-6">
    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
      <h1 className="text-2xl font-bold text-slate-800">Text Translator</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <textarea name="input-text"
        placeholder="Enter text..."
        className="w-full h-36 bg-slate-50 border border-slate-300 rounded-lg p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all"
        onChange={(e) => SetTextInput(e.target.value)}
      />
      <textarea name="output-text" placeholder="Translation..."
        className="w-full h-36 bg-slate-100 border border-slate-200 rounded-lg p-4 text-slate-900 focus:outline-none resize-none"
        value={result}
        readOnly
      />
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <label htmlFor="options" className="text-sm font-medium text-slate-600 whitespace-nowrap">Convert Into:</label>
        <select name="value"
          id="options"
          className="flex-1 sm:flex-none bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
          onChange={(e) => SetSelectValue(e.target.value)}>
          <option value="">Select</option>
          <option value="mr">Marathi</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <button className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleTextTranslation}
        disabled={loading}>
        {loading ? <Loader className="animate-spin w-5 h-5" /> : "Translate"}
      </button>
    </div>
  </div>
</div>
  )
}

export default App