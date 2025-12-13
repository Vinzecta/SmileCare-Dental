import Header from "../../components/Header";
import Footer from "../../components/Footer"
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Droplet, Hash, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserAppointment() {
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
                        <Link to={"/user-profile/appointment"} className="!p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                            <Calendar className="w-6 h-6" />
                        </Link>
                        <button className="!p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                            <Mail className="w-6 h-6" />
                        </button>
                        </div>
                    </div>  
                </div>
            </div>
            <Footer />
        </>
    )
}