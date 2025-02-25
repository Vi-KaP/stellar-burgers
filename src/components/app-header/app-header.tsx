import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUser } from '../../services/slices/UserInfoSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser);

  return (
    <>
      <AppHeaderUI userName={userName?.name} />;
    </>
  );
};
