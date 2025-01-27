import { Box, Button, Flex, Stack, Text, HStack } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import AppointmentForm from './AppointmentForm';

function AppointmentList({
  appointments,
  onHandleApproval,
  onUpdate,
  onDelete,
  role,
}) {
  const handleUpdate = (data) => {
    onUpdate(data);
  };

  return (
    <HStack spacing={4}>
      {appointments.map((appt) => (
        <Box key={appt.id} p={4} shadow="md" borderWidth="1px" rounded="md">
          <Text>
            <strong>Guest:</strong> {appt.guestName}
          </Text>
          <Text>
            <strong>Date:</strong> {appt.date}
          </Text>
          {role === 'Host' && (
            <Flex mt={2} gap={2}>
              <DialogRoot>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Reschedule appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reschedule appointment</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <AppointmentForm
                      appointment={appt}
                      mode="update"
                      onUpdate={handleUpdate}
                    />
                  </DialogBody>
                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>
              <Button
                size="sm"
                onClick={() => onHandleApproval(appt.id)}
                bg="blue.500"
              >
                Approve
              </Button>
              <Button size="sm" onClick={() => onDelete(appt.id)} bg="red.500">
                Cancel
              </Button>
            </Flex>
          )}
        </Box>
      ))}
    </HStack>
  );
}

export default AppointmentList;
