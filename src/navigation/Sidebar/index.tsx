import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GovernmentIcon from 'screens/Sidebar/components/icons/Government';
import { SidebarScreen } from 'screens/Sidebar';
import { BundestagStackNavigator } from './Bundestag';

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
  Donate: undefined;
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
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerLabel: '/Notifications',
        }}
      />
    </Drawer.Navigator>
  );
};
