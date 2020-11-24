import React from 'react';

// Components
import { ScreenNavigationProp } from 'navigation/Sidebar/WahlOMeter/TabView';
import { WomConstituencyHeader } from './Header';

interface Props {
  navigation: ScreenNavigationProp;
}

export const WomConstituencyScreen: React.FC<Props> = () => {
  return <WomConstituencyHeader />;
};
