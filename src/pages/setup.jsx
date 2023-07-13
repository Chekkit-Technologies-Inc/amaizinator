// import React, { useState, useRef, useEffect } from 'react';
// import { useHistory, Route, Switch } from 'react-router-dom';
// import FadeIn from 'react-fade-in/lib/FadeIn';
// import { useDispatch, useSelector } from 'react-redux';
// import AuthCode from 'react-auth-code-input';
// import { FiArrowRight } from 'react-icons/fi';
// import { getCountryCallingCode } from 'react-phone-number-input/mobile';

// import Button from '../components/button';
// import InputBox from '../components/input-box';

// import SelectBox from '../components/select-box/select-box';

// import { ReactComponent as AmazingDay } from '../assets/amazing-day.svg';
// import { ReactComponent as Phone } from '../assets/enter-phone.svg';

// import { UserActions, ResponseActions, RewardActions } from '../states/actions';

// const detail = {
//   name: '',
//   email: '',
//   phone_number: '',
//   age_range: '',
//   income_range: '',
//   device_type: '',
//   size: '',
//   monthly_revenue: '',
//   marketing_budget: '',
//   industry: '',
//   job_function: '',
//   user_type: 'user',
// };

// const form = {
//   name: '',
//   phone_number: '',
//   age_range: { options: ['Select option', '18 - 24', '25 - 35', '36 - 45', '50 - above'] },
//   password: '',
// };

// const Setup = () => {
//   const AuthInputRef = useRef(null);
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user);
//   const [userDetail, setUserDetail] = useState(detail);
//   const [user_type, setUser_Type] = useState([
//     { title: 'Pharmacy', selected: true },
//     { title: 'Pharma', selected: false },
//   ]);
//   const [otpSent, setOptSent] = useState(false);
//   const [serverOtp, setServerOtp] = useState();
//   const [canSubmit, setCanSubmit] = useState(false);

//   const processField = field => {
//     return field
//       .replace('_', ' ')
//       .split(' ')
//       .map(element => {
//         return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
//       })
//       .join(' ');
//   };

//   useEffect(() => {
//     if (user && Object.keys(user).length > 3) {
//       setUserDetail({
//         ...userDetail,
//         ...user,
//         name: `${user.first_name} ${user.last_name}`,
//         phone_number: `${user.call_code}${user.phone_number}`,
//         user_type: user.membership_type,
//       });
//     }
//     // eslint-disable-next-line
//   }, [user]);

//   useEffect(() => {
//     if (form && userDetail) {
//       // eslint-disable-next-line
//       const disable = Object.keys(form).every(k => userDetail[k] && userDetail[k] != 'Select options');
//       setCanSubmit(disable);
//     }
//     // eslint-disable-next-line
//   }, [form, userDetail]);

//   useEffect(() => {
//     let localSlug = localStorage.getItem('slug');
//     if (localSlug) {
//       dispatch(RewardActions.fetchRewards(localSlug));
//     } else {
//       dispatch(RewardActions.fetchRewards('string-8ce07701be17'));
//       localStorage.setItem('slug', 'string-8ce07701be17');
//     }
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (userDetail.otp && userDetail.otp.length === 6) {
//       setTimeout(() => {
//         verifyOtp();
//       }, 500);
//     }
//     // eslint-disable-next-line
//   }, [userDetail.otp]);

//   const requestOTP = e => {
//     e.preventDefault();
//     const countryCode = '+' + getCountryCallingCode(user?.code);
//     dispatch(UserActions.requestOtp(localStorage.getItem('slug'), userDetail.phone_number, countryCode))
//       .then(res => {
//         if (res?.data?.user?.id) {
//           history.push('/app/full-details');
//         } else if (res?.data?.code) {
//           // console.log(res?.data?.code);
//           setServerOtp(res?.data?.code);
//           setOptSent(true);
//           history.push('/app/phone-verify');
//         }
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   const retryRequestOTP = () => {
//     setOptSent(false);
//     const countryCode = '+' + getCountryCallingCode(user?.code);
//     dispatch(UserActions.requestOtp(localStorage.getItem('slug'), userDetail.phone_number, countryCode))
//       .then(res => {
//         if (res?.data?.user?.id) {
//           history.push('/app/full-details');
//         } else if (res?.data?.code) {
//           // console.log(res?.data?.code);
//           setServerOtp(res?.data?.code);
//           setOptSent(true);
//           AuthInputRef.current?.focus();
//         }
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   const handleOtpChange = res => {
//     setUserDetail({ ...userDetail, otp: res });
//   };

//   const verifyOtp = () => {
//     if (userDetail.otp && Number(serverOtp) === Number(userDetail.otp)) {
//       history.push('/app/choose-type');
//     } else {
//       dispatch(ResponseActions.notify({ type: 'danger', title: 'Error', message: 'Incorrect OTP' }));
//     }
//   };

//   const selectType = idx => {
//     setUser_Type(
//       user_type.map((d, i) => {
//         if (idx === i) {
//           d.selected = true;
//           setUserDetail({ ...userDetail, user_type: d.title === 'Company' ? 'company' : 'user' });
//         } else {
//           d.selected = false;
//         }
//         return d;
//       }),
//     );
//   };

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setUserDetail({ ...userDetail, [name]: value });
//   };

//   const handlePhoneChange = phone_number => {
//     if (phone_number) {
//       setUserDetail({ ...userDetail, phone_number });
//     }
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     const country_code = '+' + getCountryCallingCode(user?.code);
//     const user_type = userDetail.user_type;

//     let keys = [];
//     let data = { user_type, country_code };
//     keys = Object.keys(userDetail).filter(k => Object.keys(form).some(l => l === k));
//     keys.forEach(d => {
//       data[d] = userDetail[d];
//     });
//     dispatch(UserActions.authenticate(data))
//       .then(_ => {
//         setTimeout(() => {
//           history.push('/app/spin');
//         }, 1000);
//       })
//       .catch(console.log);
//   };

//   return (
//     <Switch>
//       <Route exact path={'/'}>
//         <div className='flex flex-col h-full p-6'>
//           <div className='text-gray-800'>
//             <div className='font-medium'>Know More About</div>
//             <div className='font-semibold text-lg'>Amazing Day Product</div>
//             <div className='my-4 rounded-3xl overflow-hidden'>
//               <AmazingDay className='w-full h-full' />
//             </div>
//           </div>

//           <div style={{ backgroundColor: '#4C8541' }} className='p-6 rounded-3xl text-white h-full flex flex-col justify-between space-y-6'>
//             <div>
//               Golden Penny Amaizing Day is a soft-flakes Instant Breakfast cereal made from the right Combination of nutritious natural ingredients which are
//               Whole Maize, Pure Soya Bean flour and Cassava flour. It is also fortified with Vitamins and Minerals that support the growth and development of a
//               healthy body, strong bones, and sharp eyes.
//             </div>
//             <div className='space-y-6'>
//               <Button className={'w-full text-gray-900'} text={'Enter Trivia'} onClick={() => history.push('/create-account')} />
//               <Button className={'w-full bg-opacity-25 text-white'} text={'How To Play?'} onClick={() => history.push('/')} />
//             </div>
//           </div>
//         </div>
//       </Route>
//       <Route exact path={'/create-account'}>
//         <form onSubmit={handleSubmit} className='flex flex-col h-full justify-between p-6 text-gray-800'>
//           <FadeIn className='space-y-6 overflow-y-auto h-full'>
//             <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
//               &larr;
//             </div>
//             <div className='font-semibold text-lg'>Fill Your Details</div>
//             <FadeIn className='space-y-6'>
//               {form &&
//                 Object.keys(form).map(field => {
//                   if (form[field].options) {
//                     return (
//                       <label key={field} className='block capitalize'>
//                         {processField(field)}
//                         <SelectBox
//                           defaultValue={'Select option'}
//                           onValueChange={handleInputChange}
//                           value={userDetail[field]}
//                           name={field}
//                           options={form[field].options}
//                         />
//                       </label>
//                     );
//                   } else {
//                     return (
//                       <label key={field} className='block capitalize'>
//                         {processField(field)}
//                         <InputBox
//                           placeholder={processField(field)}
//                           inputType={field === 'phone_number' ? `phone_number` : field === 'password' ? `password` : `text`}
//                           onValueChange={handleInputChange}
//                           value={userDetail[field]}
//                           name={field}
//                         />
//                       </label>
//                     );
//                   }
//                 })}
//             </FadeIn>
//           </FadeIn>
//           <div className='flex justify-center mt-6'>
//             <Button type={'submit'} className={'w-full'} text={'Spin Wheel'} disabled={!canSubmit} />
//           </div>
//         </form>
//       </Route>
//       <Route exact path={'/app/enter-phone'}>
//         <div className='flex flex-col h-full justify-between p-6 text-white'>
//           <FadeIn className='space-y-6'>
//             <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
//               &larr;
//             </div>
//             <div className='font-semibold text-lg'>Continue With Phone Number</div>
//             <Phone className='mx-auto' />
//             <div className='text-xs text-center'>You will receive a 6-digit code to verify next</div>
//             <div className='flex justify-center'>
//               <label className='w-full'>
//                 Enter your phone number
//                 <InputBox
//                   inputType={'tel'}
//                   inputName={'phone_number'}
//                   buttonText={<FiArrowRight className='font-semibold' size={26} />}
//                   value={userDetail.phone_number}
//                   onInputChange={handlePhoneChange}
//                   onButtonClick={requestOTP}
//                   placeholder={'Phone Number'}
//                 />
//               </label>
//             </div>
//           </FadeIn>
//         </div>
//       </Route>
//       <Route exact path={'/app/phone-verify'}>
//         <div className='flex flex-col h-full justify-between p-6 text-white'>
//           <FadeIn className='space-y-6'>
//             <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
//               &larr;
//             </div>
//             <div className='font-semibold text-lg'>Verify Phone Number</div>
//             <div className='flex justify-center space-x-4'>
//               <AuthCode
//                 allowedCharacters='numeric'
//                 onChange={handleOtpChange}
//                 length={6}
//                 containerClassName='space-x-1 flex flex-shrink-0'
//                 inputClassName='w-8 h-9 rounded text-white font-semibold text-lg text-center bg-white bg-opacity-10'
//                 ref={AuthInputRef}
//               />
//             </div>
//             {otpSent && (
//               <div className='text-xs text-center text-gray-100'>
//                 <span>OPT sent to </span>
//                 <span className='text-primary'>{userDetail.phone_number}</span>
//               </div>
//             )}
//             <div className='text-xs text-center'>
//               <span>Didn't receive code? </span>
//               <span onClick={retryRequestOTP} className='font-semibold cursor-pointer'>
//                 Request Again
//               </span>
//             </div>
//             <div className='flex justify-center'>
//               <Button className={'w-60 mx-auto'} text={'Verify Account'} onClick={verifyOtp} />
//             </div>
//           </FadeIn>
//         </div>
//       </Route>
//       <Route exact path={'/app/choose-type'}>
//         <div className='flex flex-col h-full justify-between p-6 text-white'>
//           <FadeIn className='space-y-6'>
//             <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
//               &larr;
//             </div>
//             <div className='font-semibold text-lg'>Choose User Type</div>
//             <FadeIn className='flex items-center justify-center space-x-4'>
//               {user_type.map((d, i) => {
//                 return (
//                   <div
//                     key={i}
//                     onClick={() => selectType(i)}
//                     className={`${
//                       d.selected ? `border-2 border-primary` : `border border-gray-500`
//                     } w-40 h-40 rounded flex justify-center items-center cursor-pointer hover:bg-primary font-semibold`}
//                   >
//                     {d.title}
//                   </div>
//                 );
//               })}
//             </FadeIn>
//             <div className='flex justify-center'>
//               <Button className={'w-60 mx-auto'} text={'Continue'} onClick={() => history.push('/app/full-details')} />
//             </div>
//           </FadeIn>
//         </div>
//       </Route>
//     </Switch>
//   );
// };

// export default Setup;
