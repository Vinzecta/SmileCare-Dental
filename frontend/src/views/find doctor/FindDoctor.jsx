import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Doctor from "../../assets/find doctor.jpg"
import { useState } from "react";
import { Search, ChevronUp } from 'lucide-react';

export default function FindDoctor() {
    const [searchValue, setSearchValue] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);

    const specialties = [
        'Nha khoa tổng quát',
        'Niềng răng chỉnh nha',
        'Cấy ghép Implant',
        'Phục hồi thẩm mỹ',
        'Nội nha - Điều trị tủy',
        'Nha chu',
    ];

    const services = [
        'Khám tổng quát',
        'Tẩy trắng răng',
        'Nhổ răng khôn',
        'Bọc sứ',
        'Trám răng',
        'Lấy cao răng',
    ];

    const handleSearch = () => {
        console.log('Searching:', { searchValue, selectedSpecialty, selectedService });
    };

    const doctors = [
    {
      id: 1,
      name: "Dr. Lmao",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
      specialty: "General Dentistry, Cosmetic Veneers.",
      experience: "12 Years.",
      description: "The Doctor Has Deep Expertise In Crafting 'Hollywood Smiles' And Complex Root Canal Treatments."
    },
    {
      id: 2,
      name: "Dr. Lmao",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
      specialty: "General Dentistry, Cosmetic Veneers.",
      experience: "12 Years.",
      description: "The Doctor Has Deep Expertise In Crafting 'Hollywood Smiles' And Complex Root Canal Treatments."
    },
    {
      id: 3,
      name: "Dr. Lmao",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=300&fit=crop",
      specialty: "General Dentistry, Cosmetic Veneers.",
      experience: "12 Years.",
      description: "The Doctor Has Deep Expertise In Crafting 'Hollywood Smiles' And Complex Root Canal Treatments."
    },
    {
      id: 4,
      name: "Dr. Lmao",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop",
      specialty: "General Dentistry, Cosmetic Veneers.",
      experience: "12 Years.",
      description: "The Doctor Has Deep Expertise In Crafting 'Hollywood Smiles' And Complex Root Canal Treatments."
    },
    {
      id: 5,
      name: "Dr. Lmao",
      image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=300&fit=crop",
      specialty: "General Dentistry, Cosmetic Veneers.",
      experience: "12 Years.",
      description: "The Doctor Has Deep Expertise In Crafting 'Hollywood Smiles' And Complex Root Canal Treatments."
    },
    {
      id: 6,
      name: "Dr. Lmao",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
      specialty: "General Dentistry, Cosmetic Veneers.",
      experience: "12 Years.",
      description: "The Doctor Has Deep Expertise In Crafting 'Hollywood Smiles' And Complex Root Canal Treatments."
    }
  ];

    const handleBookNow = (doctorId) => {
        console.log('Booking doctor with ID:', doctorId);
        // Thêm logic đặt lịch ở đây
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <h1 className="text-[40px] text-[#9F695C] font-serif text-center !py-25">Find Your Perfect Dental Specialist!</h1>

            {/* Desctiption Section */}
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

                {/* Filter Dropdowns */}
                <div className="flex gap-4 items-center">
                    {/* Specialty Dropdown */}
                    <div className="relative flex-1">
                    <button
                        onClick={() => {
                        setShowSpecialtyDropdown(!showSpecialtyDropdown);
                        setShowServiceDropdown(false);
                        }}
                        className="w-full flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 !px-5 !py-4 hover:border-gray-300 transition-colors"
                    >
                        <span className={selectedSpecialty ? 'text-gray-700' : 'text-gray-400'}>
                        {selectedSpecialty || 'Specialty'}
                        </span>
                        <ChevronUp className={`!w-5 !h-5 text-gray-400 transition-transform ${showSpecialtyDropdown ? '' : 'rotate-180'}`} />
                    </button>

                    {showSpecialtyDropdown && (
                        <div className="absolute top-full !mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 !py-2 !z-10">
                        {specialties.map((specialty) => (
                            <button
                            key={specialty}
                            onClick={() => {
                                setSelectedSpecialty(specialty);
                                setShowSpecialtyDropdown(false);
                            }}
                            className="w-full text-left !px-5 !py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                            >
                            {specialty}
                            </button>
                        ))}
                        </div>
                    )}
                    </div>

                    {/* Service Dropdown */}
                    <div className="relative flex-1">
                    <button
                        onClick={() => {
                        setShowServiceDropdown(!showServiceDropdown);
                        setShowSpecialtyDropdown(false);
                        }}
                        className="w-full flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 !px-5 !py-4 hover:border-gray-300 transition-colors"
                    >
                        <span className={selectedService ? 'text-gray-700' : 'text-gray-400'}>
                        {selectedService || 'Service'}
                        </span>
                        <ChevronUp className={`w-5 h-5 text-gray-400 transition-transform ${showServiceDropdown ? '' : 'rotate-180'}`} />
                    </button>

                    {showServiceDropdown && (
                        <div className="absolute top-full !mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 !py-2 !z-10">
                        {services.map((service) => (
                            <button
                            key={service}
                            onClick={() => {
                                setSelectedService(service);
                                setShowServiceDropdown(false);
                            }}
                            className="w-full text-left !px-5 !py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                            >
                            {service}
                            </button>
                        ))}
                        </div>
                    )}
                    </div>
                </div>
            </div>

            {/* Doctor Card Display */}
            <div className="w-full max-w-7xl !mx-auto !p-8">
                <div className="grid grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                        {/* Doctor Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                        />
                        </div>

                        {/* Doctor Info */}
                        <div className="!p-5">
                        {/* Name */}
                        <h3 className="text-xl font-semibold text-gray-800 !mb-3 text-center">
                            {doctor.name}
                        </h3>

                        {/* Specialty */}
                        <div className="!mb-3">
                            <span className="text-sm font-semibold text-gray-700">Specialty: </span>
                            <span className="text-sm text-gray-600">{doctor.specialty}</span>
                        </div>

                        {/* Experience */}
                        <div className="!mb-3">
                            <span className="text-sm font-semibold text-gray-700">Experience: </span>
                            <span className="text-sm text-gray-600">{doctor.experience}</span>
                        </div>

                        {/* Description */}
                        <div className="!mb-4">
                            <span className="text-sm font-semibold text-gray-700">Description: </span>
                            <span className="text-sm text-gray-600">{doctor.description}</span>
                        </div>

                        {/* Book Now Button */}
                        <button
                            onClick={() => handleBookNow(doctor.id)}
                            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium !py-3 !px-6 rounded-full transition-colors duration-300"
                        >
                            BOOK NOW
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}