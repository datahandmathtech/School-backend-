'use client'
import React, { useRef } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MonthYearFilterProps {
  selectedMonth: number;
  selectedYear: number;
  onFilterChange: (month: number, year: number) => void;
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
}

const monthOptions = [
  { label: 'Full Year', value: 0 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
// If current month is Jan-Mar, the FY started last year.
const baseFyYear = currentMonth <= 3 ? currentYear - 1 : currentYear;
const years = Array.from({ length: 5 }, (_, i) => baseFyYear - 2 + i);

const MonthYearFilter: React.FC<MonthYearFilterProps> = ({ selectedMonth, selectedYear, onFilterChange, selectedDate, onDateSelect }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  const handleDateClick = () => {
    if (onDateSelect && !selectedDate && dateInputRef.current) {
        try {
            if ('showPicker' in HTMLInputElement.prototype) {
                dateInputRef.current.showPicker();
            } else {
                dateInputRef.current.focus();
            }
        } catch(e) {
            console.error(e);
        }
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
      <div 
        className={cn("flex items-center gap-2 px-3 py-2 border-r border-gray-100 relative group min-w-[80px]", onDateSelect && !selectedDate && "cursor-pointer hover:bg-gray-50 transition-colors rounded-xl")}
        onClick={handleDateClick}
      >
        {selectedDate ? (
          <div className="flex items-center gap-2 z-10 w-full justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mb-0.5">Selected Date</span>
              <span className="text-xs font-bold text-gray-700 leading-none">{new Date(selectedDate).toLocaleDateString('en-IN', {day: '2-digit', month: 'short'})}</span>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDateSelect?.(''); }} 
              className="p-1 hover:bg-gray-100 rounded-full text-red-500 transition-colors"
              title="Clear Date"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <Calendar className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-500 uppercase tracking-widest leading-tight text-left transition-colors">
              Filter<br/>Period
            </span>
          </>
        )}
        
        {onDateSelect && (
          <input 
             ref={dateInputRef}
             type="date" 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none w-0 h-0"
             value={selectedDate || ''}
             onChange={e => onDateSelect(e.target.value)}
          />
        )}
      </div>
      
      <div className="flex gap-2 p-1">
        <select 
          value={selectedMonth}
          onChange={(e) => onFilterChange(parseInt(e.target.value), selectedYear)}
          className="bg-gray-50 border-none text-sm font-bold text-gray-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
        >
          {monthOptions.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        <select 
          value={selectedYear}
          onChange={(e) => onFilterChange(selectedMonth, parseInt(e.target.value))}
          className="bg-gray-50 border-none text-sm font-bold text-gray-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
        >
          {years.map(y => (
            <option key={y} value={y}>FY {y}-{y + 1}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearFilter;
