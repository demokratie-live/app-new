import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import { Instructions, InstructionsScreenOptions } from './instructions';
import { InstructionsContext } from '../context/instructions';
import { getReadableVersion } from 'react-native-device-info';
import { Sidebar } from './Sidebar';
import { enableScreens } from 'react-native-screens';
enableScreens();

export type RootStackParamList = {
  Sidebar: undefined;
  FistStartInstructions: undefined;
  Instructions: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const { lastStartWithVersion } = useContext(InstructionsContext);
  const [showInstructions, setShowInstructions] = useState<boolean>();

  useEffect(() => {
    if (lastStartWithVersion === getReadableVersion()) {
      setShowInstructions(false);
    } else if (lastStartWithVersion !== undefined) {
      setShowInstructions(true);
    }
  }, [lastStartWithVersion]);

  if (showInstructions === undefined) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {showInstructions ? (
          <Stack.Screen
            name="FistStartInstructions"
            component={Instructions}
            options={InstructionsScreenOptions}
          />
        ) : (
          <>
            <Stack.Screen name="Sidebar" component={Sidebar} />
            <Stack.Screen
              name="Instructions"
              component={Instructions}
              options={InstructionsScreenOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
