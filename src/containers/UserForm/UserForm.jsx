import React, { useState } from 'react';

import SuccessMessage from '../../components/SuccessMessage';

import './UserForm.scss';

import placeholderPhoto from "../../assets/img/profile-placeholder.png";

const UserForm = () => {
  const [name, setName] = useState('John Doe');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [submit, setSubmit] = useState(false);

  const handleSetName = event => {
    const { value } = event.target;
    setName(value);
  };

  const handleSetAvatar = event => {
    const { value } = event.target;
    setAvatar(value);
  };

  const handleSetUserName = event => {
    const { value } = event.target;
    setUsername(value);
  };

  const handleSetEmail = event => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleAddUser = event => {
    event.preventDefault();

    const fetchBody = JSON.stringify({
      name,
      avatar,
      username,
      email,
    });

    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: fetchBody
    }).then(() => setSubmit(true));
  };

  const renderProfile = () => {
    return (
      <section className="profile" data-testid="user-form">
        <div className="container">
          <div className="profile-data">
            <div className="user">
              <div className="user__thumb">
                {avatar
                  ? <img src={avatar} alt="Foto de usuário" />
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
    );
  }

  const renderNewUserForm = () => {
    return (
      <section className="post__form">
        <div className="container">
          <div className="post__form__wrapper">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              placeholder="Ex: Fulano da Silva"
              onChange={event => handleSetName(event)}
            />
  
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              placeholder="Ex: fulano_da_silva"
              onChange={event => handleSetUserName(event)}
            />
  
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Ex: fulano@provedor.com"
              onChange={event => handleSetEmail(event)}
            />
  
            <label>Url da Imagem de Perfil (use a url da imagem do Linkedin)</label>
            <input
              type="text"
              placeholder="http://..."
              onChange={event => handleSetAvatar(event)}
            />
  
            <button
              type="button"
              onClick={event => handleAddUser(event)}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      { renderProfile() }
      { renderNewUserForm() }
      {submit && (<SuccessMessage />)}
    </React.Fragment>
  );
};

export default UserForm;
