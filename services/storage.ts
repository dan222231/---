import { Role, Subject, UserWithPassword } from '../types';

/**
 * A simple wrapper for localStorage that handles JSON serialization.
 */

/**
 * Saves a value to localStorage under a specific key.
 * @param key The key to save the value under.
 * @param value The value to save. It will be JSON.stringified.
 */
export const set = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item "${key}" in localStorage:`, error);
  }
};

/**
 * Retrieves a value from localStorage.
 * @param key The key of the value to retrieve.
 * @param defaultValue The default value to return if the key doesn't exist or if there's an error.
 * @returns The parsed value from localStorage, or the default value.
 */
export const get = <T>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return defaultValue;
    }
    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Error getting item "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Initializes localStorage with default data if it hasn't been done before.
 */
export const initStorage = () => {
    if (get('storageInitialized', false)) {
        return;
    }
    
    console.log('Initializing storage for the first time...');

    const teacherId = 'teacher-1';
    const initialUsers: UserWithPassword[] = [
        { id: teacherId, name: 'Вчитель Адмін', email: 'teacher@example.com', role: Role.Teacher, password: 'password123' },
        { id: 'student-1', name: 'Тестовий Учень', email: 'student@example.com', role: Role.Student, password: 'password123' },
    ];
    set('users', initialUsers);

    const subjectTitles = [
      'Українська мова', 'Українська література', 'Зарубіжна література', 'Англійська мова', 
      'Німецька мова', 'Математика', 'Алгебра', 'Геометрія', 'Інформатика', 'Історія України', 
      'Всесвітня історія', 'Географія', 'Біологія', 'Фізика', 'Хімія', 'Астрономія', 
      'Основи здоров\'я', 'Фізична культура', 'Трудове навчання', 'Мистецтво', 'Музичне мистецтво',
      'Правознавство', 'Громадянська освіта', 'Економіка', 'Захист Вітчизни', 'Екологія'
    ];
    
    const initialSubjects: Subject[] = subjectTitles.map((title, index) => ({
        id: `subject-${index + 1}`,
        title,
        teacherId: teacherId
    }));
    set('subjects', initialSubjects);

    // Set empty defaults for other keys to avoid issues
    set('homeworks', []);
    set('notes', []);
    set('messages', []);
    set('settings', { theme: 'system' });


    set('storageInitialized', true);
};