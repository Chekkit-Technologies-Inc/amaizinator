import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import InputBox from '../../../components/input-box/input-box';
import SelectBox from '../../../components/select-box/select-box';
import Button from '../../../components/button/button';

import {UserActions, ResponseActions} from '../../../states/actions'

import useDocumentTitle from '../../../hooks/use-document-title';

const form = {
  phone_number: '',
  password: '',
};

const Login = ({ className }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [userDetail, setUserDetail] = useState(form);
  const [canSubmit, setCanSubmit] = useState(false);
  useDocumentTitle('Login')

  useEffect(() => {
    if (user?.token) {
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/app/dashboard');
    } else {
      localStorage.removeItem('user');
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (form && userDetail) {
      // eslint-disable-next-line
      const disable = Object.keys(form).every(k => userDetail[k] && userDetail[k] != 'Select options');
      setCanSubmit(disable);
    }
    // eslint-disable-next-line
  }, [form, userDetail]);

  const processField = field => {
    return field
      .replaceAll('_', ' ')
      .split(' ')
      .map(element => {
        return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
      })
      .join(' ');
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetail({ ...userDetail, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let phone = userDetail.phone_number
    if (userDetail.phone_number.length === 11) {
      phone = userDetail.phone_number.slice(1, 11)
    }
    if (userDetail.phone_number.includes('+234')) {
      phone = userDetail.phone_number.replace('+234', '')
    }
    if (userDetail.phone_number.startsWith('234')) {
      phone = userDetail.phone_number.replace('234', '')
    }
    if (phone.length > 11) {
      dispatch(ResponseActions.notify({ title: "", message: 'Incorrect phone number or pin.', type: 'error', loading: false }));
      return
    }
    dispatch(UserActions.login({username: phone, password: userDetail.password}))
  }


  return (
    <form onSubmit={handleSubmit} className={`${className} flex-1 p-4 pb-12 flex flex-col text-gray-800`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>
      <FadeIn className='my-2 font-semibold text-xl curly'>Participate in trivia game</FadeIn>
      <FadeIn className='space-y-6 my-4'>
        {form &&
          Object.keys(form).map(field => {
            if (form[field].options) {
              return (
                <label key={field} className='block capitalize font-semibold'>
                  <span className='font-medium'>{processField(field)}</span>
                  <SelectBox
                    className={`bg-white`}
                    defaultValue={form[field].options[0]}
                    onValueChange={handleInputChange}
                    value={userDetail[field]}
                    name={field}
                    options={form[field].options}
                  />
                </label>
              );
            } else {
              return (
                <label key={field} className='block capitalize'>
                  <span className='font-medium'>{processField(field)}</span>
                  <InputBox
                    className={`bg-white text-green_light`}
                    placeholder={processField(field)}
                    inputType={field === 'phone_number' ? `phone_number` : field === 'password' ? `password` : `text`}
                    onValueChange={handleInputChange}
                    value={userDetail[field]}
                    name={field}
                  />
                </label>
              );
            }
          })}
      </FadeIn>
      <div className='flex justify-center'>
        <Button type={'submit'} className={`w-full ${!canSubmit ? 'pointer-events-none opacity-50' : ''}`} text={'Login'} />
      </div>
      <div className='text-center pt-6'>Don't have an account? <Link to='/app/register' className='text-yellow_dark hover:text-yellow_dark underline font-semibold cursor-pointer'>Register</Link></div>
    </form>
  );
};

export default Login;
