import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./PopUp";

/* ===== Utils ===== */
function formatDateToInput(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{9,15}$/;

/* ===== Component ===== */
export default function AppointmentPopup({ onClose, doctor_id }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedDate, setSelectedDate] = useState(
    formatDateToInput(new Date())
  );

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  /* ===== Form state ===== */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sendSMS: false
  });

  const [errors, setErrors] = useState({});

  /* ===== Status style ===== */
  const getStatusClass = (status, isSelected) => {
    let base = "border rounded-lg !py-2 text-sm font-medium ";

    if (isSelected) {
      return base + "border-green-600 bg-green-100 text-green-700";
    }

    switch (status) {
      case "unavailable":
        return base + "border-red-500 text-red-500 cursor-not-allowed";
      case "pending":
        return base + "border-yellow-500 text-yellow-500";
      case "available":
        return base + "border-gray-500 text-gray-700 hover:bg-gray-100";
      default:
        return base + "border-gray-300 text-gray-400";
    }
  };

  /* ===== Fetch working hours ===== */
  useEffect(() => {
    if (!doctor_id || !selectedDate) return;

    const controller = new AbortController();

    const fetchWorkingHour = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/doctors/${doctor_id}/working-hours?date=${selectedDate}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        console.log(data);

        const slots = data.schedules.map((s) => ({
          schedule_id: s.schedule_id,
          time: `${s.shift.start_time} - ${s.shift.end_time}`,
          status: s.status,
          shift: s.shift
        }));

        setTimeSlots(slots);
        setSelectedSlot(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setTimeSlots([]);
        }
      }
    };

    fetchWorkingHour();
    return () => controller.abort();
  }, [doctor_id, selectedDate]);

  /* ===== Validation ===== */
  const validate = () => {
    const newErrors = {};

    if (!selectedSlot) {
      newErrors.slot = "Please select a time slot";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ===== Submit ===== */
  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      schedule_id: selectedSlot.schedule_id,
      doctor_id,
      date: selectedDate,
      shift: selectedSlot.shift,
      patient: form
    };

    console.log("BOOKING PAYLOAD:", payload);

    try {
      const res = await fetch("http://localhost:5000/appointment/create", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({scheduleId: selectedSlot.schedule_id, patientId: user.id }),
      });

      const data = await res.json();
      setSuccessMessage(true);
    } catch (err) {
      alert("Fail submit the data");
    }
  };

  /* ===== Render ===== */
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[650px] rounded-xl !p-8 shadow-lg max-h-[90vh] overflow-y-auto">

        <h2 className="text-center text-2xl font-semibold text-[#9F695C] !mb-6">
          Confirm Your Appointment
        </h2>

        {/* DATE */}
        <div className="flex justify-between items-center !mb-4">
          <h3 className="text-lg font-medium text-gray-700">
            Appointment Date
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-100 !px-4 !py-2 rounded-lg outline-none"
          />
        </div>

        {/* TIME GRID */}
        <div className="grid grid-cols-4 gap-4 !mb-2">
          {timeSlots.length === 0 && (
            <p className="col-span-4 text-center text-gray-500">
              No time slots available
            </p>
          )}

          {timeSlots.map((slot, idx) => (
            <button
              key={idx}
              disabled={slot.status !== "available"}
              onClick={() => setSelectedSlot(slot)}
              className={getStatusClass(
                slot.status,
                selectedSlot?.time === slot.time
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {errors.slot && (
          <p className="text-red-500 text-sm !mb-4">{errors.slot}</p>
        )}

        {/* PATIENT INFO */}
        <h3 className="text-lg font-semibold text-gray-700 !mb-4">
          Patient Information
        </h3>

        <div className="grid grid-cols-2 gap-4 !mb-2">
          <div>
            <input
              className="border !p-3 rounded-lg w-full"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              className="border !p-3 rounded-lg w-full"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="!mb-2">
          <input
            className="border !p-3 rounded-lg w-full"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="!mb-4">
          <input
            className="border !p-3 rounded-lg w-full"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <label className="flex items-center gap-2 !mb-8">
          <input
            type="checkbox"
            checked={form.sendSMS}
            onChange={(e) =>
              setForm({ ...form, sendSMS: e.target.checked })
            }
          />
          <span className="text-sm text-gray-700">
            Send Appointment Detail Via SMS
          </span>
        </label>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="bg-red-600 !py-3 rounded-lg text-white hover:bg-red-700"
          >
            CANCEL
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-700 !py-3 rounded-lg text-white hover:bg-green-800"
          >
            BOOK APPOINTMENT
          </button>
        </div>
      </div>

      {
        successMessage ? <Popup onClose={() => navigate("/appointments")}
                                onNavigate={() => navigate("/appointments")}
                                title={"Create appointment successfully"}
                                content={"Click continue button to go to appointments page"}
                                icon={'successful'}
                                action={'Continue'} /> : null
      }
    </div>
  );
}
