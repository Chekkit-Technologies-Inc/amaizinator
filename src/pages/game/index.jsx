import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'

import GameHome from './game-home';
import GameResult from './game-result';

import {TriviaActions} from '../../states/actions'

const routes = [
  {
    name: 'GameHome',
    path: '/app/game-home/:id',
    component: GameHome,
    current: false,
  },
  {
    name: 'GameResult',
    path: '/app/game-result/:hash',
    component: GameResult,
    current: false,
  }
];

const Index = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const [items, setItems] = useState(routes);

  useEffect(() => {
    dispatch(TriviaActions.fetchGames())
    // eslint-disable-next-line
  }, [])

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
  );
};

export default Index;
