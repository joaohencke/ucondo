import React from 'react';
import { IInputProps } from 'native-base';
import { useController, Controller, useFormContext } from 'react-hook-form';
import Input from './style';
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

  return (
    <Input
      {...props}
      value={value}
      onChangeText={(e) => [onChange(e), props.onChangeText?.(e)]}
      ref={ref}
    />
  );
}
