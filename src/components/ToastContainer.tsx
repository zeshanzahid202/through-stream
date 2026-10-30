import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-fadeIn ${
              toast.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700'
                : toast.type === 'warning'
                ? 'bg-amber-900/90 text-white border-amber-700'
                : toast.type === 'info'
                ? 'bg-[#0B1320]/95 text-white border-[#D8A84E]/40'
                : 'bg-[#0B1320]/95 text-white border-[#D8A84E]/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#D8A84E] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#D8A84E] shrink-0" />
              )}
              <span className="text-xs font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
              className="p-1 hover:bg-white/10 rounded cursor-pointer text-white/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
