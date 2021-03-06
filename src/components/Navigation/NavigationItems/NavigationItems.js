import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>Burger Builder</NavigationItem>
    <NavigationItem link='/orders'>My Orders</NavigationItem>
  </ul>
);

export default NavigationItems;
