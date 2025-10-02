
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface RegisterProps {
  setAuthView: (view: 'login' | 'register') => void;
}

const Register: React.FC<RegisterProps> = ({ setAuthView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.Student);
  const [ipKey, setIpKey] = useState('');
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(name, email, password, role, role === Role.Teacher ? ipKey : undefined);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Створити профіль
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Це займе всього 30 секунд
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              label="Ім'я та прізвище"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Пароль (мінімум 8 символів)"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Select
              id="role"
              label="Роль"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value={Role.Student}>Учень</option>
              <option value={Role.Teacher}>Вчитель</option>
            </Select>

            {role === Role.Teacher && (
              <div className="transition-all duration-300 ease-in-out">
                <Input
                  id="ipKey"
                  label="IP-ключ"
                  type="text"
                  required
                  value={ipKey}
                  onChange={(e) => setIpKey(e.target.value)}
                />
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
              <Button type="submit" className="w-full flex justify-center" disabled={loading}>
                {loading ? 'Реєстрація...' : 'Зареєструватися'}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Вже маєте акаунт?{' '}
            <button onClick={() => setAuthView('login')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Увійти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;