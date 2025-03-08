import { TOrder } from '@utils-types';
import { RootState } from './store';

const findOrderByNumber = (orders: TOrder[], number: number): TOrder | null =>
  orders.find((order) => order.number === number) || null;

export const selectOrderById = (number: number) => (state: RootState) => {
  const feedOrder = findOrderByNumber(state.feedData.orders, number);
  const historyOrder = findOrderByNumber(
    state.userOrdersHistory.orders,
    number
  );

  if (feedOrder) return feedOrder;
  if (historyOrder) return historyOrder;

  if (state.feedData.modalOrder) {
    return state.feedData.modalOrder.number === number
      ? state.feedData.modalOrder
      : null;
  }

  return null;
};
