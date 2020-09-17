import React from 'react';
import debounce from 'lodash.debounce';
import { REDDIT_BASEURL } from './consts';

export default function useSubreddit() {
  const [subreddit, setSubreddit] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [error, setError] = React.useState('');

  async function fetchPosts(subreddit = 'all', page = 1, limit = 10) {
    if (subreddit.length < 3) {
      return;
    }

    setIsLoading(true);

    const url = `${REDDIT_BASEURL}/r/${subreddit}.json?limit=100`;
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(proxyURL + url);

    try {
      const body = await response.json();

      setIsLoading(false);
      setPosts(formatPosts(body));
    } catch (e) {
      setError('Subreddit does not exist');
    }
  }

  const debouncedFetchPosts = React.useRef(debounce(fetchPosts, 500));

  function onChange({target: {value}}) {
    setSubreddit(value);
    debouncedFetchPosts.current(value);
  }

  // Load r/all on mount
  React.useEffect(() => {
    fetchPosts('all');
  }, []);

  return {
    error,
    isLoading,
    onChange,
    page,
    posts,
    setPage,
    subreddit,
  };
}

export function formatPosts(body) {
  return body.data.children.map(({data}) => ({
    id: data.id,
    title: data.title,
    author: data.author,
    subreddit: data.subreddit,
    permalink: data.permalink,
    thumbnail: data.thumbnail,
    upvotes: data.ups,
  }));
}
