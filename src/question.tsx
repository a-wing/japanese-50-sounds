import { useState } from 'react'
import SampleSize from 'lodash.samplesize'
import Random from 'lodash.random'

function Question(props: { word: string, words: { [_: string]: any }, next: () => void }) {
  const answers = SampleSize(Object.keys(props.words), 4)
  if (!answers.find(i => i === props.word)) {
    const i = Random(answers.length - 1)
    answers[i] = props.word
  }

  const [show, setShow] = useState(false)
  const { word, words } = props
  return (
    <>
      { words[word]
        ? <div>
            <p>{ words[word].hiragana }</p>
            { show
              ? <p>{ JSON.stringify(words[word]) }</p>
              : <></>
            }

            { answers.map(i => <button key={i} onClick={ () => {
              words[i].name === words[word].name
                ? (() => { props.next(); setShow(false) })()
                : setShow(true)
            } } >{ words[i].katakana }</button>) }
          </div>
        : <p>has a error: { word }</p>
      }
    </>
  )
}

export default Question