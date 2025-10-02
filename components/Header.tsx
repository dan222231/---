import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm p-4 flex justify-between items-center flex-shrink-0 border-b border-slate-200 dark:border-slate-700">
      <div>
        {/* Can be used for breadcrumbs or page titles in the future */}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-slate-700 dark:text-slate-300 hidden sm:block">
          Вітаємо, <span className="font-semibold">{user?.name}</span>
        </span>
        <Button onClick={logout} variant="secondary" size-sm="true">
          Вийти
        </Button>
      </div>
    </header>
  );
};

export default Header;