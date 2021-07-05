import React, { useState } from 'react';
import { Stack, FlatList, Input, Box, IconButton, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { gql, useQuery } from '@apollo/client';
import { IChartAccount } from '../../apollo/cache/chartAccounts/types';
import { remove } from '../../apollo/cache/chartAccounts';
import useDebounce from '../../hooks/useDebounce';

export default function ChartAccountsList(): JSX.Element {
  const debouncer = useDebounce();
  const [search, setSearchText] = useState('');
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

  return (
    <Stack>
      <Input
        placeholder="Pesquisar conta"
        InputLeftElement={<Feather name="search" />}
        onChangeText={(e) => debouncer(() => setSearchText(e))}
      />
      <Box rounded="lg">
        <FlatList
          data={data?.chartAccounts}
          refreshing={loading}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <Box p={5}>
              <Stack direction="row" justifyContent="space-between">
                <Text>{`${item.code} - ${item.name}`}</Text>
                <IconButton
                  variant="ghost"
                  onPress={() => [remove(item.id), refetch()]}
                  icon={<Feather name="trash" />}
                />
              </Stack>
            </Box>
          )}
          ListEmptyComponent={() => <Text>Sem itens</Text>}
        />
      </Box>
    </Stack>
  );
}
