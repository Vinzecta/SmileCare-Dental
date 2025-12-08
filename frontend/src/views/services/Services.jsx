import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const services = [
  {
    title: "Cardiology",
    description:
      "Expert Cardiac Care And Monitoring. Our Cardiologists Offer Comprehensive Heart Health Evaluations, Treatment, And Ongoing Management For All Cardiovascular Conditions.",
    image: "service1.jpg",
  },
  {
    title: "Orthopedics",
    description:
      "Expert Treatment For Musculoskeletal Conditions, Sports Injuries, And Bone Disorders. Our Orthopedic Specialists Offer Diagnosis, Therapy, And Surgical Solutions To Restore Mobility And Reduce Pain.",
    image: "service2.jpg",
  },
  {
    title: "Lorem Ipsum Is",
    description:
      "Professional Dermatological Services For All Skin Conditions. From Acne Treatment And Skin Allergies To Cosmetic Procedures, Our Dermatologists Help You Achieve Healthy, Radiant Skin.",
    image: "service3.jpg",
  },
  {
    title: "Cardiology",
    description:
      "Expert Cardiac Care And Monitoring. Our Cardiologists Offer Comprehensive Heart Health Evaluations, Treatment, And Ongoing Management For All Cardiovascular Conditions.",
    image: "service4.jpg",
  },
  {
    title: "General Medicine",
    description:
      "Complete Health Assessments And Preventive Care. Our Experienced Doctors Provide Thorough Examinations, Diagnosis, And Treatment Plans Tailored To Your Needs.",
    image: "service5.jpg",
  },
  {
    title: "Neurology",
    description:
      "Advanced Care For Nervous System Disorders. Our Neurologists Diagnose And Treat Conditions Affecting The Brain, Spine, And Nerves With Precision And Compassion.",
    image: "service6.jpg",
  },
];

export default function Services() {
  return (
    <div className="services-page-container">
      <Header />

      {/* Services Content */}
      <main style={{ padding: '4rem 2rem' }}>
        <h1 className="font-serif text-center section-title-lg" style={{ marginBottom: '4rem' }}>Our Medical Services</h1>

        {/* Services Grid */}
        <div className="services-grid-page">
          {services.map((service, index) => (
            <div key={index} className="service-card-page">
              <div className="service-img-page">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                />
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#9a7b6b', marginBottom: '0.75rem' }}>{service.title}</h3>
              <p style={{ color: '#6b6b6b', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', padding: '0 0.5rem' }}>{service.description}</p>
              <button className="btn btn-teal-sm">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}