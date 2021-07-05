import React, { useRef } from 'react';
import {
  Center,
  AlertDialog,
  Button,
  Stack,
  useTheme,
  Text,
} from 'native-base';

interface AlertProps {
  isOpen?: boolean;
  toggle: (val?: boolean) => void;
  onConfirmation: () => void;
  title: string | JSX.Element;
  message: string | JSX.Element;
}

export default function CustomAlert({
  isOpen,
  toggle,
  onConfirmation,
  title,
  message,
}: AlertProps): JSX.Element {
  const cancelRef = useRef();
  const theme = useTheme();

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => toggle(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{message}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Stack space={2} direction="row">
              <Button ref={cancelRef} onPress={() => toggle()} variant="ghost">
                <Text color={theme.colors.custom.danger}> Não!</Text>
              </Button>
              <Button
                onPress={onConfirmation}
                bgColor={theme.colors.custom.danger}
              >
                Com certeza
              </Button>
            </Stack>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
