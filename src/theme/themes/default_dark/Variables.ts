import { ThemeNavigationColors } from '../../../../@types/theme';

export const Colors = {
  primary: '#FFFFFF',
  textGray800: '#FAFAFA',
  textGray400: '#AAA',
  textGray200: '#A8A8A8',
  inputBackground: '#3a3a3a',
  circleButtonBackground: '#ffb300',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#000000',
  card: '#00000080',
};

export default {
  Colors,
  NavigationColors,
};
