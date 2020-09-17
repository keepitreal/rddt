import React from 'react';
import cx from 'classnames';

import Navigation from './Navigation/Navigation';
import Posts from './Posts/Posts';
import Paginator from './Paginator/Paginator';
import useSubreddit from './useSubredditHook';

import './App.css';

function App() {
  const {
    isLoading,
    onChange,
    page,
    posts,
    setPage,
    subreddit,
  } = useSubreddit();

  return (
    <div className="App">
      <Navigation subreddit={subreddit} onChange={onChange} />
      <div className='Body'>
        <LoadingIcon isLoading={isLoading} />
        <Posts posts={posts} page={page} />
        <Paginator page={page} setPage={setPage} numPosts={posts.length} />
      </div>
    </div>
  );
}

function LoadingIcon({isLoading}) {
  const classname = cx('LoadingIcon', {
    'LoadingIcon-loading': isLoading,
  });
  return (
    <div className={classname}><div></div></div>
  );
}

export default App;
