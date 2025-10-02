
import React from 'react';
import { Homework, Subject } from '../types';

interface HomeworkModalProps {
  date: Date;
  homeworks: Homework[];
  subjects: Subject[];
  onClose: () => void;
}

const HomeworkModal: React.FC<HomeworkModalProps> = ({ date, homeworks, subjects, onClose }) => {
  const getSubjectTitle = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.title || 'Невідомий предмет';
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold">Домашнє завдання на</h2>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{date.toLocaleDateString('uk-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="p-6 overflow-y-auto">
          {homeworks.length > 0 ? (
            <ul className="space-y-4">
              {homeworks.map(hw => (
                <li key={hw.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{getSubjectTitle(hw.subjectId)}</h3>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{hw.title}</p>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{hw.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">На цей день домашніх завдань немає.</p>
          )}
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 rounded-md font-semibold"
            >
                Закрити
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomeworkModal;
