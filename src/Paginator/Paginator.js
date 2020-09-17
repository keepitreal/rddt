import React from 'react';
import cx from 'classnames';
import { PAGE_LIMIT } from '../consts';

import './Paginator.css';

export default function Paginator({page, setPage, numPosts}) {
  const lastPage = Math.ceil(numPosts / PAGE_LIMIT);
  const changePage = (dir) => {
    setPage((page) => {
      if (dir === 'decr' && (page - 1) > -1) {
        return --page;
      }
      if (dir === 'incr' && (page + 1) < lastPage -1) {
        return ++page;
      }
      return page;
    });
  };
  const increment = () => changePage('incr');
  const decrement = () => changePage('decr');
  const leftClasses = cx('Paginator-button', 'left', {
    'disabled': page === 0,
  });
  const rightClasses = cx('Paginator-button', 'right', {
    'disabled': page === lastPage - 2,
  });

  return (
    <div className='Paginator'>
      <div className={leftClasses} onClick={decrement}></div>
      <div className='Paginator-page'>Page {page + 1}</div>
      <div className={rightClasses} onClick={increment}></div>
    </div>
  );
}
