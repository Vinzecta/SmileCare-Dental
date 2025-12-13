import { Router } from "express";
import clinicData from "../data/dataLoader.js";

const router = Router();

// GET /api/users
router.get("/", (req, res) => {
  res.send("Backend Express đã chạy!");
});

//TODO

// Example usage: http://localhost:5000/login,=> Data (username, password) phải đc kèm trong body
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check required fields
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Find user by username
  const user = clinicData.patients.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Remove password before sending response
  const { password: pw, ...userWithoutPassword } = user;

  return res.json({
    message: "Login successful",
    user: userWithoutPassword,
  });
});

// Example usage: http://localhost:5000/patient/1 => Trả về thông tin của 1 bệnh nhân
router.get("/patient/:patientId", (req, res) => {
  const patientId = parseInt(req.params.patientId);

  // Find patient by id
  const patient = clinicData.patients.find(
    (p) => p.id === patientId
  );

  // If patient not found
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  // Return all patient info
  return res.json({
    patient,
  });
});


router.post("/appointment/create", (req, res) => {
  const { scheduleId, patientId } = req.body;

  // Validate input
  if (!scheduleId || !patientId) {
    return res.status(400).json({ message: "scheduleId and patientId are required" });
  }

  // Find schedule
  const schedule = clinicData.schedules.find(s => s.schedule_id === scheduleId);
  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }

  // Check schedule availability
  if (schedule.status !== "available") {
    return res.status(400).json({ message: "Schedule is not available" });
  }

  // Find patient
  const patient = clinicData.patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  // Create new appointment ID
  if (!clinicData.appointments) {
  clinicData.appointments = [];
  }

  const newAppointmentId =
    clinicData.appointments.length > 0
      ? clinicData.appointments[clinicData.appointments.length - 1].appointment_id + 1
      : 1;

  // Create appointment object
  const newAppointment = {
    appointment_id: newAppointmentId,
    schedule_id: scheduleId,
    status: "active",
    patient_id: patientId

  };

  // Push to database (in-memory)
  clinicData.appointments.push(newAppointment);

  // Update schedule to unavailable
  schedule.status = "unavailable";

  // Return response
  return res.json({
    message: "Appointment created successfully",
    appointmentId: newAppointment.appointment_id,
    patient: patient,
    schedule: schedule
  });
});

// Example usage: http://localhost:5000/appointment/1 => Trả về tất cả appointment của bệnh nhân có id = 1
router.get("/appointment/:patientId", (req, res) => {
  const patientId = parseInt(req.params.patientId);

  // Find patient by id
  const patient = clinicData.patients.find(
    (p) => p.id === patientId
  );

  // If patient not found
  if (!patient) {
    return res.status(404).json({ message: "No patient with this Id exists" });
  }

  // Find patient by id
  const appointment = clinicData.appointments.filter(
    (p) => p.patient_id === patientId
  );

  // Return all appointment of this patient
  return res.json({
    appointment
  });
});

// Example usage: http://localhost:5000/appointment/cancel => Appointment Id đc chứa trong body
router.post("/appointment/cancel", (req, res) => {
  const { appointmentId } = req.body;

  // Validate input
  if ( !appointmentId ) {
    return res.status(400).json({ message: "AppointmentId is required" });
  }

  // Find and cancel appointment with id
  const appointment = clinicData.appointments.find(
    (p) => p.appointment_id === appointmentId
  );

  // Validate input
  if ( !appointment ) {
    return res.status(400).json({ message: "No appointment of this Id exists" });
  }
  if (appointment.status === "cancel") {
    return res.status(400).json({ message: "This appointment is already cancel" });
  }
  // Cancel appointment
  appointment.status = "cancel"

  // Unlock corresponding schedule
  const schedule = clinicData.schedules.find(
    (p) => p.schedule_id === appointment.schedule_id
  );
  schedule.status = "available"

  // Return response
  return res.json({
    message: "Appointment cancel successfully",
  });
});

function saveDatabase() {
  fs.writeFileSync(
    "./clinicData.json",
    JSON.stringify(clinicData, null, 2),
    "utf8"
  );
}

export default router;
