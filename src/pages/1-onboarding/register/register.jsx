import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom';

import InputBox from '../../../components/input-box/input-box';
import SelectBox from '../../../components/select-box/select-box';
import Button from '../../../components/button/button';
import Dialog from '../../../components/dialog/dialog';

import { states } from '../../../util';

const form = {
  name: '',
  phone_number: '',
  age_range: { options: ['Select Options', '18 - 24', '25 - 35', '36 - 45', '50 - above'] },
  location: { options: states },
  password: '',
};

const Register = ({ className }) => {
  const history = useHistory()
  const [userDetail, setUserDetail] = useState(form);
  const [canSubmit, setCanSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [accept, onAcceptChange] = useState(false);

  useEffect(() => {
    if (form && userDetail) {
      // eslint-disable-next-line
      const disable = Object.keys(form).every(k => userDetail[k] && userDetail[k] != 'Select options') && accept
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


  return (
    <>
      <form className={`${className} flex-1 p-4 pb-12 flex flex-col text-gray-800`}>
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
                      inputType={field === 'phone_number' ? `phone_number` : field === 'password' ? `password` : field === 'date_of_birth' ? 'date' : `text`}
                      onValueChange={handleInputChange}
                      value={userDetail[field]}
                      name={field}
                    />
                  </label>
                );
              }
            })}
            <div className='flex items-center space-x-2'>
                <input type='checkbox' onChange={e => onAcceptChange(e.target.checked)} checked={accept} />
                <div className='flex items-center space-x-2'>
                  <span>Accept </span>
                  <div onClick={() => setOpen(true)} className='text-yellow_dark underline cursor-pointer font-semibold'>
                    Terms & Conditions
                  </div>
                </div>
              </div>
        </FadeIn>
        <div className='flex justify-center'>
          {/* <Button type={'submit'} className={'w-full'} text={'Submit'} disabled={!canSubmit} /> */}
          <Button onClick={() => history.push('/app/dashboard')} className={'w-full'} text={'Submit'} disabled={!canSubmit} />
        </div>
        <div className='text-center pt-6'>Already have an account? <Link to='/app/login' className='text-yellow_dark hover:text-yellow_dark underline font-semibold cursor-pointer'>Log in</Link></div>
      </form>
      {open && <Dialog open={open} setOpen={setOpen} variant={'terms'} callBack={(accepted) => {
        if (accepted) onAcceptChange(accepted)
      }} />}
    </>
  );
};

export default Register;
