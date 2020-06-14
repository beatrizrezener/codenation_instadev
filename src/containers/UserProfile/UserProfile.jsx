import React from 'react';

import './UserProfile.scss';

import placeholderPhoto from "../../assets/img/profile-placeholder.png";

const UserProfile = ({ avatar, name, username }) => {
  return (
    <section className="profile" data-testid="user-profile">
      <div className="container">
        <div className="profile-data">
          <div className="user">
            <div className="user__thumb">
              { avatar.length > 0
                ? <img src={avatar} alt="" />
                : <img src={placeholderPhoto} alt="Imagem padrão" />
              }
            </div>
            {name && (
              <p className="user__name">
                {name}
                <span>@{username}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
};

export default UserProfile;
