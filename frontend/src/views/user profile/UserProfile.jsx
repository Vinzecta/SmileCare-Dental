import Header from "../../components/Header";
import Footer from "../../components/Footer"
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Droplet, Hash, Menu } from 'lucide-react';

export default function UserProfile() {
    const [patient, setPatient] = useState({});

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [selectedGender, setSelectedGender] = useState("Male");
    const [email, setEmail] = useState("johndoe@gmail.com");

    const handleSaveChanges = () => {
        alert('Changes saved successfully!');
    };

    useEffect(() => {
        const fetchUser = async () => {
            const account = JSON.parse(localStorage.getItem("user"));
            const res = await fetch(`http://localhost:5000/patient/${account.id}`);

            const data = await res.json();

            if (!res.ok) {
                alert("Cannot fetch user info");
            } else {
                setPatient(data);
            }
        };

        fetchUser();
    }, [])

    return (
        <>
            <Header />
            <div className="max-w-7xl !mx-auto !px-4 sm:px-6 lg:px-8 !py-8">
                <div className="flex gap-6">
                {/* Sidebar */}
                <div className="hidden lg:block w-16 bg-white rounded-lg shadow-sm !p-4 h-fit">
                    <div className="flex flex-col space-y-6">
                    <button className="!p-2 text-blue-600 bg-blue-50 rounded-lg">
                        <Menu className="w-6 h-6" />
                    </button>
                    <button className="!p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <User className="w-6 h-6" />
                    </button>
                    <button className="!p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <Calendar className="w-6 h-6" />
                    </button>
                    <button className="!p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <Mail className="w-6 h-6" />
                    </button>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm">
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-t-lg"></div>
                    
                    {/* Profile Info */}
                    <div className="!px-8 !pb-8">
                        <div className="flex items-start justify-between !-mt-16 !mb-6">
                        <div className="flex items-end space-x-4">
                            <img 
                            src="https://via.placeholder.com/120" 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                            />
                            <div className="!pb-2">
                            <h2 className="text-2xl font-bold text-gray-900">{patient.fullname}</h2>
                            <p className="text-gray-500">{patient.username}</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleSaveChanges}
                            className=" bg-blue-500 text-white !px-6 !py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Save changes
                        </button>
                        </div>

                        {/* Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !mt-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 !mb-2">
                            First Name
                            </label>
                            <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 !mb-2">
                            Last Name
                            </label>
                            <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 !mb-2">
                            Gender
                            </label>
                            <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 !mb-2">
                            Email
                            </label>
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full !px-4 !py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        </div>

                        {/* My Health Record */}
                        <div className="!mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 !mb-4">My Health Record</h3>
                        <div className="border border-gray-200 rounded-lg !p-4">
                            <div className="flex items-center space-x-3">
                            <div className="bg-gray-100 !p-2 rounded">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">Alexa Rawles</p>
                                <p className="text-sm text-gray-500">1 month ago</p>
                            </div>
                            </div>
                            <button className="!mt-4 text-blue-500 text-sm font-medium hover:text-blue-600">
                            +Add Another Record
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}