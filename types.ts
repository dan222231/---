// FIX: Replaced incorrect implementation with proper type definitions to resolve compilation errors.
export enum Role {
  Student = 'student',
  Teacher = 'teacher',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface UserWithPassword extends User {
  password?: string;
}

export interface Subject {
  id: string;
  title: string;
  teacherId: string;
}

export interface Homework {
  id: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  attachments: string[];
  createdBy: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  linkedHomeworkId?: string;
}

export interface Message {
  id: string;
  authorId: string;
  authorName: string;
  date: string; // ISO string
  title: string;
  content: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface AppSettings {
  theme: Theme;
}
