import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GovernmentIcon from 'screens/Sidebar/components/icons/Government';
import { SidebarScreen } from 'screens/Sidebar';
import { BundestagStackNavigator } from './Bundestag';
import SvgSettings from 'assets/svgs/icons/Settings';
import { SettingsRootNavigation } from './Settings';
import SvgFaqAndSupport from 'assets/svgs/icons/FaqAndSupport';
import { FaqScreen } from 'screens/Faq';
import { headerScreenOptions } from 'navigation/headerOptions';

function NotificationsScreen({ navigation }: any) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export type SidebarNavigatorParamList = {
  Home: undefined;
  Notifications: undefined;
  Settings: undefined;
  Donate: undefined;
  Faq: undefined;
};

const Drawer = createDrawerNavigator<SidebarNavigatorParamList>();

export const Sidebar: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <SidebarScreen {...props} />}
      drawerType={'back'}
      overlayColor="1"
      drawerContentOptions={{
        labelStyle: { color: '#fff' },
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        activeBackgroundColor: 'rgba(68, 148, 211, 0.5)',
      }}>
      <Drawer.Screen
        name="Home"
        component={BundestagStackNavigator}
        options={{
          drawerLabel: '/Bundestag',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <GovernmentIcon width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        options={{
          drawerLabel: 'Mehr/Settings',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgSettings width={size} height={size} color={color} />
          ),
        }}
        name="Settings"
        component={SettingsRootNavigation}
      />
      <Drawer.Screen
        options={{
          ...headerScreenOptions,
          headerShown: true,
          title: 'FAQ',
          drawerLabel: 'Mehr/FAQ & Support',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgFaqAndSupport width={size} height={size} color={color} />
          ),
        }}
        name={'Faq'}
        component={FaqScreen}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerLabel: '/Notifications',
        }}
      />
    </Drawer.Navigator>
  );
};
