import React, { useState } from 'react';
import {
  Stack,
  FlatList,
  Box,
  IconButton,
  Text,
  useTheme,
  Pressable,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { gql, useQuery } from '@apollo/client';
import {
  ChartAccountType,
  IChartAccount,
} from '../../apollo/cache/chartAccounts/types';
import { remove } from '../../apollo/cache/chartAccounts';
import { SearchInput } from './styles';
import useDebounce from '../../hooks/useDebounce';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export default function ChartAccountsList(): JSX.Element {
  const debouncer = useDebounce();
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();
  const { data, loading, refetch } = useQuery<{
    chartAccounts: IChartAccount[];
  }>(
    gql`
      query Q($search: String) {
        chartAccounts(search: $search) @client {
          id
          ... on ChartAccount {
            name
            code
          }
        }
      }
    `,
    {
      variables: {
        search,
      },
    },
  );
  const methods = useForm({ defaultValues: { search: '' } });

  return (
    <Stack>
      <FormProvider {...methods}>
        <Box
          bg={theme.colors.custom.primary}
          p={5}
          border={0}
          paddingBottom={20}
        >
          <Box
            bg={theme.colors.custom.white}
            border={0}
            borderRadius={100}
            overflow="hidden"
          >
            <SearchInput
              name="search"
              placeholder="Pesquisar conta"
              InputLeftElement={
                <Feather
                  name="search"
                  size={26}
                  style={{
                    backgroundColor: theme.colors.custom.white,
                    padding: 20,
                    color: theme.colors.custom.muted,
                  }}
                />
              }
              onChangeText={(e) => debouncer(() => setSearch(e))}
            />
          </Box>
        </Box>
      </FormProvider>
      <Box borderRadius={30} marginTop={-10} bg={theme.colors.custom.secondary}>
        <FlatList
          data={data?.chartAccounts}
          refreshing={loading}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <Pressable
              px={5}
              onPress={() => navigation.navigate('coa.put', { id: item.id })}
            >
              <Stack
                direction="row"
                p={4}
                mb={3}
                alignItems="center"
                justifyContent="space-between"
                bg={theme.colors.custom.white}
                borderRadius={16}
              >
                <Text
                  color={
                    item.type === ChartAccountType.receita
                      ? theme.colors.custom.warning
                      : theme.colors.custom.success
                  }
                >{`${item.code} - ${item.name}`}</Text>
                <IconButton
                  variant="ghost"
                  onPress={() => [remove(item.id), refetch()]}
                  icon={
                    <Feather
                      size={20}
                      color={theme.colors.custom.muted}
                      name="trash"
                    />
                  }
                />
              </Stack>
            </Pressable>
          )}
          ListHeaderComponent={() => (
            <Stack p={5} direction="row" justifyContent="space-between">
              <Text fontSize={'lg'}>Listagem</Text>
              <Text color={theme.colors.custom.muted}>
                {data?.chartAccounts.length} registro(s)
              </Text>
            </Stack>
          )}
          ListEmptyComponent={() => <Text>Sem itens</Text>}
        />
      </Box>
    </Stack>
  );
}
