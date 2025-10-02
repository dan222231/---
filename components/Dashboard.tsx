import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role, Subject, Homework, Note, Message, User } from '../types';
import * as api from '../services/api';
import Sidebar from './Sidebar';
import Header from './Header';
import CalendarPage from './pages/CalendarPage';
import NotesPage from './pages/NotesPage';
import HomeworkManagementPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import MessagesPage from './pages/MessagesPage';
import ContactAdminPage from './pages/ContactAdminPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Notification from './Notification';

type Page = 'calendar' | 'notes' | 'messages' | 'settings' | 'contact' | 'admin' | 'admin-dashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState<Page>(user?.role === Role.Teacher ? 'admin-dashboard' : 'calendar');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Data states
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [subjectsData, homeworksData, notesData, messagesData, usersData] = await Promise.all([
        api.getSubjects(),
        api.getHomeworks(),
        api.getNotes(user.id),
        api.getMessages(),
        user.role === Role.Teacher ? api.getUsers() : Promise.resolve([])
      ]);
      setSubjects(subjectsData);
      setHomeworks(homeworksData);
      setNotes(notesData);
      setMessages(messagesData);
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to load data:", error);
      showNotification('Помилка завантаження даних');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Data mutation handlers
  const addHomework = async (homework: Omit<Homework, 'id' | 'createdBy'>) => {
    if (!user) return;
    const newHomework = await api.addHomework({ ...homework, createdBy: user.id });
    setHomeworks(prev => [...prev, newHomework]);
    showNotification('Домашнє завдання успішно додано!');
  };

  const addNote = async (note: Omit<Note, 'id' | 'userId' | 'date'>) => {
    if (!user) return;
    const newNote = await api.addNote({ ...note, userId: user.id });
    setNotes(prev => [...prev, newNote].sort((a,b) => (a.title > b.title ? 1 : -1)));
    showNotification('Нотатку успішно створено!');
  };

  const updateNote = async (note: Note) => {
    const updatedNote = await api.updateNote(note);
    setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
    showNotification('Нотатку оновлено!');
  };

  const deleteNote = async (id: string) => {
    await api.deleteNote(id);
    setNotes(prev => prev.filter(n => n.id !== id));
    showNotification('Нотатку видалено.');
  };

  const addMessage = async (message: Omit<Message, 'id' | 'authorId' | 'authorName' | 'date'>) => {
    if (!user) return;
    const newMessage = await api.addMessage(message, user);
    setMessages(prev => [newMessage, ...prev]);
    showNotification('Оголошення відправлено!');
  };

  const renderPage = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center h-full"><p>Завантаження даних...</p></div>;
    }

    switch (activePage) {
      case 'calendar':
        return <CalendarPage homeworks={homeworks} subjects={subjects} />;
      case 'notes':
        return <NotesPage notes={notes} homeworks={homeworks} addNote={addNote} updateNote={updateNote} deleteNote={deleteNote} />;
      case 'messages':
        return <MessagesPage messages={messages} addMessage={addMessage} />;
      case 'settings':
        return <SettingsPage />;
      case 'contact':
        return <ContactAdminPage />;
      case 'admin':
        return <HomeworkManagementPage subjects={subjects} homeworks={homeworks} addHomework={addHomework} />;
      case 'admin-dashboard':
        return <AdminDashboardPage users={users} subjects={subjects} homeworks={homeworks} />;
      default:
        return <CalendarPage homeworks={homeworks} subjects={subjects} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default Dashboard;
