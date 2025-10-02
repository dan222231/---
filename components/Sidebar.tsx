import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import { useTheme } from '../hooks/useTheme';

// Icons for the sidebar
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const NotesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const MessagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414M19.778 4.222l-1.414 1.414M4.222 19.778l1.414-1.414M12 12a2 2 0 100-4 2 2 0 000 4z" /></svg>;
const HomeworkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;


type Page = 'calendar' | 'notes' | 'messages' | 'settings' | 'contact' | 'admin' | 'admin-dashboard';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isSidebarOpen }) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const commonNavItems = [
    { id: 'calendar', label: 'Календар', icon: <CalendarIcon /> },
    { id: 'notes', label: 'Нотатки', icon: <NotesIcon /> },
    { id: 'messages', label: 'Оголошення', icon: <MessagesIcon /> },
  ];

  const studentNavItems = [
    ...commonNavItems,
    { id: 'contact', label: 'Зв\'язок з адміном', icon: <ContactIcon /> },
  ];

  const teacherNavItems = [
    { id: 'admin-dashboard', label: 'Панель', icon: <DashboardIcon /> },
    ...commonNavItems,
    { id: 'admin', label: 'Керування Д/З', icon: <HomeworkIcon /> },
  ];

  const navItems = user?.role === Role.Teacher ? teacherNavItems : studentNavItems;

  return (
    <aside className={`bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} md:w-64`}>
      <div className={`p-4 border-b border-slate-200 dark:border-slate-700 flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} md:justify-between`}>
        <div className={`flex items-center gap-2 ${isSidebarOpen ? '' : 'hidden'} md:flex`}>
          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name.charAt(0)}
          </span>
          <span className="font-bold text-lg">Щоденник</span>
        </div>
      </div>
      <nav className="flex-grow p-2">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id as Page)}
                className={`flex items-center w-full text-left p-3 my-1 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span className={`ml-4 ${isSidebarOpen ? '' : 'hidden'} md:inline`}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center gap-2">
            <button onClick={() => setTheme('light')} className={`p-2 rounded-full ${theme === 'light' ? 'bg-indigo-200 dark:bg-indigo-800' : ''}`}><SunIcon/></button>
            <button onClick={() => setTheme('dark')} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-indigo-200 dark:bg-indigo-800' : ''}`}><MoonIcon/></button>
            <button onClick={() => setTheme('system')} className={`p-2 rounded-full ${theme === 'system' ? 'bg-indigo-200 dark:bg-indigo-800' : ''}`}><SystemIcon/></button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
