import React from 'react';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
  let buildIngredients = Object.keys(props.ingredients) // ["salad", "bacon", "cheese", "meat"]
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])] // [Array(1), Array(1), Array(2), Array(2)]
        .map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((amount, total) => {
      return amount.concat(total);
    }, []); // Flat array (6) [{…}, {…}, {…}, {…}, {…}, {…}]

  if (buildIngredients.length === 0) {
    buildIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {buildIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
