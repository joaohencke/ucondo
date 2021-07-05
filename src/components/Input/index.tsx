import React from 'react';
import { IInputProps, Input } from 'native-base';
import { useController, Controller, useFormContext } from 'react-hook-form';

interface CustomInputProps extends IInputProps {
  name: string;
}

export default function CustomInput({
  name,
  ...props
}: CustomInputProps): JSX.Element {
  const { field } = useController({
    name,
    rules: { required: props.isRequired },
  });
  const { value, ref, onChange } = field;

  return <Input {...props} value={value} onChangeText={onChange} ref={ref} />;
}
