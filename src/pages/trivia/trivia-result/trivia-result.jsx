import React from 'react';

import useDocumentTitle from '../../../hooks/use-document-title';

const TriviaResult = ({ className }) => {
  useDocumentTitle('Trivia')

  return (
    <div className={`${className} `}>
      Trivia Result
    </div>
  );
};

export default TriviaResult;
