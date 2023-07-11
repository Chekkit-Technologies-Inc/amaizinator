import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LogoImage } from '../../../assets/logo.svg';

const Logo = ({ size, dark }) => {
  const history = useHistory();
  return <LogoImage onClick={() => history.push('/')} width={size} className={`${dark ? 'text-white' : 'text-brand_blue'} cursor-pointer`} />;
};

export default Logo;
