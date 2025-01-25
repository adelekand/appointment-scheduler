import { Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex w="100%" bg="blue.500" color="white" p={4} justify="center">
      <Heading size="lg">Appointment Scheduler</Heading>
    </Flex>
  );
}

export default Navbar;
