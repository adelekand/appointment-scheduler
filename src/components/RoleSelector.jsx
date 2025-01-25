import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';

const RoleSelector = ({ role, setRole }) => {
  return (
    <Box textAlign="center" my={4}>
      <Text fontSize="xl" mb={2}>
        Current Role: <strong>{role}</strong>
      </Text>
      <ButtonGroup>
        <Button
          bg={role === 'Guest' ? 'blue.500' : 'gray'}
          onClick={() => setRole('Guest')}
        >
          Guest
        </Button>
        <Button
          bg={role === 'Host' ? 'blue.500' : 'gray'}
          onClick={() => setRole('Host')}
        >
          Host
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default RoleSelector;
