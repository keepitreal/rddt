import React from 'react';
import { PAGE_LIMIT, REDDIT_BASEURL } from '../consts';
import './Posts.css';

export default function Posts({posts, page}) {
  const startIndex = page * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT - 1;
  const visiblePosts = posts.slice(startIndex, endIndex);

  return (
    <ul className='Posts'>
      {visiblePosts.map(post => <Post post={post} key={post.id} />)}
    </ul>
  );
}

export function Post({post}) {
  const style = {
    backgroundImage: `url(${post.thumbnail})`
  };
  const href = `${REDDIT_BASEURL}${post.permalink}`;
  const upvotes = formatUpvotes(post.upvotes);
  return (
    <li className='Post'>
      <div className='Post-left'>
        <div className='Post-upvotes'>{upvotes}</div>
        <div className='Post-thumbnail' style={style}></div>
      </div>
      <div className='Post-right'>
        <a className='Post-title' href={href}>{post.title}</a>
        <div className='Post-author'>u/{post.author}</div>
      </div>
    </li>
  );
}

export function formatUpvotes(upvotes) {
  if (upvotes > 999) {
    return `${(upvotes / 1000).toFixed(1)}k`;
  }
  return `${upvotes}`;
}
