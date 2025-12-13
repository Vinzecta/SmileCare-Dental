const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const { headers: optionHeaders, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...optionHeaders,
    },
    ...restOptions,
  });

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export async function fetchServices() {
  return request("/services");
}

export async function fetchDoctorsByService(serviceId) {
  if (!serviceId) {
    return [];
  }

  return request(`/services/${serviceId}/doctors`);
}

export async function fetchDoctorSchedule(doctorId, date) {
  if (!doctorId || !date) {
    return { work_shifts: [] };
  }

  const params = new URLSearchParams({ doctor_id: String(doctorId), date });
  return request(`/schedule?${params.toString()}`);
}

export async function fetchAppointmentsByPatient(patientId) {
  if (!patientId) {
    throw new Error("Patient id is required to fetch appointments.");
  }

  return request(`/appointment/${patientId}`);
}

export async function fetchAllSchedules() {
  return request("/schedules");
}

export async function cancelAppointment(appointmentId) {
  if (!appointmentId) {
    throw new Error("Appointment id is required to cancel.");
  }

  return request("/appointment/cancel", {
    method: "POST",
    body: JSON.stringify({ appointmentId }),
  });
}
