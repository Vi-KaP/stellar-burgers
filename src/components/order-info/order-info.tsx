import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderById } from '../../services/selector';
import { getIngredientsWithSelector } from '../../services/slices/IngredientsSlice';
import { getOrderByNum } from '../../services/slices/FeedDataSlice';
import { AppDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const orderData = useSelector(selectOrderById(Number(number)));

  const ingredients: TIngredient[] = useSelector(getIngredientsWithSelector);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNum(Number(number)));
    }
  }, [dispatch]);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return;

    const date = new Date(orderData.createdAt);
    console.log(orderInfo);
    console.log(orderData);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
