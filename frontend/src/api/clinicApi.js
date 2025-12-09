const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
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
