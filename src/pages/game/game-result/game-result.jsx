import React, {useEffect, useState, useLayoutEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RWebShare } from 'react-web-share';
import CryptoJS from 'crypto-js'
import { CgSpinner } from 'react-icons/cg';

import Button from '../../../components/button/button';
import {ReactComponent as Congratulations} from '../../../assets/congratulations.svg'
import {ReactComponent as ShareIcon} from '../../../assets/share.svg'

import useDocumentTitle from '../../../hooks/use-document-title';

import {UserActions, TriviaActions} from '../../../states/actions'
// import {ResponseActions} from '../../../states/actions'

const GameResult = ({ className }) => {
  const {hash} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [points, setPoints] = useState()
  const [userId, setUserId] = useState()
  const [gameId, setGameId] = useState()
  const [currentHash, setCurrentHash] = useState()
  const {games} = useSelector(state => state.trivia)
  const [game, setGame] = useState()
  const [success, setSuccess] = useState(false)
  useDocumentTitle('Result')

  useEffect(() => {
    if (game) {
      console.log('game', game)
    }
    // eslint-disable-next-line
  }, [game])

  useEffect(() => {
    if (games && gameId) {
      // eslint-disable-next-line
      let g = games.find(d => d.id == gameId);
      if (g) setGame(g);
    }
    // eslint-disable-next-line
  }, [gameId, games])

  useLayoutEffect(() => {
    if (!user?.token && hash) {
      localStorage.setItem('hash', JSON.stringify(hash))
      history.push('/app/login');
    }
    // eslint-disable-next-line
  }, [user, hash]);

  useEffect(() => {
    if (hash && CryptoJS && user?.id) {
      setCurrentHash(hash)
      let encrypted = hash.replaceAll('CHAFMN', '/')
      let decrypted = CryptoJS.AES.decrypt(encrypted, 'chekkit-fmn-secret');
      let string = decrypted.toString(CryptoJS.enc.Utf8)
      let arr = string.split('&')

      if (arr[0]) {
        setUserId(arr[0])
      }

      if (arr[1]) {
        setPoints(arr[1])
      }

      if (arr[2]) {
        setGameId(arr[2])
      }

      // if (arr[3]) {
      //   console.log('time', arr[3])
      // }

    }
    // eslint-disable-next-line
  }, [hash, CryptoJS, user?.id])

  useEffect(() => {
    if (userId && user?.id && hash) {
      if (Number(user?.id) !== Number(userId)) {
        localStorage.setItem('hash', JSON.stringify(hash))
        dispatch(UserActions.logout())
      }
    }
    // eslint-disable-next-line
  }, [userId, user?.id, hash])

  useEffect(() => {
    if (points && gameId && userId && user?.id && game && !success && currentHash && Number(user?.id) === Number(userId)) {
      // dispatch(TriviaActions.saveHash(currentHash)).then(res => {
      //   if (res) {
      //     // do that
      //   }
      // }).catch(err => {
      //   dispatch(ResponseActions.notify({ title: "", message: err.response?.data?.message || err.message || 'Score already recorded', type: 'error', loading: false }));
      // })
      setCurrentHash(null)
      dispatch(TriviaActions.submitTrivia({
        score: Number(points) > game?.points ? game?.points : Number(points),
        gameId: Number(gameId)
      })).then(res => {
        if (res) {
          setSuccess(true)
        }
      })
    }
    // eslint-disable-next-line
  }, [points, gameId, userId, user?.id, game])


  return (
    <FadeIn className={`${className} flex-1 p-4 flex flex-col justify-center text-gray-800`}>

      {(!points && points !== 0) || !hash || Number(user?.id) !== Number(userId) || !success ? (
        <div className={`absolute top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center`}>
          <CgSpinner className={`text-yellow_dark animate-spin`} size={64} />
        </div>
      ) : (
        <div className='-space-y-8'>
          <div className='h-52 z-50'>
            <Congratulations alt='' className='w-full' />
          </div>
          <div style={{height: '400px'}} className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72 mx-auto py-8 pt-14 space-y-4 justify-between'>
            <div className='space-y-4'>
              <div className='font-semibold text-3xl'>Good job, {user?.first_name}!</div>
              <div className='text-gray-800 font-medium'>You just won <b>{Number(points) > game?.points ? game?.points : points}</b> points. Keep playing more games and submitting receipts with Amaizing Day Cereal to rack up more points</div>
            </div>
            <div className='space-y-6'>
              <Button onClick={() => history.push('/app/leaderboard')} text={'Goto Leaderboard'} />
                <RWebShare
                  data={{
                    text: `${user?.first_name} just won ${Number(points) > game?.points ? game?.points : points} points. Play more games and submit receipts with Amaizing Day Cereal to rack up more points`,
                    url: window.location.href,
                    title: `Congratulations ${user?.first_name}!`,
                  }}
                >
                  <div className='flex items-center justify-center space-x-2 cursor-pointer'>
                    <ShareIcon />
                    <div className='text-green_light text-xl font-semibold'>share to friends</div>
                  </div>
                </RWebShare>
            </div>
          </div>
        </div>
      )}

    </FadeIn>
  );
};

export default GameResult;
