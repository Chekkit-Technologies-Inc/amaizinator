import React, { useEffect, useLayoutEffect, useState} from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import {ReactComponent as Logo} from './assets/logo.svg'
import {HiHome as Home} from 'react-icons/hi'
import BarLoader from "react-spinners/BarLoader"
import CryptoJS from 'crypto-js'

import Onboarding from './pages/1-onboarding';
import Dashboard from './pages/2-dashboard';
import InfoManager from './pages/3-info-manager';
import Scanning from './pages/4-scanning';
import Profile from './pages/5-profile'
import Trivia from './pages/trivia'
import Game from './pages/game'
import NotFound from './pages/404-page';

import { UserActions } from './states/actions';

const override = {
  display: "block",
  margin: "0 auto",
  width: '100%',
  height: '2px'
};

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation();
  const user = useSelector(state => state.user);
  const response = useSelector(state => state.response);
  const [background, setBackground] = useState('bg-field')
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    console.log('user', user)
  }, [user])

  useEffect(() => {
    let s = `#home`;
    setTimeout(() => {
      let el = document.querySelector(s);
      if (el) {
        el.scrollIntoView();
      }
    }, 0);
  }, [location.pathname])

  useEffect(() => {
    // let x = '1CD3BcQSZULbvDeZcGJTWsyEI1gg0BYZ3LCRbU6huEQ='
    // let encryptedx = x.replaceAll('CHAFMN', '/')
    // console.log('encryptedx', encryptedx)
    // let decryptedx = CryptoJS.AES.decrypt(encryptedx, 'chekkit-fmn-secret');
    // console.log('decryptedx', decryptedx)
    // let stringx = decryptedx.toString(CryptoJS.enc.Utf8)
    // console.log('stringx', stringx)
    if (CryptoJS && user?.id) {
      let hash = JSON.parse(localStorage.getItem('hash'));
      if (hash) {
        let encrypted = hash.replaceAll('CHAFMN', '/')
        let decrypted = CryptoJS.AES.decrypt(encrypted, 'chekkit-fmn-secret');
        let string = decrypted.toString(CryptoJS.enc.Utf8)
        let arr = string.split('&')
        if (Number(arr[0]) === Number(user?.id)) {
          localStorage.removeItem('hash')
          history.push(`/app/game-result/${hash}`)
        }
      }
    }
    // eslint-disable-next-line
  }, [CryptoJS, user?.id])

  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem('user'));
    if (userDetail) {
      history.push(location.pathname);
      dispatch(UserActions.updateUser(userDetail));
      setTimeout(() => {
        setUserLoading(false);
      }, 2000);
    } else if (location.pathname.length > 200) {
      setTimeout(() => {
        setUserLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setUserLoading(false);
      }, 2000);

    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (response.type) {
      let msg = '';
      if (typeof response.message === 'string') {
        msg = response.message;
      } else {
        response.message.forEach(msg => {
          showNotification(response, msg, '');
        });
        return;
      }
      showNotification(response, msg);
    } // eslint-disable-next-line
  }, [response]);

  const showNotification = (response, message) => {
    if (response.type === 'success') {
      toast.success(message, {icon: '👏'});
    } else {
      toast.error(message);
    }
  }

  useLayoutEffect(() => {
    let white = ['/app/leaderboard', '/app/my-wins', '/app/scan-tracker', '/app/scan', '/app/scan-result/:unique_code/:points', '/app/update-profile', '/app/change-password']
    let green = ['/app/prizes', '/app/dashboard', '/app/all-games', '/app/trivia-home/:slug', '/app/trivia-player/:slug', '/app/trivia-result/:hash', '/app/game-home/:id', '/app/game-result/:hash', '/app/my-account']
    let image = ['/', '/app/register', '/app/login']
    white.forEach(url => {
      if (url.toLocaleLowerCase() === location.pathname || location.pathname.includes('scan-result')) {
        setBackground('#FFF')
      }
    })
    green.forEach(url => {
      if (url.toLocaleLowerCase() === location.pathname || location.pathname.includes('trivia') || location.pathname.includes('game')) {
        setBackground('#479C46')
      }
    })
    image.forEach(url => {
      if (url.toLocaleLowerCase() === location.pathname) {
        setBackground('bg-field')
      }
    })
  }, [location])

  return (
    <>
      <Toaster
        toastOptions={{
          position: 'top-center',
          duration: 3000,
          // style: {
          //   padding: '10px',
          //   margin: '1rem',
          // },
        }}
      />
      {response.loading && (
        <BarLoader
          color={'#479C46'}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {userLoading && (
        <div className={`absolute top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center`}>
          <CgSpinner className={`text-yellow_dark animate-spin`} size={64} />
        </div>
      )}
      {!userLoading &&

          <div style={{backgroundColor: background}} className={`h-full overflow-auto ${background}`}>
            <div className='w-full h-full flex flex-col max-w-md mx-auto relative'>
              <div id='home' className='font-semibold text-lg cursor-pointer bg-gray-600 text-gray-300 bg-opacity-10 w-8 h-8 rounded-lg flex justify-center items-center -mb-2 mx-4 p-1 mt-4 z-50' onClick={() => history.push('/')}>
                <Home className='cursor-pointer' size={24} />
              </div>
              {!userLoading &&
                <Switch location={location}>
                  <Route exact path={['/', '/:slug', '/app/prizes', '/app/register', '/app/login']}>
                    <Onboarding />
                  </Route>
                  <Route exact path={['/app/dashboard', '/app/all-games']}>
                    <Dashboard />
                  </Route>
                  <Route exact path={['/app/leaderboard', '/app/my-wins']}>
                    <InfoManager />
                  </Route>
                  <Route exact path={['/app/scan-tracker', '/app/scan', '/app/scan-result/:unique_code/:points']}>
                    <Scanning />
                  </Route>
                  <Route exact path={['/app/my-account', '/app/update-profile', '/app/change-password']}>
                    <Profile />
                  </Route>
                  <Route exact path={['/app/trivia-home/:slug', '/app/trivia-player/:slug', '/app/trivia-result/:hash']}>
                    <Trivia />
                  </Route>
                  <Route exact path={['/app/game-home/:id', '/app/game-result/:hash']}>
                    <Game />
                  </Route>
                  <Route
                    render={() => {
                      return (
                        <div className={`bg`}>
                          <NotFound />;
                        </div>
                      );
                    }}
                  />
                </Switch>
              }
              <Route exact path={['/app/my-wins', '/app/scan-tracker', '/app/scan', '/app/scan-result/:unique_code/:points', '/app/update-profile', '/app/change-password', '/app/prizes', '/app/dashboard', '/app/all-games', '/app/trivia-home/:slug', '/app/trivia-player/:slug', '/app/trivia-result/:hash', '/app/game-home/:id', '/app/game-result/:hash', '/app/my-account', '/', '/app/register', '/app/login']}>
                <a className='text-gray-300 hover:text-gray-300 no-underline' href="https://chekkitapp.com/">
                  <div className='flex justify-center p-1 pb-4'>
                    <div className='flex items-center space-x-1  justify-center'>
                      <span className='text-gray-300 text-xs font-bold'>Powered by</span>
                      <Logo className='text-black h-4 w-14'  />
                    </div>
                  </div>
                </a>
              </Route>
            </div>
          </div>

      }
    </>
  );
}

export default App;
