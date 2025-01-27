import { useState, useEffect } from 'react';
import { Box, Container, Button, Input, Stack } from '@chakra-ui/react';
import { Field } from './ui/field';
import Navbar from './Navbar';
import RoleSelector from './RoleSelector';
import AppointmentList from './AppointmentList';

function HostView({ role, appointments, handleRoleUpdate, handleApproval, handleUpdate, handleDelete }) {
    const [loggedInUser, setLoggedInUser] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const localStorageData = localStorage.getItem('loggedInUser');
        const user = localStorageData ? JSON.parse(localStorageData) : undefined;
        setLoggedInUser(user);
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            setLoggedInUser("admin")
            localStorage.setItem("loggedInUser", JSON.stringify("admin"));
        }
    }

    return (
        <>
            <Navbar />
            <Container maxW="container.md" mt={4}>
                <RoleSelector role={role} setRole={handleRoleUpdate} />
                {!loggedInUser && (
                    <Box w="50%" justifySelf="center" p={4} shadow="md" borderWidth="1px" rounded="md">
                        <form onSubmit={onFormSubmit}>
                            <Stack spacing={4}>
                                <Field label="Username">
                                    <Input
                                        placeholder="Enter username"
                                        value={username}
                                        name="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Field>
                                <Field label="Password">
                                    <Input
                                        placeholder="Enter password"
                                        value={password}
                                        name="password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Field>
                                <Button type="submit" bg="blue.500">
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                )}
                {loggedInUser && (
                    <AppointmentList
                        appointments={appointments}
                        onHandleApproval={handleApproval}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        role={role}
                    />
                )}
            </Container>
        </>
    );
}

export default HostView;
