import React from 'react';

import './Navigation.css';

export default function Navigation({ subreddit, onChange }) {
  return (
    <header className="App-header">
      <span>reddit.com/r/</span>
      <input
        className="Subreddit-input"
        type="text"
        value={subreddit}
        onChange={onChange}
      />
    </header>
  );
}
