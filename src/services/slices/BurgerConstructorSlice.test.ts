import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  burgerConstructorSlice,
  TBurgerConstructor
} from './BurgerConstructorSlice';

describe('burgerConstructorSlice', () => {
  const initialState: TBurgerConstructor = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  };

  const mockBun: TIngredient = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  };

  const mockIngredient: TIngredient = {
    _id: '2',
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

  const mockConstructorIngredient: TConstructorIngredient = {
    ...mockIngredient,
    id: '123'
  };

  // Тест для начального состояния
  it('should handle initial state', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, { type: 'unknown' })
    ).toEqual(initialState);
  });

  // Тест для добавления булки
  it('should handle addIngredient (bun)', () => {
    const action = burgerConstructorSlice.actions.addIngredient(mockBun);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.constructorItems.bun).toEqual({
      ...mockBun,
      id: expect.any(String)
    });
  });

  // Тест для добавления ингредиента
  it('should handle addIngredient (ingredient)', () => {
    const action = burgerConstructorSlice.actions.addIngredient(mockIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.constructorItems.ingredients).toEqual([
      {
        ...mockIngredient,
        id: expect.any(String)
      }
    ]);
  });

  // Тест для удаления ингредиента
  it('should handle removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockConstructorIngredient]
      }
    };
    const action = burgerConstructorSlice.actions.removeIngredient(
      mockConstructorIngredient
    );
    const state = burgerConstructorSlice.reducer(stateWithIngredient, action);
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  // Тест для перемещения ингредиента
  it('should handle moveDownIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockConstructorIngredient, id: '1' },
          { ...mockConstructorIngredient, id: '2' }
        ]
      }
    };
    const action = burgerConstructorSlice.actions.moveDownIngredient(0);
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients).toEqual([
      { ...mockConstructorIngredient, id: '2' },
      { ...mockConstructorIngredient, id: '1' }
    ]);
  });

  it('should handle moveUpIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockConstructorIngredient, id: '1' },
          { ...mockConstructorIngredient, id: '2' }
        ]
      }
    };
    const action = burgerConstructorSlice.actions.moveUpIngredient(1);
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients).toEqual([
      { ...mockConstructorIngredient, id: '2' },
      { ...mockConstructorIngredient, id: '1' }
    ]);
  });

  // Тест для очистки заказа
  it('should handle clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockConstructorIngredient]
      },
      orderModalData: { _id: '1', name: 'Order 1' } as TOrder
    };
    const action = burgerConstructorSlice.actions.clearOrder();
    const state = burgerConstructorSlice.reducer(stateWithOrder, action);
    expect(state).toEqual(initialState);
  });
});

describe('burgerConstructorSlice selectors', () => {
  const state: { 'burger-constructor': TBurgerConstructor } = {
    'burger-constructor': {
      constructorItems: {
        bun: {
          _id: '1',
          name: 'Bun',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 100,
          price: 50,
          image: 'bun.png',
          image_mobile: 'bun-mobile.png',
          image_large: 'bun-large.png'
        },
        ingredients: [
          {
            _id: '2',
            name: 'Ingredient',
            type: 'main',
            proteins: 5,
            fat: 2,
            carbohydrates: 10,
            calories: 50,
            price: 30,
            image: 'ingredient.png',
            image_mobile: 'ingredient-mobile.png',
            image_large: 'ingredient-large.png',
            id: '123'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    }
  };

  // Тесты для селекторов
  it('should return constructor items', () => {
    expect(burgerConstructorSlice.selectors.getConstructorItems(state)).toEqual(
      state['burger-constructor'].constructorItems
    );
  });

  it('should return order request state', () => {
    expect(burgerConstructorSlice.selectors.getOrderRequest(state)).toEqual(
      false
    );
  });

  it('should return order modal data', () => {
    expect(burgerConstructorSlice.selectors.getOrderModalData(state)).toEqual(
      null
    );
  });

  it('should return loading state', () => {
    expect(burgerConstructorSlice.selectors.getLoading(state)).toEqual(false);
  });

  it('should return error state', () => {
    expect(burgerConstructorSlice.selectors.getError(state)).toEqual(null);
  });
});
