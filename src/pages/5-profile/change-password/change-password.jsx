import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import InputBox from '../../../components/input-box/input-box';
import Button from '../../../components/button/button';

const form = {
  old_password: '',
  new_password: '',
};

const ChangePassword = ({ className }) => {
  const history = useHistory()
  const [userDetail, setUserDetail] = useState(form);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (form && userDetail) {
      // eslint-disable-next-line
      const disable = Object.keys(form).every(k => userDetail[k])
      setCanSubmit(disable);
    }
    // eslint-disable-next-line
  }, [form, userDetail]);

  const processField = field => {
    return field
      .replace('_', ' ')
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
        <div className='font-bold text-lg mt-4'>Password Setting</div>
        <FadeIn className='space-y-6 my-4'>
          {form &&
            Object.keys(form).map(field => {

                return (
                  <label key={field} className='block capitalize'>
                    <span className='font-medium'>{processField(field)}</span>
                    <InputBox
                      className={`bg-yellow-50 text-green_light`}
                      placeholder={processField(field)}
                      inputType={`password`}
                      onValueChange={handleInputChange}
                      value={userDetail[field]}
                      name={field}
                    />
                  </label>
                );

            })}
        </FadeIn>
        <div className='flex justify-center'>
          <Button type={'submit'} className={'w-full'} text={'Change Password'} disabled={!canSubmit} />
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
