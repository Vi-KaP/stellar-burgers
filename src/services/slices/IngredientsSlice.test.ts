import ingredientsSlice, { TStateIngredients } from './IngredientsSlice';
import { getIngredients } from './IngredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState: TStateIngredients = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Ingredient',
    type: 'main',
    proteins: 5,
    fat: 2,
    carbohydrates: 10,
    calories: 50,
    price: 30,
    image: 'ingredient.png',
    image_mobile: 'ingredient-mobile.png',
    image_large: 'ingredient-large.png'
  };

  // Тест для начального состояния
  it('should handle initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  // Тесты для состояний при запросе ингредиентов
  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle getIngredients.fulfilled', () => {
    const mockPayload = [mockIngredient];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockPayload
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      ingredients: mockPayload
    });
  });

  it('should handle getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error message' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error message'
    });
  });
});

describe('ingredientsSlice selectors', () => {
  const state: { ingredients: TStateIngredients } = {
    ingredients: {
      ingredients: [
        {
          _id: '1',
          name: 'Ingredient',
          type: 'main',
          proteins: 5,
          fat: 2,
          carbohydrates: 10,
          calories: 50,
          price: 30,
          image: 'ingredient.png',
          image_mobile: 'ingredient-mobile.png',
          image_large: 'ingredient-large.png'
        }
      ],
      loading: false,
      error: null
    }
  };

  // Тесты для селекторов
  it('should return ingredients', () => {
    expect(
      ingredientsSlice.selectors.getIngredientsWithSelector(state)
    ).toEqual(state.ingredients.ingredients);
  });

  it('should return loading status', () => {
    expect(ingredientsSlice.selectors.getLoadingStatus(state)).toEqual(false);
  });
});
