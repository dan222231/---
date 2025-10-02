import React, { useState } from 'react';
import { Homework, Subject } from '../../types';
import Calendar from '../Calendar';

interface CalendarPageProps {
  homeworks: Homework[];
  subjects: Subject[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({ homeworks, subjects }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Календар домашніх завдань</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Натисни на день, щоб побачити всі предмети й деталі завдань.</p>
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        homeworks={homeworks}
        subjects={subjects}
      />
    </div>
  );
};

export default CalendarPage;