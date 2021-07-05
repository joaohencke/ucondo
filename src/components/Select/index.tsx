import React from 'react';
import { Select, ISelectProps } from 'native-base';
import { useController } from 'react-hook-form';

interface Option {
  label: string;
  value: string | boolean | number;
}

interface SelectProps extends ISelectProps {
  options: Option[];
  name: string;
  isRequired?: boolean;
}

export default function CustomSelect({
  options,
  name,
  ...props
}: SelectProps): JSX.Element {
  const { field, fieldState } = useController({
    name,
    rules: {
      required: props.isRequired,
    },
  });

  const { value, onChange, ref } = field;

  return (
    <Select
      {...props}
      onValueChange={(e) => [onChange(e), props.onValueChange?.(e)]}
      selectedValue={value.toString()}
      ref={ref}
    >
      {options.map(({ label, value }, i) => (
        <Select.Item key={i} label={label} value={value.toString()} />
      ))}
    </Select>
  );
}
