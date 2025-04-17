import React from 'react';
import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return <div className={css.error}>{message}</div>;
};

export default ErrorMessage;
