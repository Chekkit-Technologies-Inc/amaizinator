import React, { useEffect, useLayoutEffect, useState} from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactNotifications, Store } from 'react-notifications-component';

import Onboarding from './pages/1-onboarding';
import Dashboard from './pages/2-dashboard';
import InfoManager from './pages/3-info-manager';
import Scanning from './pages/4-scanning';
import Profile from './pages/5-profile'
import Trivia from './pages/trivia'
import NotFound from './pages/404-page';

import { notify } from './states/actions/response';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const response = useSelector(state => state.response);
  const [background, setBackground] = useState('bg-field')

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

  const showNotification = (response, message, title) => {
    Store.addNotification({
      message: message,
      type: response.type,
      title: title ? title : response.title,
      insert: 'top',
      container: 'top-right',
      dismiss: {
        duration: 2000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
      },
      onRemoval: () => {
        let timer;
        (() => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            dispatch(notify({ title: '', message: '', type: '', loading: false }));
          }, 2000);
        })();
      },
    });
  };

  useLayoutEffect(() => {
    let white = ['/app/leaderboard', '/app/my-wins', '/app/scan-history', '/app/scanning', '/app/scan-result/:id', '/app/update-profile', '/app/change-password']
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
    <div style={{backgroundColor: background}} className={`h-full overflow-auto ${background}`}>
      <ReactNotifications isMobile={true} />
      <div className='w-full h-full flex flex-col max-w-sm mx-auto relative'>
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

          <Route exact path={['/app/scan-history', '/app/scanning', '/app/scan-result/:id']}>
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
        </Switch>
      </div>
    </div>
  );
}

export default App;
