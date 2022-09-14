import { useEffect, useState } from 'react'

import Random from 'lodash.random'
import SampleSize from 'lodash.samplesize'

function Answers(props: { answer?: any }) {
  const answer = props.answer
  return (
    <>
      { answer
        ? <>
            <p>romaji: { answer.romaji }</p>
            <p>hiragana: { answer.hiragana }</p>
            <p>katakana: { answer.katakana }</p>
          </>
        : <></>
      }
    </>
  )
}

function generateQuestion<T>(flags: string[], libs: T[]): { qType: string, aType: string, Q: T, A: T[] } {
  const [qType, aType] = SampleSize(flags, 2)

  const [question] = SampleSize(libs, 1)
  const answers = SampleSize(libs, 4)
  if (!answers.find(i => i === question)) {
    const i = Random(answers.length - 1)
    answers[i] = question
  }

  return {
    qType: qType,
    aType: aType,
    Q: question,
    A: answers,
  }
}

function Question(props: { flags: string[], words: { [_: string]: any } }) {
  const { flags, words } = props
  const [show, setShow] = useState(false)

  const next = () => {
    const words: Array<any> = [].concat(...Object.values(props.words))
    return generateQuestion(flags, words)
  }

  const [current, setCurrent] = useState(next())
  const { qType, aType, Q, A } = current

  useEffect(() => {
    setShow(false)
    setCurrent(next())
  }, [flags, words])

  return (
    <>
      { Q
        ? <div>
            <p>请选择 { Q[qType] } 的 { aType }</p>

            <Answers answer={ show ? Q : undefined } />

            { A.map(i => <button key={`answers-${i.name}`} onClick={ () => {
              i.name === Q.name
                ? (() => { setCurrent(next()); setShow(false) })()
                : setShow(true)
            } } >{ i[aType] }</button>) }
          </div>
        : <p>has a error</p>
      }
    </>
  )
}

export default Question
