import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import Welcome from './welcome';
import Prizes from './prizes';
import Register from './register';
import Login from './login';

const routes = [
  {
    name: 'Welcome',
    path: ['/', '/:slug'],
    component: Welcome,
    current: false,
  },
  {
    name: 'Prizes',
    path: '/app/prizes',
    component: Prizes,
    current: false,
  },
  {
    name: 'Register',
    path: '/app/register',
    component: Register,
    current: false,
  },
  {
    name: 'Login',
    path: '/app/login',
    component: Login,
    current: false,
  },
];

const Index = () => {
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
