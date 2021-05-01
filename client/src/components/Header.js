import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import Logo from '../assets/Logo.jpg';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <img src={Logo} />
      </Link>
      <div className="right menu">
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
