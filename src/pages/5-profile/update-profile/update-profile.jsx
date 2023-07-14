import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from 'react-redux';

import InputBox from '../../../components/input-box/input-box';
import SelectBox from '../../../components/select-box/select-box';
import Button from '../../../components/button/button';

import useDocumentTitle from '../../../hooks/use-document-title';

// import { states } from '../../../util';

const form = {
  full_name: '',
  phone_number: '',
  date_of_birth: '',
  // location: { options: states },
};

const UpdateProfile = ({ className }) => {
  const history = useHistory()
  const [userDetail, setUserDetail] = useState(form);
  const [canSubmit, setCanSubmit] = useState(false);
  const user = useSelector(state => state.user)
  useDocumentTitle('Update Profile')

  useEffect(() => {
    if (user?.id) {
      let data = {
        full_name: `${user?.first_name} ${user?.last_name}`,
        phone_number: `0${user?.phone_number}`,
        date_of_birth: user?.date_of_birth ? user?.date_of_birth : user?.age_range
      }
      setUserDetail(data)
    }
  }, [user])

  useEffect(() => {
    if (form && userDetail) {
      // eslint-disable-next-line
      const disable = Object.keys(form).every(k => userDetail[k] && userDetail[k] != 'Select options')
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
  }


  return (
    <>
      <form onSubmit={handleSubmit} className={`${className} flex-1 p-4 pb-12 flex flex-col text-gray-800`}>
        <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
          &larr;
        </div>
        <div className='font-bold text-lg mt-4'>Update Your Profile</div>
        <FadeIn className='space-y-6 my-4'>
          {form &&
            Object.keys(form).map(field => {
              if (form[field].options) {
                return (
                  <label key={field} className='block capitalize font-semibold'>
                    <span className='font-medium'>{processField(field)}</span>
                    <SelectBox
                      className={`bg-yellow-50`}
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
                      className={`bg-yellow-50 text-green_light`}
                      placeholder={processField(field)}
                      inputType={field === 'phone_number' ? `phone_number` : field === 'date_of_birth' ? 'date' : `text`}
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
          <Button type={'submit'} className={'w-full'} text={'Save Changes'} disabled={!canSubmit} />
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
