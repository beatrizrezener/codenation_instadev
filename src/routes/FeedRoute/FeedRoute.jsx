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
    </div>
  );
};

export default FeedRoute;
