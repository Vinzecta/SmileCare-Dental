import { X, CheckCircle, XCircle } from 'lucide-react';

const PopUpContent = ({ status }) => {
    const iconClass = "w-12 h-12";
    
    if (status === 'success') {
        return <CheckCircle className={`${iconClass} text-green-500`} />;
    } else if (status === 'fail') {
        return <XCircle className={`${iconClass} text-red-500`} />;
    } else {
        return <span className="text-4xl">😊</span>;
    }
}

export default function Popup({ onClose, onNavigate, content, title, icon, action }) {
  const getBgColor = () => {
    if (icon === 'success') return 'bg-green-100';
    if (icon === 'fail') return 'bg-red-100';
    return 'bg-yellow-100';
  };

  return (
    // Thêm z-[60] để nằm trên AppointmentPopup (z-50)
    <div className="fixed inset-0 bg-black/40 bg-opacity-1 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md !mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="!p-8">
          {/* Icon */}
          <div className="flex justify-start !mb-4">
            <div className={`w-16 h-16 ${getBgColor()} rounded-full flex items-center justify-center`}>
              <PopUpContent status={icon} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 !mb-3">
            {title}
          </h2>

          {/* Description */}
          {content && (
            <p className="text-gray-600 text-sm leading-relaxed !mb-6">
              {content}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 !px-6 !py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onNavigate}
              className="flex-1 !px-6 !py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}