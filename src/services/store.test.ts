import ingredientsSlice from './slices/IngredientsSlice';
import { burgerConstructorSlice } from './slices/BurgerConstructorSlice';
import { userSlice } from './slices/UserInfoSlice';
import { feedDataSlice } from './slices/FeedDataSlice';
import { ordersHistorySlice } from './slices/OrderHistorySlice';
import { rootReducer } from './store';

describe('rootReducer', () => {
  it('should return the initial state for all slices', () => {
    // Получаем начальное состояние rootReducer
    const state = rootReducer(undefined, { type: 'unknown' });

    // Проверяем начальное состояние каждого слайса
    expect(state[ingredientsSlice.name]).toEqual(
      ingredientsSlice.getInitialState()
    );
    expect(state[burgerConstructorSlice.name]).toEqual(
      burgerConstructorSlice.getInitialState()
    );
    expect(state[userSlice.name]).toEqual(userSlice.getInitialState());
    expect(state[feedDataSlice.name]).toEqual(feedDataSlice.getInitialState());
    expect(state[ordersHistorySlice.name]).toEqual(
      ordersHistorySlice.getInitialState()
    );
  });

  it('should handle an unknown action type', () => {
    // Получаем начальное состояние rootReducer
    const initialState = rootReducer(undefined, { type: 'unknown' });

    // Диспатчим неизвестное действие
    const state = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что состояние не изменилось
    expect(state).toEqual(initialState);
  });
});
