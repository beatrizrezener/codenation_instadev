import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import './FeedRoute.scss';

const FeedRoute = () => {

  const getUserPostById = postUserId => users.find(user => postUserId === user.id);
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []); // Like componentDidMount and componentWillUnmount

  const [usersLoaded, setUsersLoaded] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (usersLoaded === users.length) {
      return;
    }
    fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${users[usersLoaded].id}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts([...posts, ...data]);
        setUsersLoaded(usersLoaded + 1);
      });
  }, [users, usersLoaded]);  // Only useEffect again when users OR usersLoaded changes. Like componentDidUpdate

  const [stories, setStories] = useState([]);
  useEffect(() => {
    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/stories')
      .then(res => res.json())
      .then(data => {
        setStories(data);
      });
  }, [users]); // Only useEffect again when users change. Like componentDidUpdate

  return (
    <div data-testid="feed-route">
      {(users.length > 0 && stories.length > 0) && (
        <Stories
          stories={stories}
          getUserHandler={getUserPostById}
        />
      )}
      {users.length !== usersLoaded
        ? (<Loading />)
        : (
          <Posts
            posts={posts}
            getUserHandler={getUserPostById}
          />)
      }
    </div>
  );
};

export default FeedRoute;
