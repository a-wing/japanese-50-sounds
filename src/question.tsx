import { useState } from 'react'
import SampleSize from 'lodash.samplesize'
import Random from 'lodash.random'

function Question(props: { flags: string[], word: string, words: { [_: string]: any }, next: () => void }) {
  const answers = SampleSize(Object.keys(props.words), 4)
  if (!answers.find(i => i === props.word)) {
    const i = Random(answers.length - 1)
    answers[i] = props.word
  }

  const { flags, word, words } = props
  const [questionType, answerType] = SampleSize(flags, 2)

  const [show, setShow] = useState(false)
  return (
    <>
      { words[word]
        ? <div>
            <p>{ words[word][questionType] }</p>
            { show
              ? <p>{ JSON.stringify(words[word]) }</p>
              : <></>
            }

            { answers.map(i => <button key={i} onClick={ () => {
              words[i].name === words[word].name
                ? (() => { props.next(); setShow(false) })()
                : setShow(true)
            } } >{ words[i][answerType] }</button>) }
          </div>
        : <p>has a error: { word }</p>
      }
    </>
  )
}

export default Question
