import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearOrder,
  createOrder,
  getConstructorItems,
  getOrderModalData,
  getOrderRequest
} from '../../services/slices/BurgerConstructorSlice';
import {
  selectIsAuthChecked,
  selectIsLoggedIn
} from '../../services/slices/UserInfoSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getOrderRequest); //статус запроса создания заказа
  const authCheck = useSelector(selectIsLoggedIn); //пров. автор-ии

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!authCheck) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    console.log(constructorItems);

    // идентификатор булки
    const bunId = constructorItems.bun ? constructorItems.bun._id : null;
    // массив идентификаторов ингредиентов
    const ingredientIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    // массив заказа
    const order = [];
    // если есть булка, добавляем ее в начало и конец массива заказа
    if (bunId) {
      order.push(bunId);
    }
    // Добавляем идентификаторы ингредиентов в массив заказа
    order.push(...ingredientIds);

    if (bunId) {
      order.push(bunId);
    }
    // удаляем все ложные значения из массива заказа
    const filteredOrder = order.filter(Boolean);
    console.log(filteredOrder);

    dispatch(createOrder(filteredOrder));
  };

  console.log(clearOrder);

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
