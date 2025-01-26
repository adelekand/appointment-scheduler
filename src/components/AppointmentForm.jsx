import { Box, Button, Input, Stack } from '@chakra-ui/react';
import { Field } from './ui/field';
import { useState } from 'react';

function AppointmentForm({ onCreate, onUpdate, mode, appointment }) {
  const [guestName, setGuestName] = useState(appointment?.guestName || '');
  const [date, setDate] = useState(appointment?.date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === 'create'
      ? onCreate({ guestName, date })
      : onUpdate({ id: appointment.id, guestName, date });
    setGuestName('');
    setDate('');
  };

  return (
    <Box p={4} shadow="md" borderWidth="1px" rounded="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Field label="Guest Name">
            <Input
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={mode === 'update'}
              required
            />
          </Field>
          <Field label="Appointment Date">
            <Input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>
          <Button type="submit" bg="blue.500">
            {mode === "create" ? 'Create Appointment' : 'Update appointment'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default AppointmentForm;
