import React from 'react';
import { useTheme, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import List from './ChartAccountsList';
import Put from './ChartAccountsPut';

const { Navigator, Screen } =
  createStackNavigator<{ 'coa.list': undefined; 'coa.put': { id?: string } }>();

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
          borderBottomWidth: 0,
          shadowOffset: {
            height: 0,
            width: 100,
          },
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
              <IconButton
                mr={2}
                onPress={() => navigation.navigate('coa.put')}
                icon={
                  <Feather
                    name="plus"
                    size={26}
                    color={theme.colors.custom.white}
                  />
                }
              />
            );
          },
        }}
      />
      <Screen
        name="coa.put"
        component={Put}
        options={({ route }) => ({
          title: route.params?.id ? 'Visualizar conta' : 'Criar Conta',
          headerBackTitleVisible: false,
        })}
      />
    </Navigator>
  );
}
