import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('https://react-my-burger-49ea2.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
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

  removeIngredientHandler = type => {
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
    // alert('You have continued, YUM YUM');

    // Send the burger ingredients as search query string.
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    // Send user to checkout page, when they click continue.
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    // Do we need to disable the less button?
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can not be loaded!</p>
    ) : (
        <Spinner />
      );

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinuedHandler={this.purchaseContinuedHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
