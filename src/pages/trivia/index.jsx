import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';

import TriviaHome from './trivia-home';
import TriviaPlayer from './trivia-player';
import TriviaResult from './trivia-result';

const routes = [
  {
    name: 'TriviaHome',
    path: '/app/trivia-home/:slug',
    component: TriviaHome,
    current: false,
  },
  {
    name: 'TriviaPlayer',
    path: '/app/trivia-player/:slug',
    component: TriviaPlayer,
    current: false,
  },
  {
    name: 'TriviaResult',
    path: '/app/trivia-result/:points',
    component: TriviaResult,
    current: false,
  }
];

const Index = () => {
  const history = useHistory()
  const response = useSelector(state => state.response);
  const location = useLocation();
  const [items, setItems] = useState(routes);
  const user = useSelector(state => state.user);

  useLayoutEffect(() => {
    if (!user?.token) {
      history.push('/app/login');
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    let arr = location.pathname.split('/');
    setItems(
      items.map(item => {
        item.current =
          item.name
            .replace(' ', '-')
            .replace('&', '')
            .replace(' ', '')
            .toLocaleLowerCase()
            .includes(arr[arr.length - 1].toLocaleLowerCase())
        return item;
      }),
    );
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      {response.loading && (
        <div className='flex justify-center p-4'>
          <FiLoader className='animate-spin text-yellow_dark' size={16} />
        </div>
      )}

      <Switch>
        {items.map((route, i) => {
          return (
            <Route exact key={i} path={route.path}>
              <route.component />
            </Route>
          );
        })}
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default Index;
