import React from 'react';
import ImageFadeIn from 'react-image-fade-in';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom';

import LostInSpace from '../assets/404.png';
import Button from '../components/button';

function NotFound() {
  const history = useHistory();
  return (
    <div className={`flex flex-col justify-center items-center min-h-screen p-6 bg-red-100`}>
      <FadeIn className={`max-w-2xl  space-y-6`}>
        <div className={`w-96 h-96 p-6`}>
          <ImageFadeIn className={`w-96`} src={LostInSpace} opacityTransition={1} />
        </div>
        <h1 className={`font-bold text-2xl text-primary`}>404 : This Page is Lost in Space</h1>
        <p className={`text-gray-700`}>
          You thought this mission to the moon would be a quick six month thing. Your neighbor offered to look after your dog. Your high school math teacher was
          impressed. He once said you wouldn’t amount to anything.You sure showed him. But now here you are, fifty feet from your spaceship with no way to get
          back. Your dog will be so sad. Your math teacher will be so smug. Pretty devastating.
        </p>
        <Button className={'bg-primary'} text={`Go Back Home`} onClick={() => history.push('/')} />
      </FadeIn>
    </div>
  );
}

export default NotFound;
