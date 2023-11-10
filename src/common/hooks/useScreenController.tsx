import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/common/redux';
import { navigation } from 'src/common/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';

export const useScreenController = () => {
  const { t } = useTranslation();
  const translate = t;
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<any>>();

  return { translate, dispatch, navigation, route };
};
