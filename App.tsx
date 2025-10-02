import React, { useState, useMemo } from 'react';
import { AuthContext } from './context/AuthContext';
import { User, Role } from './types';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { mockLogin, mockRegister } from './services/api';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, pass: string, ipKey?: string) => {
    setError(null);
    try {
      const loggedInUser = await mockLogin(email, pass, ipKey);
      setUser(loggedInUser);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const register = async (name: string, email: string, pass: string, role: Role, ipKey?: string) => {
    setError(null);
    try {
      const newUser = await mockRegister(name, email, pass, role, ipKey);
      setUser(newUser);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthView('login');
  };

  const authContextValue = useMemo(() => ({ user, login, logout, register, error }), [user, error]);

  const renderContent = () => {
    if (!user) {
      if (authView === 'login') {
        return <Login setAuthView={setAuthView} />;
      }
      return <Register setAuthView={setAuthView} />;
    }
    return <Dashboard />;
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        {renderContent()}
      </div>
    </AuthContext.Provider>
  );
};

export default App;