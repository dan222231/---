
import React, { useState } from 'react';
import { Homework, Subject } from '../types';
import HomeworkModal from './HomeworkModal';

interface CalendarProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  homeworks: Homework[];
  subjects: Subject[];
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, setCurrentDate, homeworks, subjects }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  const startDayOfWeek = (startOfMonth.getDay() + 6) % 7; // Monday is 0
  startDate.setDate(startDate.getDate() - startDayOfWeek);
  
  const dates = [];
  let currentDatePointer = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(currentDatePointer));
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
  }

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };
  
  const getHomeworkForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return homeworks.filter(hw => hw.date === dateString);
  };

  const openModal = (date: Date) => {
      setSelectedDate(date);
  };
  
  const closeModal = () => {
      setSelectedDate(null);
  }

  return (
    <>
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">&lt;</button>
        <h2 className="text-xl font-semibold capitalize">
          {currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-slate-500 dark:text-slate-400">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {dates.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const homeworkForDay = getHomeworkForDate(date);
          
          return (
            <div
              key={index}
              className={`p-2 h-24 rounded-lg flex flex-col cursor-pointer transition-colors ${
                isCurrentMonth ? 'bg-slate-50 dark:bg-slate-700/50 hover:bg-indigo-100 dark:hover:bg-slate-600' : 'bg-transparent text-slate-400 dark:text-slate-500'
              }`}
              onClick={() => openModal(date)}
            >
              <span className={`self-end w-7 h-7 flex items-center justify-center rounded-full ${
                isToday ? 'bg-indigo-600 text-white' : ''
              }`}>
                {date.getDate()}
              </span>
              <div className="flex-grow overflow-y-auto text-xs mt-1">
                {homeworkForDay.length > 0 && 
                  <div className="flex items-center justify-center gap-1 bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded px-1 py-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 11-2 0V4zm4 4a1 1 0 00-1 1v6a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    <span>{homeworkForDay.length}</span>
                  </div>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {selectedDate && (
        <HomeworkModal
            date={selectedDate}
            homeworks={getHomeworkForDate(selectedDate)}
            subjects={subjects}
            onClose={closeModal}
        />
    )}
    </>
  );
};

export default Calendar;
