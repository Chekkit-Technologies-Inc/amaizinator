import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MyAccount from './my-account';
import UpdateProfile from './update-profile';
import ChangePassword from './change-password';

const routes = [
  {
    name: 'MyAccount',
    path: '/app/my-account',
    component: MyAccount,
    current: false,
  },
  {
    name: 'UpdateProfile',
    path: '/app/update-profile',
    component: UpdateProfile,
    current: false,
  },
  {
    name: 'ChangePassword',
    path: '/app/change-password',
    component: ChangePassword,
    current: false,
  },
];

const Index = () => {
  const history = useHistory()
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
