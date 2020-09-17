import { formatPosts } from './useSubredditHook';
import { rawResponse } from './mocks';

describe('formatPosts', () => {
  test('formats a raw response from reddits json feed', () => {
    const formatted = formatPosts(rawResponse);
    const expected = [{
      id: "iui7rv",
      title: 'McDeclined',
      author: "Hebrewski",
      subreddit: "funny",
      permalink: "/r/funny/comments/iui7rv/mcdeclined/",
      thumbnail: 'https://a.thumbs.redditmedia.com/VelQXdtQqCQ3FdtGQ3J5At-9flf7nphmp0A8P1jjlE0.jpg',
      upvotes: 34195,
    }];
    expect(formatted).toEqual(expected);
  });
});

