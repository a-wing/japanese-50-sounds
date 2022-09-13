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
  const [lineTa, setLineTa] = useState(false)
  const [lineNa, setLineNa] = useState(false)
  const [lineHa, setLineHa] = useState(false)
  const [lineMa, setLineMa] = useState(false)
  const [lineYa, setLineYa] = useState(false)
  const [lineRa, setLineRa] = useState(false)
  const [lineWa, setLineWa] = useState(false)
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

      <input type="checkbox" checked={ lineTa } onChange={ () => {
        lineTa
          ? setWords(words.filter(i => !Word.ta.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.ta])
        setLineTa(!lineTa)
      } } />
      <label>ta</label>

      <input type="checkbox" checked={ lineNa } onChange={ () => {
        lineNa
          ? setWords(words.filter(i => !Word.na.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.na])
        setLineNa(!lineNa)
      } } />
      <label>na</label>

      <input type="checkbox" checked={ lineHa } onChange={ () => {
        lineHa
          ? setWords(words.filter(i => !Word.ha.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.ha])
        setLineHa(!lineHa)
      } } />
      <label>ha</label>

      <input type="checkbox" checked={ lineMa } onChange={ () => {
        lineMa
          ? setWords(words.filter(i => !Word.ma.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.ma])
        setLineMa(!lineMa)
      } } />
      <label>ma</label>

      <input type="checkbox" checked={ lineYa } onChange={ () => {
        lineYa
          ? setWords(words.filter(i => !Word.ya.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.ya])
        setLineYa(!lineYa)
      } } />
      <label>ya</label>

      <input type="checkbox" checked={ lineRa } onChange={ () => {
        lineRa
          ? setWords(words.filter(i => !Word.ra.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.ra])
        setLineRa(!lineRa)
      } } />
      <label>ra</label>

      <input type="checkbox" checked={ lineWa } onChange={ () => {
        lineWa
          ? setWords(words.filter(i => !Word.wa.find(j => i.name === j.name) ))
          : setWords([...words, ...Word.wa])
        setLineWa(!lineWa)
      } } />
      <label>wa</label>

    </div>
  )
}

export default App
