import { useEffect, useState } from 'react'
import './app.css'

import Sample from 'lodash.sample'

import Word from './data'
import { Flags } from './lib'
import Question from './question'

function EnableFlags(props: { name: string, flags: string[], setFlags: (_: string[]) => void }) {
  const { name, flags, setFlags } = props
  const [enabled, setEnabled] = useState(!!flags.find(i => i === name))
  return (
    <>
      <input type="checkbox" checked={ enabled } onChange={ () => {
        enabled
          ? setFlags(flags.filter(i => i !== name))
          : setFlags([...flags, name])
        setEnabled(!enabled)
      } } />
      <label>{ name }</label>
    </>
  )
}

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
  const [flags, setFlags] = useState<string[]>(Flags)

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
      <Question flags={ flags } word={ question } words={ words } next={ () => setQuestion(next()) } />

      <hr/>
      { Flags.map(i => <EnableFlags key={ i } name={ i } flags={ flags } setFlags={ a => setFlags(a) } />) }
      <hr/>

      { Object.keys(Word).map(i => <EnableButton key={ i } name={ i as keyof typeof Word } words={ words } setWords={ (d) => setWords(d) } />) }
    </div>
  )
}

export default App
