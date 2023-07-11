import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactNotifications, Store } from 'react-notifications-component';

import Setup from './pages/setup';
import Spin from './pages/trivia';
import NotFound from './pages/404-page';

import { notify } from './states/actions/response';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const response = useSelector(state => state.response);

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

  return (
    <>
      <ReactNotifications isMobile={true} />
      <div className='w-full h-full max-w-lg mx-auto relative'>
        <Switch location={location}>
          <Route path={['/', '/create-account', '/phone-verify', '/login']}>
            <Setup />
          </Route>
          <Route exact path={'home'}>
            <Spin />
          </Route>
          <Route exact path={['trivia/result', 'trivia/:id']}>
            <Spin />
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
    </>
  );
}

export default App;
