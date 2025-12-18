import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppointmentPopup from "../../components/AppointmentPopup";

export default function DoctorDetail() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null); // ❗ Ban đầu là null để check dễ hơn
    const [loading, setLoading] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetch(`http://localhost:5000/doctor-detail/${id}`);
                const data = await res.json();
                setDoctor(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    if (loading) return <div className="!p-10">Loading...</div>;
    if (!doctor) return <div className="!p-10 text-red-500">Doctor not found</div>;

    return (
        <>
        <Header />

        <div className="w-[80%] !mx-auto !py-20 font-sans">

            {/* TOP SECTION */}
            <div className="flex gap-15">

                {/* IMAGE */}
                <div className="w-[30%]">
                    <img
                        src={doctor.doctor?.image}
                        alt={doctor.doctor?.full_name}
                        className="object-cover rounded-xl shadow-md"
                    />
                </div>

                {/* TEXT INFO */}
                <div className="flex-1 w-[70%] !my-auto">
                    <h2 className="text-3xl font-semibold !mb-3">
                        {doctor.doctor?.full_name}
                    </h2>

                    <p className="!mb-1">
                        <span className="font-semibold">Specialty: </span>
                        {doctor.specialties?.join(", ")}
                    </p>

                    <p className="!mb-1">
                        <span className="font-semibold">Experience: </span>
                        {doctor.doctor?.experience} years
                    </p>

                    <p className="!mt-3 w-full text-gray-700 leading-relaxed !pb-3 border-b border-b-[#DDDCDA]">
                        <span className="font-semibold">Description: </span>
                        {doctor.doctor?.description}
                    </p>

                    <button onClick={() => setShowPopUp(true)} className="!mt-6 !px-10 !py-3 bg-[#3d4f48] w-full text-white rounded-full hover:bg-[#2f3f38] transition">
                        BOOK APPOINTMENT
                    </button>
                </div>
            </div>

            {/* ADDITIONAL INFO */}
            <div className="!mt-14">
                <h3 className="text-xl font-semibold !mb-6">Additional Information</h3>

                <div className="border-t border-gray-300">
                    <Row title="Education & Credential" list={doctor.doctor?.education} />
                    <Row title="Specific Experience" list={doctor.doctor?.experience_list} />
                    <Row title="Awards And Recognition" list={doctor.doctor?.awards} />
                    <Row title="Community Outreach" list={doctor.doctor?.community} />
                    <Row title="Working Hours" list={doctor.doctor?.working_hours} />
                </div>
            </div>
        </div>

        {/* Appointment pop up */}
        {
            showPopUp ? <AppointmentPopup onClose={() => setShowPopUp(false)} doctor_id={doctor.doctor.doctor_id} /> : null
        }
        <Footer />
        </>
    );
}

function Row({ title, list }) {
    return (
        <div className="flex border-b border-gray-300 !py-6">
            <div className="w-60 font-semibold text-gray-800 !pr-6">{title}</div>

            <div className="flex-1 text-gray-700 leading-relaxed">
                {Array.isArray(list) && list.length > 0 ? (
                    list.map((item, i) => (
                        <p key={i} className="mb-1">• {item}</p>
                    ))
                ) : (
                    <p className="text-gray-400 italic">No data</p>
                )}
            </div>
        </div>
    );
}
