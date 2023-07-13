import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FadeIn from 'react-fade-in/lib/FadeIn';

import Button from '../button/button';

const AppDialog = ({ open, setOpen, callBack, variant }) => {


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        style={{ zIndex: 100 }}
        className={`z-50 fixed inset-0 overflow-y-auto px-4`}
        onClose={setOpen}
      >
        <div className='flex justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0 outline-none focus:outline-none'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div>

              {variant === 'terms' && (
                <div
                className={`inline-block bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 text-center  overflow-hidden shadow-xl transform transition-all mb-8 mt-24  align-middle max-w-3xl w-full space-y-2`}
                >

                    <FadeIn className='p-4 curly max-h-96 overflow-auto'>
                      <div className='text-lg font-semibold pb-6'>Terms & Conditions</div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>

                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>

                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                      <div className='leading-6 tracking-wide text-sm'>
                        Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.
                      </div>
                    </FadeIn>

                    <div className='p-4 bg-yellow-100 shadow-inner'>
                      <Button className={'focus:outline-none outline-none'} text={'I accept'} onClick={() => {
                            setOpen(false);
                            if (callBack) callBack(true)
                          }} />
                    </div>
                </div>
              )}

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AppDialog;
