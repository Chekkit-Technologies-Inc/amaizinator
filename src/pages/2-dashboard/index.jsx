import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './dashboard';
import AllGames from './all-games';

const routes = [
  {
    name: 'Dashboard',
    path: '/app/dashboard',
    component: Dashboard,
    current: false,
  },
  {
    name: 'AllGames',
    path: '/app/all-games',
    component: AllGames,
    current: false,
  }
];

const Index = () => {
  const location = useLocation();
  const [items, setItems] = useState(routes);
  const user = useSelector(state => state.user);
  const history = useHistory()

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
