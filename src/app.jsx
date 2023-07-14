import React, { useEffect, useLayoutEffect, useState} from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';

import Onboarding from './pages/1-onboarding';
import Dashboard from './pages/2-dashboard';
import InfoManager from './pages/3-info-manager';
import Scanning from './pages/4-scanning';
import Profile from './pages/5-profile'
import Trivia from './pages/trivia'
import NotFound from './pages/404-page';

import { UserActions } from './states/actions';

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
  };

  useLayoutEffect(() => {
    let white = ['/app/leaderboard', '/app/my-wins', '/app/scan-tracker', '/app/scan', '/app/scan-result/:id', '/app/update-profile', '/app/change-password']
    let green = ['/app/prizes', '/app/dashboard', '/app/all-games', '/app/trivia-home', '/app/trivia-player', '/app/trivia-result', '/app/my-account']
    let image = ['/', '/app/register', '/app/login']
    white.forEach(url => {
      if (url.toLocaleLowerCase() === location.pathname || location.pathname.includes('scan-result')) {
        setBackground('#FFF')
      }
    })
    green.forEach(url => {
      if (url.toLocaleLowerCase() === location.pathname) {
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
      {userLoading && (
        <div className={`absolute top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center`}>
          <CgSpinner className={`text-yellow_dark animate-spin`} size={64} />
        </div>
      )}
      {!userLoading && <div style={{backgroundColor: background}} className={`h-full overflow-auto ${background}`}>
        <div className='w-full h-full flex flex-col max-w-sm mx-auto relative'>
        {!userLoading && <Switch location={location}>
            <Route exact path={['/', '/:slug', '/app/prizes', '/app/register', '/app/login']}>
              <Onboarding />
            </Route>
            <Route exact path={['/app/dashboard', '/app/all-games']}>
              <Dashboard />
            </Route>
            <Route exact path={['/app/leaderboard', '/app/my-wins']}>
              <InfoManager />
            </Route>
            <Route exact path={['/app/scan-tracker', '/app/scan', '/app/scan-result/:id']}>
              <Scanning />
            </Route>
            <Route exact path={['/app/my-account', '/app/update-profile', '/app/change-password']}>
              <Profile />
            </Route>
            <Route exact path={['/app/trivia-home', '/app/trivia-player', '/app/trivia-result']}>
              <Trivia />
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
          </Switch>}
        </div>
      </div>}
    </>
  );
}

export default App;
