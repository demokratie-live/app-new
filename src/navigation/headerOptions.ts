import { getTheme } from 'styles/theme';

export const headerScreenOptions = {
  headerStyle: {
    backgroundColor: getTheme().colors.header,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: getTheme().colors.white,
};
