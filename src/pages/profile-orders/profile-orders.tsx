import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ordersHistory,
  selectOrders,
  selectOrdersLoading
} from '../../services/slices/OrderHistorySlice';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoad = useSelector(selectOrdersLoading);
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  if (isLoad) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
