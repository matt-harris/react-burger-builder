import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      }
    )
  }

  const IngredientOutput = ingredients.map(ig => {
    return (
      <span key={ig.name} style={{
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc',
        textTransform: 'capitalize',
      }}>
        {ig.name} ({ig.amount})
      </span>
    );
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {IngredientOutput}</p>
      <p>Price: <strong>£{props.price}</strong></p>
    </div>
  )
};

export default Order;
