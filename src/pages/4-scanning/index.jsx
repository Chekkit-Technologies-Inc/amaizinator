import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';

import ScanHistory from './scan-history';
import Scanning from './scanning';

const routes = [
  {
    name: 'ScanHistory',
    path: '/app/scan-history',
    component: ScanHistory,
    current: false,
  },
  {
    name: 'Scanning',
    path: ['/app/scanning', '/app/scan-result/:id'],
    component: Scanning,
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