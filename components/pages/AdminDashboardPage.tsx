import React from 'react';
import { User, Subject, Homework, Role } from '../../types';

interface AdminDashboardPageProps {
  users: User[];
  subjects: Subject[];
  homeworks: Homework[];
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ users, subjects, homeworks }) => {
  const studentCount = users.filter(u => u.role === Role.Student).length;
  const teacherCount = users.filter(u => u.role === Role.Teacher).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Адміністративна панель</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Всього користувачів</h3>
          <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Учнів</h3>
          <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{studentCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Вчителів</h3>
          <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{teacherCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Домашніх завдань</h3>
          <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{homeworks.length}</p>
        </div>
      </div>

      {/* Users and Subjects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Користувачі</h2>
          <ul className="divide-y divide-slate-200 dark:divide-slate-700 max-h-96 overflow-y-auto">
            {users.map(user => (
              <li key={user.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === Role.Teacher ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Предмети</h2>
          <ul className="divide-y divide-slate-200 dark:divide-slate-700 max-h-96 overflow-y-auto">
            {subjects.map(subject => (
              <li key={subject.id} className="py-3">
                <p className="font-medium text-slate-900 dark:text-white">{subject.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Вчитель: {users.find(u => u.id === subject.teacherId)?.name || 'Не призначено'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardPage;
