import { useEffect, useRef, useState } from 'react'
import './app.css'

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

function EnableButton(props: { name: keyof typeof Word, words: Map<string, any>, setWords: (_: any) => void }) {
  const { name, words, setWords } = props
  const [enabled, setEnabled] = useState(words.has(name))
  return (
    <>
      <input type="checkbox" checked={ enabled } onChange={ () => {
        enabled
          ? words.delete(name)
          : words.set(name, Word[name])

        setWords(Object.fromEntries(words))
        setEnabled(!enabled)
      } } />
      <label>{ name }</label>
    </>
  )
}

function App() {
  const [words, setWords] = useState(Word)
  const [flags, setFlags] = useState<string[]>(Flags)

  const mapWord = useRef(new Map(Object.entries(Word)))

  return (
    <div className="App">
      <h1>这回一定会熟练掌握日语五十音</h1>
      <Question flags={ flags } words={ words } />

      <hr/>
      { Flags.map(i => <EnableFlags key={ i } name={ i } flags={ flags } setFlags={ a => setFlags(a) } />) }
      <hr/>

      { Object.keys(Word).map(i => <EnableButton key={ i } name={ i as keyof typeof Word } words={ mapWord.current } setWords={ (d) => setWords(d) } />) }
    </div>
  )
}

export default App
