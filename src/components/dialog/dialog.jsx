import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FadeIn from 'react-fade-in/lib/FadeIn';
// import ReactTextFormat from 'react-text-format';

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

              {variant === 'how-to-earn-points' && (
                <div
                className={`inline-block bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 text-left  overflow-hidden shadow-xl transform transition-all mb-8 mt-24 align-middle max-w-3xl w-full space-y-2 text-gray-800`}
                >

                    <FadeIn className='p-4 max-h-96 overflow-auto space-y-6 w-72'>

                      <h5 className=' font-bold text-center'>How To Earn Points</h5>

                      <p className='text-base w-full text-gray-600'>Play games, answer trivia questions and scan receipts.</p>

                    </FadeIn>

                    <div className='p-4 bg-yellow-100 shadow-inner'>
                      <Button className={'focus:outline-none outline-none'} text={'Close'} onClick={() => {
                            setOpen(false);
                          }} />
                    </div>
                </div>
              )}

              {variant === 'terms' && (
                <div
                className={`inline-block bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 text-left  overflow-hidden shadow-xl transform transition-all mb-8 mt-24  align-middle max-w-3xl w-full space-y-2 text-gray-800`}
                >

                    <FadeIn className='p-4 max-h-96 overflow-auto space-y-6'>


                      <h5 className=' font-semibold underline inline-block'>Section 1: Terms & Conditions</h5>


                      <h5 className='font-semibold text-base inline-block'>1. General principles</h5>


                      <p className='text-sm inline-block'>1.1. Flour Mills of Nigeria is strongly committed to respecting the rights of its clients/consumers and users, including their rights to privacy and data protection. As part of this commitment, Flour Mills fully complies with its requirements under the Nigeria Data Protection Regulation 2019 (the Regulation).</p>


                      <p className='text-sm inline-block'>1.2. The general principles of data processing, as set out in the Regulation are: (a) Personal data shall only be collected and processed in accordance with specific, legitimate and lawful purpose consented to by the data subject; provided that:</p>


                      <p className='text-sm inline-block'>(i) Further processing may be done only for archiving, scientific research, historical research or statistical purposes for the public interest;</p>


                      <p className='text-sm inline-block'>(ii) any person or entity carrying out or purporting to carry out data processing under the provision of this paragraph shall not transfer any personal data to any person;</p>


                      <p className='text-sm inline-block'>(b) Personal data shall be adequate, accurate and without prejudice to the dignity of the human person;</p>


                      <p className='text-sm inline-block'>(c) Personal data shall be stored only for the period within which it is reasonably needed; and</p>


                      <p className='text-sm inline-block'>(d) Personal data shall be secured against all foreseeable hazards and breaches such as theft, cyberattack, viral attack, dissemination, manipulations of any kind, damage by rain, fire or exposure to other natural elements.</p>


                      <p className='text-sm inline-block'>1.3. The collection, processing and sharing of users’ personal data is governed by our B2C Privacy and Data Protection Policy.</p>


                      <h5 className='font-semibold text-base inline-block'>2. Data collection</h5>


                      <p className='text-sm inline-block'>2.1. Flour Mills of  Nigeria requires the following personal data from its customers/consumers in order to be able to provide its services as relating to the Amaizing Day Cereal Campaign: ● First name ● Last name ● Telephone number ● Email address ● T&C acceptance ● demographic data</p>


                      <h5 className='font-semibold text-base inline-block'>3. Purposes for collection and processing of data</h5>


                      <p className='text-sm inline-block'>3.1. Flour Mills of  Nigeria processes customer/consumers’ personal data only for the purposes set out in this contract, including for access to identify the mobile application user, allocate the appropriate reward based on user activities, understand user behaviours, extract mobile application usage insights, serve the terms and conditions, between Flour Mills of Nigeria and the customer/consumers</p>


                      <h5 className='font-semibold text-base inline-block'>4. Data security</h5>


                      <p className='text-sm inline-block'>4.1. Personal data collected by Flour Mills of Nigeria is stored for only as long as is necessary for the purposes set out in 3.1. Once it is no longer necessary, personal data is permanently deleted.</p>


                      <p className='text-sm inline-block'>4.2. Flour Mills of Nigeria uses the following methods to ensure that all personal data it stores is secure:</p>


                      <div className='text-sm inline-block'>
                        <p>  ●  All personal data is hashed and encrypted, before logging onto a distributed ledger system (blockchain) which ensures that it cannot be hacked or manipulated;</p>
                        <p>  ●  All personal data is secured through a publicly traded cloud database management and security company.</p>
                      </div>


                      <h5 className='font-semibold text-base inline-block'>5. Sharing data</h5>


                      <p className='text-sm inline-block'>5.1. Flour Mills of Nigeria and its associated project vendor (Chekkit Technologies Ltd.) will not share customer/consumers’ personal data with any third parties, save where required by law. Where demands or requests for customer/consumers’ personal data are received by Flour Mills of Nigeria, Flour Mills of Nigeria shall ensure that they have been made in compliance with the relevant legislation, and provide only as much personal data as is strictly required.</p>


                      <h5 className='font-semibold text-base inline-block'>6. customer/consumers’ data rights (accessing, modifying and deleting your data)</h5>


                      <p className='text-sm inline-block'>6.1. The following rights are in addition to those set out in Part Three of the Regulation.</p>



                      <p className='text-sm inline-block'>6.2. A customer/consumers can request a copy of all personal data held by Flour Mills of Nigeria relating to them by making a request to Flour Mills of Nigeria’s Data Protection Officer via crm@fmnplc.com or 0700CHEKKITAPP (07002435548277) details of their account information (name, telephone number and email address). A copy of that personal data shall be provided to the customer/consumers without charge as soon as practicable, and in any event within 30 days.</p>



                      <p className='text-sm inline-block'>6.3. A customer/consumers can request that any inaccurate data relating to them be corrected by utilising the edit profile button in the menu tab on the platform with details of their account information (name, telephone number and email address) and noting the information that needs to be corrected. The personal data shall be corrected without charge as soon as practicable.</p>


                      <p className='text-sm inline-block'>6.4. A customer/consumers can request that all data relating to them be deleted by making a request to Flour Mills of Nigeria’s Data Protection Officer via crm@fmnplc.com or 0700CHEKKITAPP (07002435548277) with details of their account information (name, telephone number and email address). The personal data shall be deleted without charge as soon as practicable, and in any event within 30 days, in the following circumstances:</p>


                      <p className='text-sm inline-block'>(a) the personal data is no longer necessary in relation to the purposes for which it was collected or processed;</p>


                      <p className='text-sm inline-block'>(b) the customer/consumers withdraw their consent to the data being processed;</p>


                      <p className='text-sm inline-block'>(c) the customer/consumers object to the processing and there are no overriding legitimate grounds for the processing;</p>


                      <p className='text-sm inline-block'>(d) the personal data has been unlawfully processed; or</p>


                      <p className='text-sm inline-block'>(e) the personal data must be erased for compliance with a legal obligation in Nigeria.</p>


                      <p className='text-sm inline-block'>6.5: A customer/consumer who believes that Flour Mills of Nigeria has violated this Privacy and Data Protection Policy may make a complaint by emailing crm@fmnplc.com or 0700CHEKKITAPP (07002435548277) with details of the alleged violation. Where Flour Mills of Nigeria has been found to have violated this Privacy and Data Protection Policy, it shall provide an appropriate remedy within 30 days, which may include correction or deletion of personal data, an apology, and/or compensation for any financial loss caused as a result of the violation.</p>


                      <p className='text-sm inline-block'>6.6. Where a request or complaint made under 6.2, 6.3, 6.4 or 6.5 is manifestly ill-founded or excessive, in particular, because of its repetitive character, Flour Mills of Nigeria reserves the right to charge a reasonable fee considering the administrative costs of providing the information or communication or taking the action requested; or to write a letter to the customer/consumers stating refusal act on the request.</p>


                      <h5 className='font-semibold text-base inline-block'>7. Campaign Duration</h5>


                      <p className='text-sm inline-block'>7.1 The campaign will last for a period of August 1 - August 31, 2023, after which it will be brought to an end.</p>






                      <h5 className=' font-semibold underline inline-block pt-6'>Section 2: Participation, Ranking and Earning of Rewards in Amaizing Day Cereal</h5>


                      <h5 className='font-semibold text-base inline-block'>1. Participation</h5>


                      <p className='text-sm inline-block'>1.1 Buy any pack of Amaizing Day Cereal, look for the QR Code printed on the pack and scan it with any QR Code scanner on your smartphone to access the official campaign micro-site.</p>


                      <p className='text-sm inline-block'>1.2 Create an account on the platform by providing your personal details, including children from 7 years of age to 15 years only. Parents and guardians are also eligible to participate.</p>


                      <p className='text-sm inline-block'>1.3 Accept the terms and conditions to access your user profile.</p>


                      <p className='text-sm inline-block'>1.4 Select games and activities of your choice to earn points. Some of the activities that earn participants points include:</p>

                      <div className='text-sm inline-block'>
                        <p>(a) Taking trivia on the platform</p>
                        <p>(b) Playing games on the platform</p>
                        <p>(c) Scanning and uploading of receipts that contain any products of Flour Mills of Nigeria.</p>
                        <p>(d) Sharing on social media</p>
                      </div>

                      <p className='text-sm inline-block'>1.5 Users will also be able to participate using the USSD codes on any Amaizing Day Cereal pack.</p>


                      <h5 className='font-semibold text-base inline-block'>2. Ranking on the Leaderboard</h5>


                      <p className='text-sm inline-block'>2.1 Users can see how many points they have accumulated from the games and other activities they have taken through the campaign-dedicated platform.</p>


                      <p className='text-sm inline-block'>2.2 Users can access a general leaderboard showing all active participating users, identified by username and age. They can also access their position on the leaderboard compared to other participants. Score Points of all registered players are displayed on the general leaderboard.</p>


                      <p className='text-sm inline-block'>2.3 The ranking of top users is based on the points they have accumulated, and the earnings are broken down into daily, weekly and overall high scorers winnings based on the user’s leaderboard position.</p>


                      <p className='text-sm inline-block'>2.4 The more activities (games, trivia, social media sharing, receipt scanning) users take on the platform, the more they earn points and increase their ranking on the leaderboard.</p>


                      <p className='text-sm inline-block'>2.5 Trivias and games will be updated every other week and users can partake in these activities daily to accumulate points.</p>


                      <h5 className='font-semibold text-base inline-block'>3. Earning and Redeeming Rewards</h5>


                      <p className='text-sm inline-block'>3.1 There are three categories of rewards to be won in the Amaizing Day Campaign. They include daily, weekly and overall rewards.</p>


                      <div className='text-sm inline-block'>
                        <p className='font-semibold'>(a) Daily reward</p>
                        <p>Disbursed After 11 PM every winning weekday</p>
                        <p>Reward type: Airtime - Reward value: NGN100;</p>
                        <p>Total no of winners: 25,000; No of daily winners: 1,250</p>
                        <p>Only top-ranking 1,250 Users will be rewarded every workday for the week</p>
                        <p>Duration: 20 days (Mon- Fri for one month)</p>
                      </div>


                      <div className='text-sm inline-block'>
                        <p className='font-semibold'>(b) Weekly reward</p>
                        <p>Disbursed After 11 PM every Saturday Night</p>
                        <p>Reward type: Gift pack - Reward value: N5,000;</p>
                        <p>Total no of winners: 400; No of weekly winners: 100</p>
                        <p>Only top-ranking 100 Users will be rewarded every weekend.</p>
                        <p>Duration: 4 weekends</p>
                      </div>


                      <div className='text-sm inline-block'>
                        <p className='font-semibold'>(c) Overall reward</p>
                        <p className='pb-2'>Top Ranking 20 overall winners will be selected at the end of the campaign for the grand finale and rewarded with:</p>
                        <div>
                          <p>  ●  PS5 - 2 winners (1st Top 2 Ranks)</p>
                          <p>  ●  iPad - 2 winners (Next Top 2 Ranks)</p>
                          <p>  ●  Scholarships worth N250k - 9 winners (Next top 9 Rank)</p>
                          <p>  ●  Scooters/Bicycle - 7 winners  (Next Top 7 Rank)</p>
                        </div>
                      </div>


                      <p className='text-sm inline-block'>3.2 To qualify for any category of reward, the user must meet the following criteria;</p>


                      <p className='text-sm inline-block'>(a) All winning users must be within the target age range of 7-15 years old to qualify. Parents and guardians are also eligible to participate and as a result, qualify to win only the daily airtime rewards category.</p>


                      <p className='text-sm inline-block'>(b) The top 1,250 ranking users daily qualify for the NGN100 airtime reward, provided they are within the permitted age range, are parents or guardians, and have not initially won in the daily category.</p>


                      <p className='text-sm inline-block'>(c) The top 100 ranking users weekly qualify for the NGN5000 worth of gift pack, provided they are within the permitted age range of 7-15 years old and have not initially won in the weekly category.</p>


                      <p className='text-sm inline-block'>(d) Overall Top 20 Ranked Users qualify for the Grand Prizes and are invited to the grand finale where grand prices under 3.1 are awarded to the eligible winners, provided they are within the permitted age range of 7-15 years old, proven by a valid identity card and have not initially won in the Grand Prize category. Parents and guardians of eligible winners are expected to accompany their wards to the grand finale.</p>


                      <p className='text-sm inline-block'>(e) We reserve all rights to disqualify a participant/entry with regards to their noncompliance with any of the terms and conditions listed above with or without any form of notification to such participants.</p>

                    </FadeIn>

                    <div className='p-4 bg-yellow-100 shadow-inner'>
                      <Button className={'focus:outline-none outline-none'} text={'I accept'} onClick={() => {
                            setOpen(false);
                            callBack(true);
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
