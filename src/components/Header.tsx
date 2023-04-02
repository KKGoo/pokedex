import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../modules/AuthService';

import '../styles/header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    logout(); // Llamamos a la función logout para borrar el token de autenticación
    navigate('/'); // Redireccionamos al usuario a la página principal
  };

  return (
    <header className="Header">
      <h1 className="Header__title">Pokedex</h1>
      <button className="Header__menu-button" onClick={handleToggleMenu}>
        <span className="Header__menu-button-icon">🧑</span>
      </button>
      {isOpen && (
        <div className="Header__menu">
          <button className="Header__menu-item" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;