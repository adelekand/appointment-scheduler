import { useState, useEffect } from 'react';
import HostView from './components/HostView';
import GuestView from './components/GuestView';
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
    updateAppointment(id, { status: 'Approved' });
    setAppointments(getAppointments());
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

  return role === "Guest" ? 
  (
    <GuestView
      role={role}
      appointments={appointments}
      handleCreate={handleCreate}
      handleRoleUpdate={handleRoleUpdate}
    />
  )
  : (
    <HostView
      appointments={appointments}
      handleApproval={handleApproval}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      handleRoleUpdate={handleRoleUpdate}
      role={role}
    />
    )
}

export default App;
