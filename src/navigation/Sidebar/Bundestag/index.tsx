import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BundestagTabNavigator } from './TabNavigation';
import styled from 'styled-components/native';
import { ProcedureDetailScreen } from 'screens/Procedure';
import { VoteSelection } from 'generated/graphql';
import { VotingScreen } from 'screens/Voting';
import { BurgerMenuButton } from 'components/navigation/MenuButton';
import SvgMenu from 'assets/svgs/icons/Menu';
import { DrawerActions } from '@react-navigation/native';

export type BundestagStackNavigatorParamList = {
  TabNavigator: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.Yes | VoteSelection.Abstination | VoteSelection.No;
    procedureId: string;
    title: string;
  };
  Filter: undefined;
  Search: undefined;
  MemberProfil: undefined;
  OutcomePush: { finishAction: () => void; title: string; procedureId: string };
};

const Stack = createStackNavigator<BundestagStackNavigatorParamList>();

const Navigator = styled(Stack.Navigator).attrs(({ theme }) => ({
  screenOptions: {
    headerStyle: {
      backgroundColor: theme.colors.header,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme.colors.white,
  },
}))``;

export const BundestagStackNavigator: React.FC = () => {
  return (
    <Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={BundestagTabNavigator}
        options={({ navigation }) => ({
          title: 'Bundestag',
          headerLeft: () => (
            <BurgerMenuButton
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <SvgMenu width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        })}
      />
      <Stack.Screen name="Procedure" component={ProcedureDetailScreen} />
      <Stack.Screen name="Voting" component={VotingScreen} />
    </Navigator>
  );
};
