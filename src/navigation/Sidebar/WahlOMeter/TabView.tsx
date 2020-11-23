import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { WahlOMeterStackParamList } from '.';
import { getTheme } from 'styles/theme';
// import { WomParty } from 'screens/WahlOMeter/Fraktionen';
// import Wahlkreis from 'screens/WahlOMeter/Wahlkreis';
import { WomBundestagScreen } from 'screens/WahlOMeter/Bundestag';
import { WomPartyScreen } from 'screens/WahlOMeter/Fraktionen';

export type TopTabParamList = {
  Bundestag: undefined;
  Fraktionen: undefined;
  Wahlkreis: undefined;
};

const TabNavigation = createMaterialTopTabNavigator<TopTabParamList>();

export type ScreenNavigationProp = StackNavigationProp<
  WahlOMeterStackParamList,
  'TabView'
>;

interface Props {
  noButton?: boolean;
  navigation: ScreenNavigationProp;
}

const TabViewNavigation: React.FC<Props> = () => {
  return (
    <TabNavigation.Navigator
      lazy={true}
      tabBarOptions={{
        scrollEnabled: false,
        indicatorStyle: {
          backgroundColor: '#fff',
        },
        activeTintColor: 'rgb(255,255,255)',
        inactiveTintColor: getTheme().colors.primaryText,
        style: {
          backgroundColor: '#4494D3',
        },
      }}
      initialRouteName={'Bundestag'}>
      <TabNavigation.Screen name="Bundestag" component={WomBundestagScreen} />
      <TabNavigation.Screen name="Fraktionen" component={WomPartyScreen} />
      <TabNavigation.Screen
        name="Wahlkreis"
        component={WomBundestagScreen}
        // component={Wahlkreis}
      />
    </TabNavigation.Navigator>
  );
};

export default TabViewNavigation;
