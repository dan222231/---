import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';
import Input from './ui/Input';

interface LoginProps {
  setAuthView: (view: 'login' | 'register') => void;
}

const Login: React.FC<LoginProps> = ({ setAuthView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ipKey, setIpKey] = useState('');
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);

  const isTeacherLogin = email.toLowerCase() === 'teacher@example.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, isTeacherLogin ? ipKey : undefined);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Увійти до щоденника
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Використовуйте свої дані для входу
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              label="Пароль"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isTeacherLogin && (
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
                {loading ? 'Вхід...' : 'Увійти'}
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Немає акаунту?{' '}
            <button onClick={() => setAuthView('register')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Зареєструватися
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;