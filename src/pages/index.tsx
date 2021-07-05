import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ChartAccounts from './ChartAccounts';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          component={ChartAccounts}
          name="coa"
          options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
