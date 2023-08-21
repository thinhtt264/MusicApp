import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/common/redux';

export const useScreenController = () => {
  const { t } = useTranslation();
  const translate = t;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  return { translate, dispatch, navigation };
};
