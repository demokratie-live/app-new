import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GovernmentIcon from 'screens/Sidebar/components/icons/Government';
import { SidebarScreen } from 'screens/Sidebar';
import { BundestagStackNavigator } from './Bundestag';
import SvgSettings from 'assets/svgs/icons/Settings';
import { SettingsRootNavigation } from './Settings';
import SvgFaqAndSupport from 'assets/svgs/icons/FaqAndSupport';
import { FaqScreen } from 'screens/Faq';
import { headerScreenOptions } from 'navigation/headerOptions';
import SvgAbout from 'assets/svgs/icons/About';
import { AboutScreen } from 'screens/About';
import SvgLaw from 'assets/svgs/icons/Law';
import { CredentialsScreen } from 'screens/Credentials';
import SvgWahlOMeter from 'assets/svgs/icons/WahlOMeter';
import { WahlOMeterNavigation } from './WahlOMeter';

export type SidebarNavigatorParamList = {
  Home: undefined;
  WahlOMeter: undefined;
  Settings: undefined;
  Donate: undefined;
  Faq: undefined;
  About: undefined;
  Credentials: undefined;
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
          drawerLabel: 'Auswertungen/Wahl-O-Meter',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
        name="WahlOMeter"
        component={WahlOMeterNavigation}
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
        options={{
          ...headerScreenOptions,
          headerShown: true,
          title: 'About',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgAbout width={size} height={size} color={color} />
          ),
        }}
        name={'About'}
        component={AboutScreen}
      />
      <Drawer.Screen
        options={{
          ...headerScreenOptions,
          headerShown: true,
          drawerLabel: 'Mehr/Rechtliches',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgLaw width={size} height={size} color={color} />
          ),
        }}
        name={'Credentials'}
        component={CredentialsScreen}
      />
    </Drawer.Navigator>
  );
};
