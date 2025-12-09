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

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        if (!isCancelled) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!isCancelled) {
          setError('We could not load the services right now. Please try again later.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="services-page-container">
      <Header />

      {/* Services Content */}
      <main style={{ padding: '4rem 2rem' }}>
        <h1 className="font-serif text-center section-title-lg" style={{ marginBottom: '4rem' }}>Our Medical Services</h1>

        {/* Services Grid */}
        {loading ? (
          <p className="service-status">Loading services...</p>
        ) : error ? (
          <p className="service-status error">{error}</p>
        ) : services.length === 0 ? (
          <p className="service-status">Services will be listed here soon.</p>
        ) : (
          <div className="services-grid-page">
            {services.map((service, index) => {
              const imageSrc = imagePool[index % imagePool.length];
              return (
                <div key={service.service_id} className="service-card-page">
                  <div className="service-img-page">
                    <img
                      src={imageSrc}
                      alt={service.service_name}
                    />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#9a7b6b', marginBottom: '0.75rem' }}>{service.service_name}</h3>
                  <p style={{ color: '#6b6b6b', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                    Typical appointment duration: {service.duration} minutes
                  </p>
                  <button className="btn btn-teal-sm">
                    Book Appointment
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}