import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { cancelAppointment, fetchAllSchedules, fetchAppointmentsByPatient } from '../../api/clinicApi';

const SHIFT_TIME_MAP = {
  1: { start: '07:00', end: '08:00' },
  2: { start: '08:00', end: '09:00' },
  3: { start: '09:00', end: '10:00' },
  4: { start: '10:00', end: '11:00' },
  5: { start: '11:00', end: '12:00' },
  6: { start: '12:00', end: '13:00' },
  7: { start: '13:00', end: '14:00' },
  8: { start: '14:00', end: '15:00' },
  9: { start: '15:00', end: '16:00' },
  10: { start: '16:00', end: '17:00' },
  11: { start: '17:00', end: '18:00' }
};

const formatShiftLabel = (workShiftId) => {
  if (!workShiftId) {
    return 'Time not assigned';
  }

  const slot = SHIFT_TIME_MAP[workShiftId];
  if (!slot) {
    return `Shift ${workShiftId}`;
  }

  return `${slot.start} - ${slot.end}`;
};

const formatDateLabel = (value) => {
  if (!value) {
    return 'Date not assigned';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const toDisplayStatus = (status) => {
  if (!status) {
    return 'Unknown';
  }

  const lower = status.toLowerCase();
  if (lower.length === 0) {
    return 'Unknown';
  }

  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

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
  const getStatusColor = (rawStatus) => {
    const normalized = rawStatus ? rawStatus.toLowerCase() : 'unknown';

    switch(normalized) {
      case 'confirmed':
      case 'active':
        return '#4FC3F7';
      case 'pending':
        return '#FFD54F';
      case 'finished':
      case 'completed':
        return '#81C784';
      case 'cancel':
      case 'cancelled':
        return '#E57373';
      default:
        return '#9E9E9E';
    }
  };

  const statusLabel = toDisplayStatus(status);

  return (
    <div className="appointment-card">
      <div className="card-header">
        <h3 className="doctor-name">{doctor}</h3>
        <span className="appointment-date">{date}</span>
      </div>
      <div className="card-body">
        <div className="appointment-info">
          <p className="info-label">Time: <span className="info-value">{time}</span></p>
          <div className="status-row">
            <span className="info-label">Status:</span>
            <span 
              className="status-badge" 
              style={{ 
                backgroundColor: getStatusColor(status),
                color: '#fff'
              }}
            >
              {statusLabel}
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
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedUser = window.localStorage.getItem('user');
    if (!storedUser) {
      setError('Please log in to view your appointments.');
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);

      if (!parsed || !parsed.id) {
        setError('Missing patient information. Please log in again.');
        setLoading(false);
        return;
      }

      setPatientId(parsed.id);
    } catch (parseError) {
      setError('Unable to read saved profile. Please log in again.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (patientId === null) {
      return;
    }

    let isCancelled = false;

    const loadAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const [appointmentsResponse, schedulesResponse] = await Promise.all([
          fetchAppointmentsByPatient(patientId),
          fetchAllSchedules()
        ]);

        if (isCancelled) {
          return;
        }

        const scheduleMap = new Map(
          (schedulesResponse?.schedules ?? []).map((schedule) => [schedule.schedule_id, schedule])
        );

        const items = (appointmentsResponse?.appointment ?? [])
          .map((entry) => {
            const schedule = scheduleMap.get(entry.schedule_id);
            const slot = schedule ? SHIFT_TIME_MAP[schedule.work_shifts_id] : null;
            const sortKeySource = schedule?.date && slot ? `${schedule.date}T${slot.start}` : schedule?.date;
            const parsedSortKey = sortKeySource ? Date.parse(sortKeySource) : NaN;
            const sortKey = Number.isNaN(parsedSortKey) ? Number.MAX_SAFE_INTEGER : parsedSortKey;

            return {
              id: entry.appointment_id ?? entry.id,
              doctor: schedule?.doctor?.full_name ?? 'Unknown doctor',
              date: formatDateLabel(schedule?.date),
              time: formatShiftLabel(schedule?.work_shifts_id),
              status: entry.status ?? schedule?.status ?? 'unknown',
              sortKey
            };
          })
          .sort((a, b) => a.sortKey - b.sortKey)
          .map(({ sortKey, ...rest }) => rest);

        setAppointments(items);
      } catch (loadError) {
        if (!isCancelled) {
          setError(loadError.message ?? 'Failed to load appointments.');
          setAppointments([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadAppointments();

    return () => {
      isCancelled = true;
    };
  }, [patientId]);

  const handleDeleteClick = (id) => {
    setAppointmentToDelete(id);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!appointmentToDelete) {
      return;
    }

    const targetId = appointmentToDelete;
    setError(null);

    try {
      await cancelAppointment(targetId);
      setAppointments((current) => current.filter((apt) => apt.id !== targetId));
    } catch (cancelError) {
      setError(cancelError.message ?? 'Failed to cancel the appointment.');
    } finally {
      setShowPopup(false);
      setAppointmentToDelete(null);
    }
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
          {loading ? (
            <div className="state-message">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            error ? (
              <div className="state-message state-error">{error}</div>
            ) : (
              <div className="state-message state-empty">You have no appointments yet.</div>
            )
          ) : (
            <>
              {error ? <div className="state-message state-error">{error}</div> : null}
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  doctor={appointment.doctor}
                  date={appointment.date}
                  time={appointment.time}
                  status={appointment.status}
                  onDelete={() => handleDeleteClick(appointment.id)}
                />
              ))}
            </>
          )}
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

        .state-message {
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          background-color: #fff;
          color: #666;
          text-align: center;
          font-size: 15px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          width: 100%;
        }

        .state-message.state-error {
          border-color: #ffcdd2;
          background-color: #ffebee;
          color: #c62828;
        }

        .state-message.state-empty {
          background-color: #fafafa;
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