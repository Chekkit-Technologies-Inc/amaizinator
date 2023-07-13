import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';

import TriviaHome from './trivia-home';
import TriviaPlayer from './trivia-player';
import TriviaResult from './trivia-result';

const routes = [
  {
    name: 'TriviaHome',
    path: '/app/trivia-home',
    component: TriviaHome,
    current: false,
  },
  {
    name: 'TriviaPlayer',
    path: '/app/trivia-player',
    component: TriviaPlayer,
    current: false,
  },
  {
    name: 'TriviaResult',
    path: '/app/trivia-result',
    component: TriviaResult,
    current: false,
  }
];

const Index = () => {
  const response = useSelector(state => state.response);
  const location = useLocation();
  const [items, setItems] = useState(routes);
  // const user = useSelector(state => state.user);

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
          <FiLoader className='animate-spin' size={16} />
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
