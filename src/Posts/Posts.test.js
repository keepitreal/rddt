import { render } from '@testing-library/react';
import React from 'react';
import {
  formatUpvotes,
  Post,
} from './Posts';
import { formatPosts } from '../useSubredditHook';
import { rawResponse } from '../mocks';

describe('formatUpvotes', () => {
  test('it formats upvotes with 1000+ upvotes and rounds to the nearest tenth', () => {
    const ups1 = formatUpvotes(1500);
    expect(ups1).toEqual('1.5k');
    const ups3 = formatUpvotes(155555);
    expect(ups3).toEqual('155.6k');
  });
  test('it formats upvotes with less than 1000 upvotes', () => {
    const ups1 = formatUpvotes(150);
    expect(ups1).toEqual('150');
  });
});

describe('Post component', () => {
  const formattedPosts = formatPosts(rawResponse);
  const { getByText } = render(<Post post={formattedPosts[0]} />);
  expect(getByText('McDeclined')).toBeInTheDocument();
  expect(getByText('u/Hebrewski')).toBeInTheDocument();
  expect(getByText('34.2k')).toBeInTheDocument();
});
