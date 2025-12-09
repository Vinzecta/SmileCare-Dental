import { useState, useEffect } from "react";

function formatDateToInput(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}


export default function AppointmentPopup({ onClose, doctor_id }) {
    const [selectedDate, setSelectedDate] = useState(formatDateToInput(new Date()));
  const times = [
    { time: "9:00AM", status: "occupied" },
    { time: "10:00AM", status: "pending" },
    { time: "11:00AM", status: "pending" },
    { time: "12:00AM", status: "available" },
    { time: "1:00PM", status: "available" },
    { time: "2:00PM", status: "available" },
    { time: "3:00PM", status: "available" },
    { time: "4:00PM", status: "available" },
    { time: "5:00PM", status: "available" },
    { time: "6:00PM", status: "available" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "occupied":
        return "border-red-500 text-red-500";
      case "pending":
        return "border-yellow-500 text-yellow-500";
      default:
        return "border-gray-500 text-gray-700";
    }
  };

  useEffect(() => {
    const fetchWorkingHour = async () => {
        const res = await fetch(`http://localhost:5000/schedule?doctor_id=${doctor_id}&date=${selectedDate}`);
        const data = await res.json();
        console.log(data);
    };
    fetchWorkingHour();
  }, [])

  return (
    // OVERLAY
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      {/* POPUP */}
      <div className="bg-white w-[650px] rounded-xl !p-8 shadow-lg max-h-[90vh] overflow-y-auto">

        {/* TITLE */}
        <h2 className="text-center text-2xl font-semibold text-[#9F695C] !mb-6">
          Confirm Your Appointment
        </h2>

        {/* DATE */}
        <div className="flex justify-between items-center !mb-4">
          <h3 className="text-lg font-medium text-gray-700">Appointment Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-100 !px-4 !py-2 rounded-lg outline-none cursor-pointer"
            />
        </div>

        {/* TIME GRID */}
        <div className="grid grid-cols-4 gap-4 !mb-4">
          {times.map((slot, idx) => (
            <button
              key={idx}
              className={`border rounded-lg !py-2 text-sm font-medium ${getStatusClass(
                slot.status
              )}`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {/* STATUS LEGEND */}
        <div className="flex items-center gap-4 text-sm !mb-8">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Occupied
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Pending
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-gray-600 rounded-full"></span> Available
          </div>
        </div>

        {/* PATIENT INFORMATION */}
        <h3 className="text-lg font-semibold text-gray-700 !mb-4">Patient Information</h3>

        <div className="grid grid-cols-2 gap-4 !mb-4">
          <input className="border !p-3 rounded-lg" placeholder="First Name" />
          <input className="border !p-3 rounded-lg" placeholder="Last Name" />
        </div>

        <input className="border !p-3 rounded-lg w-full !mb-4" placeholder="Email" />
        <input className="border !p-3 rounded-lg w-full !mb-4" placeholder="Phone Number" />

        <div className="flex items-center gap-3 !mb-4">
          <input type="date" className="border !p-3 rounded-lg" />
        </div>

        <label className="flex items-center gap-2 !mb-8">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm text-gray-700">Send Appointment Detail Via SMS</span>
        </label>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="bg-red-600 !py-3 rounded-lg text-white font-medium hover:bg-red-700"
          >
            CANCEL
          </button>

          <button className="bg-green-700 !py-3 rounded-lg text-white font-medium hover:bg-green-800">
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
}
