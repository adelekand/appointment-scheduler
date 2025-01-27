// Key for localStorage
const STORAGE_KEY = 'appointments';

// Helper to fetch data from localStorage
const fetchFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save data to localStorage
export const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Initialize appointments from localStorage
let appointments = fetchFromStorage();

export const createAppointment = (appointment) => {
  const newAppointment = { id: Date.now(), ...appointment, status: 'Pending' };
  appointments.push(newAppointment);
  saveToStorage(appointments);
  return newAppointment;
};

export const getAppointments = () => {
  return appointments;
};

export const updateAppointment = (id, updatedData) => {
  const index = appointments.findIndex((appt) => appt.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updatedData };
    saveToStorage(appointments);
    return appointments[index];
  }
  return null;
};

export const deleteAppointment = (id) => {
  appointments = appointments.filter((appt) => appt.id !== id);
  saveToStorage(appointments);
};
