import React from 'react';

import useDocumentTitle from '../../../hooks/use-document-title';

const TriviaPlayer = ({ className }) => {
  useDocumentTitle('Trivia')

  return (
    <div className={`${className} `}>
      Trivia Player
    </div>
  );
};

export default TriviaPlayer;
