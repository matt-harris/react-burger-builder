import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/img/burger-logo.png';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='MyBurger' />
  </div>
);

export default Logo;
