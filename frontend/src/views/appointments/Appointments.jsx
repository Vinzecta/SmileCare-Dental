import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CancelPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#999',
            lineHeight: 1,
            padding: 0,
            width: '24px',
            height: '24px'
          }}
        >
          ×
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#FFF9C4',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertTriangle size={36} color="#F9A825" strokeWidth={2} />
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '12px',
              marginTop: 0
            }}>
              Cancel?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.5',
              margin: 0
            }}>
              Are you sure you want to cancel the appointment? This action cannot be undone and you will lose your slot.
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '32px'
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px 24px',
              backgroundColor: '#fff',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ccc';
              e.target.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.backgroundColor = '#fff';
            }}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '14px 24px',
              backgroundColor: '#000',
              border: '2px solid #000',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#000';
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ doctor, date, time, status, onDelete }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
        return '#4FC3F7';
      case 'pending':
        return '#FFD54F';
      case 'finished':
        return '#81C784';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div className="appointment-card">
      <div className="card-header">
        <h3 className="doctor-name">{doctor}</h3>
        <span className="appointment-date">{date}</span>
      </div>
      <div className="card-body">
        <div className="appointment-info">
          <p className="info-label">Appointment Date: <span className="info-value">{time}</span></p>
          <div className="status-row">
            <span className="info-label">Status:</span>
            <span 
              className="status-badge" 
              style={{ 
                backgroundColor: getStatusColor(status),
                color: '#fff'
              }}
            >
              {status}
            </span>
          </div>
        </div>
        <button className="delete-btn" onClick={onDelete}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const Apppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Lmao',
      date: '27/11/2025',
      time: '30/11/2025, 1:00PM',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Lmao',
      date: '27/11/2025',
      time: '30/11/2025, 1:00PM',
      status: 'Pending'
    },
    {
      id: 3,
      doctor: 'Dr. Lmao',
      date: '27/11/2025',
      time: '30/11/2025, 1:00PM',
      status: 'Finished'
    }
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setAppointmentToDelete(id);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentToDelete));
    }
    setShowPopup(false);
    setAppointmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setAppointmentToDelete(null);
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="filter-section">
          <button className="filter-btn">
            <span>Select Filter</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 4.5H21V6.5H3V4.5ZM7 11.5H17V13.5H7V11.5ZM11 18.5H13V20.5H11V18.5Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div className="appointments-list">
          {appointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              doctor={appointment.doctor}
              date={appointment.date}
              time={appointment.time}
              status={appointment.status}
              onDelete={() => handleDeleteClick(appointment.id)}
            />
          ))}
        </div>
      </main>
      
      <Footer />

      <CancelPopup
        isOpen={showPopup}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <style>{`
        * {
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }

        .main-content {
          flex: 1;
          padding: 40px 80px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .filter-section {
          margin-bottom: 30px;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          color: #999;
          font-size: 14px;
          transition: all 0.3s;
        }

        .filter-btn:hover {
          border-color: #ccc;
        }

        .appointments-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .appointment-card {
          background-color: #fff;
          border-radius: 16px;
          padding: 25px 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .appointment-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .doctor-name {
          color: #A0826D;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .appointment-date {
          color: #999;
          font-size: 14px;
        }

        .card-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .appointment-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-label {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .info-value {
          color: #333;
          font-weight: 500;
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-badge {
          padding: 4px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
        }

        .delete-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #E57373;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
        }

        .delete-btn:hover {
          background-color: #EF5350;
        }
      `}</style>
    </div>
  );
};

export default Apppointments;