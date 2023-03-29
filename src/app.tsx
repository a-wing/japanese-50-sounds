import { useRef, useState } from 'react'
import CloneDeep from 'lodash.clonedeep'
import './app.css'

import Table from './data'
import { Flags } from './lib'
import Question from './question'

let Data = Object.values(CloneDeep(Table)).reduce((init, item) => Object.assign(init, item))

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

type Word = {
  name: string,
  romaji: string,
  hiragana: string,
  katakana: string,
}

function EnableButton(props: { name: keyof typeof Data, words: Map<string, Word>, setWords: (_: any) => void }) {
  const { name, words, setWords } = props
  const [enabled, setEnabled] = useState(words.has(name))
  return (
    <>
      <input type="checkbox" checked={ enabled } onChange={ () => {
        enabled
          ? words.delete(name)
          : words.set(name, Data[name])

        setWords(Object.fromEntries(words))
        setEnabled(!enabled)
      } } />
      <label>{ name }</label>
    </>
  )
}

function Item(props: {
  words: any,
  mapWord: any,
  setWords: (_: any) => void,
}) {
  return (
    <>
      { Object.keys(props.words).map(i => <EnableButton key={ i } name={ i as keyof typeof Data } words={ props.mapWord } setWords={ d => props.setWords(d) } />) }
    </>
  )
}

function App() {
  const [words, setWords] = useState(Data)
  const [flags, setFlags] = useState<string[]>(Flags)
  const mapWord = useRef(new Map(Object.entries(Data)))

  return (
    <div className="App">
      <h1>这回一定会熟练掌握日语五十音</h1>
      <Question flags={ flags } words={ words } />

      <hr/>
      { Flags.map(i => <EnableFlags key={ i } name={ i } flags={ flags } setFlags={ a => setFlags(a) } />) }
      <hr/>
      清音：<Item words={ Table['gojuuon'] } mapWord={ mapWord.current } setWords={ (d: any) => setWords(d) } ></Item>
      <hr/>
      浊音：<Item words={ Table['dakuon'] } mapWord={ mapWord.current } setWords={ (d: any) => setWords(d) } ></Item>
      &nbsp;
      半浊音：<Item words={ Table['handakuon'] } mapWord={ mapWord.current } setWords={ (d: any) => setWords(d) } ></Item>
      <hr/>
      拗音：<Item words={ Table['yoon'] } mapWord={ mapWord.current } setWords={ (d: any) => setWords(d) } ></Item>

    </div>
  )
}

export default App
