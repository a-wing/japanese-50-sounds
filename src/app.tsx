import { useEffect, useState } from 'react'
import './app.css'

import Sample from 'lodash.sample'

import Word from './data'
import Question from './question'

function App() {
  const [words, setWords] = useState(Word.a)

  function next(): string {
    return Sample(Object.keys(words)) || "a"
  }

  const [question, setQuestion] = useState(next())
  useEffect(() => {
    setQuestion(next())
  }, [words])

  const [lineKa, setLineKa] = useState(false)
  const [lineSa, setLineSa] = useState(false)
  return (
    <div className="App">
      <h1>这回一定会熟练掌握日语五十音</h1>
      <Question word={ question } words={ words } next={ () => setQuestion(next()) } />

      <hr/>

      <input type="checkbox" checked={ lineKa } onChange={ () => {
        lineKa
          ? setWords(words.filter(i => !Word.ka.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.ka])
        setLineKa(!lineKa)
      } } />
      <label>ka</label>

      <input type="checkbox" checked={ lineSa } onChange={ () => {
        lineSa
          ? setWords(words.filter(i => !Word.sa.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.sa])
        setLineSa(!lineSa)
      } } />
      <label>sa</label>
    </div>
  )
}

export default App
