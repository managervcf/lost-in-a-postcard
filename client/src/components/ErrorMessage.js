import React from 'react';
import withLoader from '../wrappers/withLoader';

function ErrorMessage({ text }) {
  return <div className="error-message">{text}</div>;
}

export default withLoader(ErrorMessage);
