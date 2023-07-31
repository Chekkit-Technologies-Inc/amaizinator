import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {shuffle} from 'lodash'
import Countdown from "react-countdown";

import useDocumentTitle from '../../../hooks/use-document-title';
import {ReactComponent as PointIcon} from '../../../assets/point.svg'

import Button from '../../../components/button'

import {TriviaActions} from '../../../states/actions'

const abc =['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

let answerMapper = {}
let pointMapper = {}

// Random component
const Completionist = () => <span>Time up!</span>;

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

const TriviaPlayer = ({ className }) => {
  const {slug} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {triviaList} = useSelector(state => state.trivia)
  const [trivia, setTrivia] = useState()
  const [question, setQuestion] = useState({})
  const [choices, setChoices] = useState([])
  const [index, setIndex] = useState(0)
  // eslint-disable-next-line
  const [time, setTime] = useState()
  useDocumentTitle('Trivia')

  useEffect(() => {
    if (!triviaList) {
      dispatch(TriviaActions.fetchTrivia())
    }
    // eslint-disable-next-line
  }, [])

  const onSelect = (idx) => {
    setChoices(choices.map((d, i) => {
      if (i === idx) {
        d.selected = true
      } else {
        d.selected = false
      }
      return d
    }))
    let selected = choices.find((d, i) => i === idx)
    answerMapper = {...answerMapper, [index]: selected?.text}
    if (selected?.text?.toLowerCase()?.includes(question?.answer?.toLowerCase())) {
      pointMapper = {...pointMapper, [index]: trivia?.trivia_points / trivia?.question?.length}
    } else {
      pointMapper = {...pointMapper, [index]: 0}
    }
  }

  useEffect(() => {
    if (triviaList) {
      // eslint-disable-next-line
      let t = triviaList.find(d => d.slug == slug);
      if (t) {
        let qs = shuffle(t?.question)
        setTrivia({...t, question: qs})
      };
    }
    // eslint-disable-next-line
  }, [slug, triviaList])

  useEffect(() => {
    if (trivia?.question[index]) {
      setQuestion(trivia?.question[index])
    }
    // eslint-disable-next-line
  }, [index, trivia])

  useEffect(() => {
    if (trivia?.question?.length > 0) {
      setTime(Date.now() + 5000 * trivia?.question?.length)
    }
    // eslint-disable-next-line
  }, [trivia])

  useEffect(() => {
    if (question?.choices) {
      setChoices(shuffle(JSON.parse(question?.choices).map(d => {
        if (answerMapper[index] === d.text) {
          d.selected = true
          return d
        }
        d.selected = false
        return d
      })))
    }
    // eslint-disable-next-line
  }, [question])

  const registerScore = () => {
    let pointEarned = Object.keys(pointMapper).reduce((p, n) => {
      return p + pointMapper[n]
    }, 0)
    dispatch(TriviaActions.submitTrivia({
      score: Math.round(pointEarned),
      surveyId: trivia?.id
    })).then(res => {
      if (res) {
        history.push(`/app/trivia-result/${Math.round(pointEarned)}`)
      }
    })
  }

  const onSubmit = () => {
    if (index + 1 === trivia?.question?.length) {
      registerScore()
    } else {
      setIndex(i => i + 1)
    }
  }

  return (
    <div className={`${className} flex-1 flex flex-col text-white  p-4`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>

      <div className='font-bold text-lg mt-4'>{trivia?.title}</div>

      <div  className='flex flex-col flex-1 h-full'>
        <div className='w-full h-24 flex justify-between items-center space-x-4 mx-auto relative top-6 text-2xl font-bold'>
          <div>
            {time && <Countdown onComplete={registerScore} date={time} renderer={renderer} />}
          </div>
          <div className='bg-white bg-opacity-25 h-8 p-2 inline-flex justify-center items-center rounded-lg space-x-1'>
            <PointIcon />
            <div className='font-extrabold text-sm'>{trivia?.trivia_points ? Math.round(trivia?.trivia_points / trivia?.question?.length) : 0}</div>
          </div>
        </div>
        <div style={{minHeight:'500px'}} className='bg-white flex-1 rounded-2xl text-gray-800 p-6 z-20 flex flex-col space-y-16 justify-between'>
          <FadeIn className='space-y-6'>
            {trivia && <div className='space-y-2'>
              <div className='font-bold text-xs text-gray-400'>Question {index + 1} of {trivia?.question?.length}</div>
              <div className='font-semibold overflow-auto'>{question?.content}</div>
            </div>}

            {trivia?.question?.length > 0 && (
              <FadeIn className='space-y-4'>
                {choices && choices.filter(d => d?.text).map((d, i) => {
                  return (
                    <div key={i} onClick={() => onSelect(i)} className={`${d?.selected ? 'bg-green_lightx' : 'border'} rounded-2xl py-3 px-5 flex gap-4 cursor-pointer`}>
                      <div className={`${d?.selected ? 'font-bold' : ''} flex justify-center items-center text-base pr-1`}>
                        {abc[i]}
                      </div>

                      <div className={`border-r ${d?.selected ? 'border-green_dark' : ''}`}></div>

                      <div className=''>
                        {d?.text}
                      </div>
                    </div>
                  )
                })}
              </FadeIn>
            )}

          </FadeIn>
          <div>
            {trivia && <FadeIn>
              {!trivia?.isAlreadyTaken  ? (
                <div className='space-y-4'>
                  <Button className={answerMapper[index] ? '' : 'pointer-events-none opacity-50'} onClick={onSubmit} text={index + 1 === trivia?.question?.length ? `Submit` : `Next Question`} />
                  {index > 0 && <div onClick={() => setIndex(i => i - 1)} className='text-center p-4 rounded-2xl text-base font-semibold cursor-pointer text-green_dark bg-gray-200'>Previous Question</div>}
                </div>
              )
               : (
                <>
                  <div className={'mb-8 text-center text-red-500 bg-red-50 p-4 font-semibold rounded-lg'}>Already played trivia</div>
                  <Button onClick={() => history.push('/app/dashboard')} className='-mt-4' text={'Goto Dashboard'} />
                </>
              )}
            </FadeIn>}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TriviaPlayer;
