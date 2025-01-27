import { useState, useEffect } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import RoleSelector from './RoleSelector';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment,
} from '../mockBackend';

function GuestView({ role, handleCreate, appointments, handleRoleUpdate, handleApproval, handleUpdate, handleDelete }) {
    return (
        <>
            <Navbar />
            <Container maxW="container.md" mt={4}>
                <RoleSelector role={role} setRole={handleRoleUpdate} />
                <Flex w="100%" mb={4}>
                    <AppointmentForm mode="create" onCreate={handleCreate} />
                </Flex>
                <AppointmentList
                    appointments={appointments}
                    onHandleApproval={handleApproval}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    role={role}
                />
            </Container>
        </>
    );
}

export default GuestView;
