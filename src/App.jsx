import { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import RoleSelector from './components/RoleSelector';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from './mockBackend';

function App() {
  const [role, setRole] = useState();
  const [appointments, setAppointments] = useState(getAppointments());

  useEffect(() => {
    const localStorageData = localStorage.getItem('userRole');
    const userRole = localStorageData ? JSON.parse(localStorageData) : 'Guest';
    setRole(userRole);
  }, []);

  const handleCreate = (appointment) => {
    const newAppointment = createAppointment(appointment);
    const updatedAppointments = [...appointments, newAppointment];
    const uniqueAppointments = Array.from(
      new Map(updatedAppointments.map((item) => [item.id, item])).values()
    );
    setAppointments(uniqueAppointments);
  };

  const handleApproval = (id) => {
    const updatedAppt = updateAppointment(id, { status: 'Approved' });
    if (updatedAppt) {
      setAppointments(appointments);
    }
  };

  const handleUpdate = (data) => {
    const updatedAppt = updateAppointment(data.id, { date: data.date });
    if (updatedAppt) {
      setAppointments(appointments);
    }
  };

  const handleDelete = (id) => {
    deleteAppointment(id);
    setAppointments(getAppointments());
  };

  const handleRoleUpdate = (role) => {
    setRole(role);
    localStorage.setItem('userRole', JSON.stringify(role));
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.md" mt={4}>
        <RoleSelector role={role} setRole={handleRoleUpdate} />
        {role === 'Guest' && (
          <AppointmentForm mode="create" onCreate={handleCreate} />
        )}
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

export default App;
