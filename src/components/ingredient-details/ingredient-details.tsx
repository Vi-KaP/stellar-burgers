import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { getIngredientsWithSelector } from '../../services/slices/IngredientsSlice';
import { useParams } from 'react-router-dom';
import styles from '../app/app.module.css';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredient = useSelector(getIngredientsWithSelector);
  const { id } = useParams();
  const ingredientData = ingredient.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
