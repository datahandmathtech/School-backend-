import React from 'react';
import { X } from 'lucide-react';

export default function PhotoViewerModal({ photoUrl, onClose }: { photoUrl: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur">
            <X className="w-5 h-5" />
          </button>
        </div>
        <img src={photoUrl} alt="Punch In Evidence" className="w-full h-auto object-contain max-h-[80vh]" />
        <div className="p-4 bg-white text-center border-t border-gray-100">
          <p className="font-bold text-gray-800">Attendance Photo Evidence</p>
          <p className="text-xs text-gray-500 mt-1">Captured at punch-in time</p>
        </div>
      </div>
    </div>
  );
}
