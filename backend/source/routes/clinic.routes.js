import { Router } from "express";
import clinicData from "../data/dataLoader.js"

const router = Router();


// /services
router.get("/services", (req, res) => {
  return res.json(clinicData.services);
});

// /services/:id/doctors
router.get("/services/:serviceId/doctors", (req, res) => {
  const serviceId = parseInt(req.params.serviceId);

  const mapping = clinicData.doctor_service.find(
    (ds) => ds.service_id === serviceId
  );

  if (!mapping) {
    return res.status(404).json({ message: "Service not found" });
  }

  const doctors = clinicData.doctors.filter((d) =>
    mapping.doctors_id.includes(d.doctor_id)
  );

  return res.json({
    doctors,
  });
});

// /schedule?doctor_id=1&date=2025-12-10
router.get("/schedule", (req, res) => {
  const doctorId = parseInt(req.query.doctor_id);
  const date = req.query.date;

  if (!doctorId || !date) {
    return res.status(400).json({
      message: "Missing doctor_id or date",
    });
  }

  const work_shifts = clinicData.schedules.filter(
    (s) => s.doctor_id === doctorId && s.date === date
  ).map((s) => ({work_shifts: s.work_shifts}));

  if (work_shifts.length === 0) {
    return res.json({
      message: "No schedule found for this doctor on this date",
      work_shifts: [],
    });
  }

  return res.json({
    work_shifts,
  });
});

// Get All Schedule
// Example usage: http://localhost:5000/schedules => Trả về tất cả schedule, available hoặc unavailable
router.get("/schedules", (req, res) => {
  const fullSchedules = clinicData.schedules.map((schedule) => {
    const doctor = clinicData.doctors.find(
      (d) => d.doctor_id === schedule.doctor_id
    );

    const service = clinicData.services.find(
      (s) => s.service_id === schedule.service_id
    );

    return {
      ...schedule,
      doctor: doctor || null,
      service: service || null,
    };
  });

  res.json({ schedules: fullSchedules });
});

// /doctor
router.get("/doctors", (req, res) => {
  return res.json(clinicData.doctors)
});

// /doctor-detail/:id
router.get("/doctor-detail/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  
  const doctor = clinicData.doctors.find(
    (d) => d.doctor_id === doctorId
  );

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const serviceMappings = clinicData.doctor_service.filter((ds) =>
    ds.doctors_id.includes(doctorId)
  );

  const services = serviceMappings.map((m) => {
    const serviceInfo = clinicData.services.find(
      (s) => s.service_id === m.service_id
    );
    return serviceInfo;
  });

  return res.json({
    doctor,
    services,
    specialties: doctor.specialties,
  });
});


export default router;
