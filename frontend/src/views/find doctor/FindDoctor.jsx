import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Doctor from "../../assets/find doctor.jpg"
import { useState, useEffect } from "react";
import { Search, ChevronUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function FindDoctor() {
    const [searchValue, setSearchValue] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]); // ✅ Thêm state cho services
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllDoctor = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/doctors");
                
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                
                const data = await response.json();
                setDoctors(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching doctors:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        const fetchServices = async () => {
            try {
                const res = await fetch("http://localhost:5000/services");
                const data = await res.json();
                setServices(data);
            } catch (err) {
                console.error('Error fetching services:', err);
            }
        }

        fetchAllDoctor();
        fetchServices();
    }, [])

    const handleBookNow = (doctorId) => {
        navigate(`/doctor-detail/${doctorId}`)
    };

    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch =
            searchValue.trim() === '' ||
            doctor.full_name.toLowerCase().includes(searchValue.toLowerCase());

        const matchesService =
            selectedService === '' ||
            doctor.services?.includes(selectedService); 

        const matchesSpecialty =
            selectedSpecialty === '' ||
            doctor.specialties?.includes(selectedSpecialty);

        return matchesSearch && matchesService && matchesSpecialty;
    });


    return (
        <>
            <Header />

            {/* Hero Section */}
            <h1 className="text-[40px] text-[#9F695C] font-serif text-center !py-25">Find Your Perfect Dental Specialist!</h1>

            {/* Description Section */}
            <section className="bg-[#FAFAFA] !py-20">
                <div className="w-[90%] !mx-auto flex gap-10">
                    <div className="w-[50%] !my-auto text-justify tracking-tight">
                        <p>The SmileCare Dental Network is proud to connect you with leading dental professionals. We have meticulously vetted every dentist and clinic to ensure you receive the highest quality and most compassionate care available. Whether you need a general check-up, orthodontics, or implant placement, our system allows you to easily search, compare profiles, experience, and real patient reviews. Start your search for an expert below and book your appointment in just minutes!</p>
                    </div>

                    <div className="w-[50%]">
                        <img src={Doctor} alt="Doctor" />
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <div className="w-full max-w-6xl !mx-auto !p-8">
                <div className="relative !mb-6">
                    <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 !px-5 !py-4">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search for your doctor..."
                            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                        />
                        <Search className="!w-5 !h-5 text-gray-400 !ml-3" />
                    </div>
                </div>
            </div>

            {/* Doctor Card Display */}
            <div className="w-full max-w-7xl !mx-auto !p-8">
                {loading && (
                    <div className="text-center !py-10">
                        <p className="text-gray-600">Loading doctors...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center !py-10">
                        <p className="text-red-600">Error: {error}</p>
                    </div>
                )}

                {!loading && !error && doctors.length === 0 && (
                    <div className="text-center !py-10">
                        <p className="text-gray-600">No doctors found.</p>
                    </div>
                )}

                {!loading && !error && doctors.length > 0 && (
                    <div className="grid grid-cols-3 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.doctor_id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                            >
                                {/* Doctor Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={doctor.image || '/placeholder-doctor.jpg'}
                                        alt={doctor.full_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Doctor Info */}
                                <div className="!p-5">
                                    <h3 className="text-xl font-semibold text-gray-800 !mb-3 text-center">
                                        {doctor.full_name}
                                    </h3>

                                    <div className="!mb-3">
                                        <span className="text-sm font-semibold text-gray-700">Specialty: </span>
                                        <span className="text-sm text-gray-600 line-clamp-1">
                                            {doctor.specialties.join(', ')}
                                        </span>                                    
                                    </div>

                                    <div className="!mb-3">
                                        <span className="text-sm font-semibold text-gray-700">Experience: </span>
                                        <span className="text-sm text-gray-600">{doctor.experience} years</span>
                                    </div>

                                    <div className="!mb-4">
                                        <span className="text-sm font-semibold text-gray-700">Description: </span>
                                        <span className="text-sm text-gray-600 line-clamp-2">
                                            {doctor.description}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleBookNow(doctor.doctor_id)}
                                        className="w-full cursor-pointer bg-slate-600 hover:bg-slate-700 text-white font-medium !py-3 !px-6 rounded-full transition-colors duration-300"
                                    >
                                        BOOK NOW
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}