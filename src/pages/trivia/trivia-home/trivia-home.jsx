import React from 'react';

import useDocumentTitle from '../../../hooks/use-document-title';

const TriviaHome = ({ className }) => {
  useDocumentTitle('Trivia')


  return (
    <div className={`${className} `}>
      Trivia Home
    </div>
  );
};

export default TriviaHome;
