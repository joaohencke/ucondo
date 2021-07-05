import React from 'react';
import {
  Stack,
  FormControl,
  ScrollView,
  IconButton,
  useToast,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { gql, useQuery } from '@apollo/client';
import Select from '../../components/Select';
import Input from '../../components/Input';
import {
  IChartAccount,
  ChartAccountType,
} from '../../apollo/cache/chartAccounts/types';
import {
  add,
  ChartAccount,
  chartAccounts,
} from '../../apollo/cache/chartAccounts';

export default function ChartAccountsPut(): JSX.Element {
  const navigation = useNavigation();
  const toast = useToast();
  const methods = useForm<IChartAccount>({
    shouldUnregister: false,
    defaultValues: {
      type: ChartAccountType.receita,
      acceptRelease: true,
      parentId: '',
      code: '',
      name: '',
    },
  });
  const { handleSubmit, formState, setValue } = methods;
  const { errors } = formState;

  const { data } = useQuery<{
    chartAccounts: IChartAccount[];
  }>(
    gql`
      query Q($acceptRelease: Boolean) {
        chartAccounts(acceptRelease: $acceptRelease) @client {
          id
          code
          name
        }
      }
    `,
    {
      variables: { acceptRelease: false },
    },
  );

  const submit = handleSubmit(
    ({ name, parentId, code, acceptRelease, type }) => {
      try {
        add({
          name,
          parentId,
          code,
          type,
          acceptRelease: `${acceptRelease}` === 'true',
        });
        toast.show({
          title: 'Plano de Conta cadastrado com sucesso',
        });
        navigation.navigate('coa.list');
      } catch (e) {
        toast.show({
          title: e.message,
        });
      }
    },
  );

  const onChangeParent = (parentId: string) => {
    try {
      const nextCode = ChartAccount.nextValidCode(parentId);
      methods.reset({
        ...methods.getValues(),
        code: nextCode,
      });
    } catch (e) {
      const parent = chartAccounts().find((x) => x.id === parentId);

      if (!parent?.parentId) {
        return;
      }

      const grandParent = chartAccounts().find((x) => x.id === parent.parentId);
      if (!grandParent) {
        return;
      }

      setValue('parentId', grandParent?.id);
      onChangeParent(grandParent?.id);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight() {
        return <IconButton onPress={submit} icon={<Feather name="check" />} />;
      },
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Stack>
        <FormProvider {...methods}>
          <FormControl>
            <FormControl.Label>Conta pai</FormControl.Label>
            <Select
              name="parentId"
              onValueChange={onChangeParent}
              options={
                data?.chartAccounts.map((x) => ({
                  label: `${x.code} - ${x.name}`,
                  value: x.id,
                })) ?? []
              }
            />
          </FormControl>
          <FormControl isInvalid={'code' in errors}>
            <FormControl.Label>Código</FormControl.Label>
            <Input
              isRequired
              name="code"
              keyboardType="numbers-and-punctuation"
            />
          </FormControl>
          <FormControl isInvalid={'name' in errors}>
            <FormControl.Label>Nome</FormControl.Label>
            <Input name="name" isRequired />
          </FormControl>
          <FormControl isInvalid={'type' in errors}>
            <FormControl.Label>Tipo</FormControl.Label>
            <Select
              isRequired
              name="type"
              options={[
                { label: 'Receita', value: ChartAccountType.receita },
                { label: 'Despesa', value: ChartAccountType.despesa },
              ]}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Aceita lançamentos</FormControl.Label>
            <Select
              name="acceptRelease"
              options={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
            />
          </FormControl>
        </FormProvider>
      </Stack>
    </ScrollView>
  );
}
