import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    // Update Ingredients.
    const oldCount = this.state.ingredients[type]; // Current ingredient count.
    const updatedCount = oldCount + 1; // New ingredient count.
    const updatedIngredients = {
      ...this.state.ingredients,
    }; // Don't mutate state directly.
    updatedIngredients[type] = updatedCount; // Update the ingredient count.

    // Update Price.
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    // Update setState.
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    // Update Ingredients.
    const oldCount = this.state.ingredients[type]; // Current ingredient count.
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1; // New ingredient count.
    const updatedIngredients = {
      ...this.state.ingredients,
    }; // Don't mutate state directly.
    updatedIngredients[type] = updatedCount; // Update the ingredient count.

    // Update Price.
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    // Update setState.
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuedHandler = () => {
    alert('You have continued, YUM YUM');
  };

  render() {
    // Do we need to disable the less button?
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelHandler={this.purchaseCancelHandler}
            purchaseContinuedHandler={this.purchaseContinuedHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;