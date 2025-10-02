
import { createContext } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string, ipKey?: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role: Role, ipKey?: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
});