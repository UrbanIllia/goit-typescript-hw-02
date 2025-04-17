import React from 'react';
import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ClipLoader color="#4facfe" size={50} />
    </div>
  );
};

export default Loader;
