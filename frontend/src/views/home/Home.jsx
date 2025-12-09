import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchServices } from '../../api/clinicApi.js';

const imagePool = [
  '/service1.jpg',
  '/service2.jpg',
  '/service3.jpg',
  '/service4.jpg',
  '/service5.jpg',
  '/service6.jpg',
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadServices = async () => {
      try {
        setLoadingServices(true);
        const data = await fetchServices();
        if (!ignore) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!ignore) {
          setServicesError('We were unable to load featured services.');
        }
      } finally {
        if (!ignore) {
          setLoadingServices(false);
        }
      }
    };

    loadServices();

    return () => {
      ignore = true;
    };
  }, []);

  const featuredServices = services.slice(0, 3);

  return (
    <div className="page-container bg-beige">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-xl">
          <h1 className="hero-title font-serif">
            Book Your Doctor
            <br />
            Appointment in Minutes
          </h1>
          <p className="hero-text">
            Connect with experienced doctors across multiple specialties. Easy booking, convenient scheduling,
            professional care.
          </p>
          <button className="btn btn-dark btn">
            Book Appointment
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="hero-image-frame">
            <img
              src="home1.jpg"
              alt="Professional doctor with stethoscope"
            />
          </div>
        </div>
      </section>

      {/* Section 1: Why Choose SmileCare Dental */}
      <section className="why-section">
        {/* Left Content Card */}
        <div className="why-content">
          <div style={{ maxWidth: '32rem' }}>
            <h2 className="why-title font-serif">
              Why Choose
              <br />
              SmileCare Dental?
            </h2>
            <p style={{ color: '#6b6b6b', marginBottom: '2rem', lineHeight: 1.6 }}>
              At SmileCare Dental, we connect you with experienced medical professionals dedicated to your wellbeing.
              Our platform offers convenient online booking, verified doctors across multiple specialties, and a
              seamless healthcare experience. Whether you need a routine checkup or specialized treatment, we make
              quality healthcare accessible and stress-free.
            </p>
            <button className="btn btn-teal">
              Book Now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="why-image-wrapper">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4rem', backgroundColor: '#d4d0cb' }}></div>
          <img
            src="home2.jpg"
            alt="Female doctor with clipboard"
          />
        </div>
      </section>

      {/* Section 2: Our Medical Services */}
      <section className="services-preview">
        <h2 className="text-center font-serif section-title-lg">Our Medical Services</h2>

        {loadingServices ? (
          <p className="service-status">Loading featured services...</p>
        ) : servicesError ? (
          <p className="service-status error">{servicesError}</p>
        ) : featuredServices.length === 0 ? (
          <p className="service-status">Services will be showcased here soon.</p>
        ) : (
          <div className="services-grid-home">
            {featuredServices.map((service, index) => {
              const imageSrc = imagePool[index % imagePool.length];
              return (
                <div key={service.service_id} className="service-card">
                  <div className="service-img-wrapper">
                    <img
                      src={imageSrc}
                      alt={service.service_name}
                    />
                  </div>
                  <h3 className="font-serif">{service.service_name}</h3>
                  <p>
                    Typical visit length: {service.duration} minutes
                  </p>
                  <button className="btn btn-teal-sm">
                    Book Appointment
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 3: Testimonials */}
      <section className="testimonials">
        <div className="text-center" style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <p style={{ color: '#9a7b6b', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>What Our Patients Say</p>
          <h2 className="font-serif" style={{ fontSize: '2.25rem', color: '#4a5d5e', marginBottom: '3rem' }}>Real Stories From Real People</h2>

          <p style={{ color: '#4a4a4a', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem' }}>
            "Booking An Appointment Was Incredibly Easy And Convenient. The Doctor Was Professional, Attentive, And Took
            Time To Answer All My Questions. The Entire Experience From Scheduling To Consultation Was Seamless. I
            Highly Recommend Smile Healthcare To Anyone Looking For Quality Medical Care."
          </p>

          <p style={{ color: '#9a7b6b', fontWeight: 500 }}>
            Sarah Johnson <span style={{ color: '#4a5d5e' }}>| General Checkup Patient</span>
          </p>

          {/* Pagination Dots */}
          <div className="dots">
            <div className="dot dot-brown"></div>
            <div className="dot dot-gray"></div>
            <div className="dot dot-gray"></div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA Section */}
      <section className="cta-section">
        <div className="text-center" style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2rem' }}>Ready To Take Care Of Your Health?</h2>
          <p style={{ color: '#4a4a4a', marginBottom: '2.5rem', lineHeight: 1.6, textTransform: 'capitalize' }}>
            Join Thousands Of Satisfied Patients Who Trust Smile Healthcare For Their Medical Needs. Our Platform
            Connects You With Qualified Doctors Across Multiple Specialties. Easy Booking, Professional Care, And
            Convenient Scheduling - All At Your Fingertips. Take The First Step Towards Better Health Today
          </p>
          <button className="btn btn-teal">
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}