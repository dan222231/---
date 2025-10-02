// FIX: Implemented mock API functions to provide data and fix module errors.
import { get, set } from './storage';
import { User, Role, Subject, Homework, Note, Message, UserWithPassword } from '../types';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth ---

export const mockLogin = async (email: string, pass: string, ipKey?: string): Promise<User> => {
  await delay(500);
  const users = get<UserWithPassword[]>('users', []);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error('Користувача з таким email не знайдено.');
  }

  if (pass !== user.password) { 
    throw new Error('Неправильний пароль.');
  }
  
  if (user.role === Role.Teacher && ipKey !== 'DZ-2134334') {
      throw new Error('Неправильний IP-ключ.');
  }

  const { password, ...userToReturn } = user;
  return userToReturn;
};

export const mockRegister = async (name: string, email: string, pass: string, role: Role, ipKey?: string): Promise<User> => {
    await delay(500);
    const users = get<UserWithPassword[]>('users', []);

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Користувач з таким email вже існує.');
    }

    if (pass.length < 8) {
        throw new Error('Пароль має бути не менше 8 символів.');
    }
    
    if (role === Role.Teacher && ipKey !== 'DZ-2134334') {
        throw new Error('Неправильний IP-ключ для реєстрації вчителя.');
    }

    const newUser: UserWithPassword = {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        password: pass,
    };

    set('users', [...users, newUser]);
    
    const { password, ...userToReturn } = newUser;
    return userToReturn;
};

// --- Data Fetching ---

export const getUsers = async (): Promise<User[]> => {
    await delay(300);
    const usersWithPasswords = get<UserWithPassword[]>('users', []);
    return usersWithPasswords.map(({ password, ...user }) => user);
}

export const getSubjects = async (): Promise<Subject[]> => {
    await delay(300);
    return get<Subject[]>('subjects', []);
};

export const getHomeworks = async (): Promise<Homework[]> => {
    await delay(300);
    return get<Homework[]>('homeworks', []);
};

export const getNotes = async (userId: string): Promise<Note[]> => {
    await delay(300);
    const allNotes = get<Note[]>('notes', []);
    return allNotes.filter(note => note.userId === userId);
};

export const getMessages = async (): Promise<Message[]> => {
    await delay(300);
    const messages = get<Message[]>('messages', []);
    return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};


// --- Data Mutation ---

export const addHomework = async (homework: Omit<Homework, 'id'>): Promise<Homework> => {
    await delay(400);
    const homeworks = get<Homework[]>('homeworks', []);
    const newHomework: Homework = { ...homework, id: crypto.randomUUID() };
    set('homeworks', [...homeworks, newHomework]);
    return newHomework;
};

export const addNote = async (note: Omit<Note, 'id' | 'date'>): Promise<Note> => {
    await delay(400);
    const notes = get<Note[]>('notes', []);
    const newNote: Note = { 
        ...note, 
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };
    set('notes', [...notes, newNote]);
    return newNote;
};

export const updateNote = async (updatedNote: Note): Promise<Note> => {
    await delay(400);
    const notes = get<Note[]>('notes', []);
    const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    set('notes', updatedNotes);
    return updatedNote;
};

export const deleteNote = async (id: string): Promise<void> => {
    await delay(400);
    const notes = get<Note[]>('notes', []);
    const updatedNotes = notes.filter(note => note.id !== id);
    set('notes', updatedNotes);
};

export const addMessage = async (message: Omit<Message, 'id' | 'authorId' | 'authorName' | 'date'>, author: User): Promise<Message> => {
    await delay(400);
    const messages = get<Message[]>('messages', []);
    const newMessage: Message = {
        ...message,
        id: crypto.randomUUID(),
        authorId: author.id,
        authorName: author.name,
        date: new Date().toISOString(),
    };
    const updatedMessages = [newMessage, ...messages];
    set('messages', updatedMessages);
    return newMessage;
};