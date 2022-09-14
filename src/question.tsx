import { useState } from 'react'
import SampleSize from 'lodash.samplesize'
import Random from 'lodash.random'

function Question(props: { flags: string[], word: string, words: { [_: string]: any }, next: () => void }) {
  const { flags, word } = props
  const words: Array<any> = [].concat(...Object.values(props.words))

  const question = words.find(i => i.name === word)
  const answers = SampleSize(words, 4)
  if (!answers.find(i => i.name === word)) {
    const i = Random(answers.length - 1)
    answers[i] = question
  }

  const [questionType, answerType] = SampleSize(flags, 2)

  const [show, setShow] = useState(false)
  return (
    <>
      { question
        ? <div>
            <p>请选择 { question[questionType] } 的 { answerType }</p>
            { show
              ? <>
                  <p>romaji: { question.romaji }</p>
                  <p>hiragana: { question.hiragana }</p>
                  <p>katakana: { question.katakana }</p>
                </>
              : <></>
            }

            { answers.map(i => <button key={`answers-${i.name}`} onClick={ () => {
              i.name === question.name
                ? (() => { props.next(); setShow(false) })()
                : setShow(true)
            } } >{ i[answerType] }</button>) }
          </div>
        : <p>has a error: { word }</p>
      }
    </>
  )
}

export default Question
