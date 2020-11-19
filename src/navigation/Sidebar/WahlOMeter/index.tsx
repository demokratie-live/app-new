import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import TabView from './TabView';
import { VoteSelection } from 'generated/graphql';
import { headerScreenOptions } from 'navigation/headerOptions';
import { BurgerMenuButton } from 'components/navigation/MenuButton';
import SvgMenu from 'assets/svgs/icons/Menu';
import { ProcedureDetailScreen } from 'screens/Procedure';
import { VotingScreen } from 'screens/Voting';
import { SidebarNavigatorParamList } from '..';
import { RootStackParamList } from 'navigation';

export type WahlOMeterStackParamList = {
  TabView: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.Yes | VoteSelection.Abstination | VoteSelection.No;
    procedureId: string;
    procedureObjId: string;
  };
  MemberProfil: undefined;
};

const WahlOMeterStack = createStackNavigator<WahlOMeterStackParamList>();

type WahlOMeterNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarNavigatorParamList, 'WahlOMeter'>,
  StackNavigationProp<RootStackParamList>
>;

export const WahlOMeterNavigation = () => {
  const navigation = useNavigation<WahlOMeterNavigationProps>();
  return (
    <WahlOMeterStack.Navigator
      screenOptions={{
        ...headerScreenOptions,
        // headerStyle: {
        //   backgroundColor: theme.colors.background.header,
        //   elevation: 0,
        //   shadowOpacity: 0,
        // },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
      }}>
      <WahlOMeterStack.Screen
        name="TabView"
        component={TabView}
        options={{
          title: 'Wahl-O-Meter',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BurgerMenuButton
              onPress={navigation.toggleDrawer}
              testID="BurgerMenuButton">
              <SvgMenu width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        }}
      />
      <WahlOMeterStack.Screen
        name="Procedure"
        component={ProcedureDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <WahlOMeterStack.Screen
        name="Voting"
        component={VotingScreen}
        options={{
          title: 'Wahlurne',
        }}
      />
      {/* <WahlOMeterStack.Screen
        name="MemberProfil"
        component={MemberProfil}
        options={{
          title: '',
        }}
      /> */}
    </WahlOMeterStack.Navigator>
  );
};
