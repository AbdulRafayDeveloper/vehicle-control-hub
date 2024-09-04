import React from 'react';
import { AuthImg } from '../Styles';
import logo from '../../../../../assets/bits.png'
const AuthLogoContainer = () => {
  return (
    <AuthImg item xs={12}>
      <img
        src={logo}
        style={{ width: '100%', maxWidth: '250px',maxHeight:'200px',marginBottom:'20px', objectFit: 'cover' }}
        alt='logo'
      />
    </AuthImg>
  );
};

export default AuthLogoContainer;
