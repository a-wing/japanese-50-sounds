import { useEffect, useState } from 'react'
import './app.css'

import Sample from 'lodash.sample'

import Word from './data'
import Question from './question'

function EnableButton(props: { name: keyof typeof Word, words: { name: string }[], setWords: (_: any) => void }) {
  const [enabled, setEnabled] = useState(false)
  const { name, words, setWords } = props
  return (
    <>
      <input type="checkbox" checked={ enabled } onChange={ () => {
        enabled
          ? setWords(words.filter(i => !Word[name].find(j => i.name === j.name) ))
          : setWords([...words, ...Word[name]])
        setEnabled(!enabled)
      } } />
      <label>{ name }</label>
    </>
  )
}

function App() {
  const [words, setWords] = useState(Word.a)

  function next(): string {
    return Sample(Object.keys(words)) || "a"
  }

  const [question, setQuestion] = useState(next())
  useEffect(() => {
    setQuestion(next())
  }, [words])

  return (
    <div className="App">
      <h1>这回一定会熟练掌握日语五十音</h1>
      <Question word={ question } words={ words } next={ () => setQuestion(next()) } />

      <hr/>

      { Object.keys(Word).map(i => <EnableButton key={ i } name={ i as keyof typeof Word } words={ words } setWords={ (d) => setWords(d) } />) }
    </div>
  )
}

export default App
