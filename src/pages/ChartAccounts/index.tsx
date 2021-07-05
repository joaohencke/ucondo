import React from 'react';
import { Box, Button, useTheme } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';
import List from './ChartAccountsList';
import Put from './ChartAccountsPut';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const { Navigator, Screen } = createStackNavigator();

export default function ChartAccounts(): JSX.Element {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="coa.list"
      mode="card"
      screenOptions={{
        headerTitleAlign: 'left',
        headerTintColor: theme.colors.custom.white,
        headerStyle: {
          backgroundColor: theme.colors.custom.primary,
          padding: '10px',
        },
      }}
    >
      <Screen
        name="coa.list"
        component={List}
        options={{
          title: 'Plano de Contas',
          headerRight() {
            return (
              <Button
                variant="ghost"
                onPress={() => navigation.navigate('coa.put')}
              >
                <Feather name="plus" />
              </Button>
            );
          },
        }}
      />
      <Screen
        name="coa.put"
        component={Put}
        options={{
          title: 'Criar Conta',
          headerBackTitleVisible: false,
        }}
      />
    </Navigator>
  );
}
