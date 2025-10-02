import React, { useState } from 'react';
import { Note, Homework } from '../../types';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

interface NotesPageProps {
  notes: Note[];
  homeworks: Homework[];
  addNote: (note: Omit<Note, 'id' | 'userId' | 'date'>) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const NotesPage: React.FC<NotesPageProps> = ({ notes, homeworks, addNote, updateNote, deleteNote }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [linkedHomeworkId, setLinkedHomeworkId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const openModal = (note: Note | null = null) => {
    setCurrentNote(note);
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setLinkedHomeworkId(note?.linkedHomeworkId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
    setTitle('');
    setContent('');
    setLinkedHomeworkId(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !user) return;
    
    setLoading(true);
    if (currentNote) {
      await updateNote({ ...currentNote, title, content, linkedHomeworkId });
    } else {
      await addNote({ title, content, linkedHomeworkId });
    }
    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Ви впевнені, що хочете видалити цю нотатку?')) {
        await deleteNote(id);
    }
  };
  
  const getHomeworkTitle = (hwId: string) => {
    return homeworks.find(hw => hw.id === hwId)?.title || 'Невідоме Д/З';
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Мої нотатки</h1>
            <p className="text-slate-600 dark:text-slate-400">Створюйте та редагуйте особисті нотатки.</p>
        </div>
        <Button onClick={() => openModal()}>Створити нотатку</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? notes.map(note => (
          <div key={note.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            {note.linkedHomeworkId && (
                <p className="text-xs mb-2 p-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-md text-indigo-700 dark:text-indigo-300 self-start">
                    Прив'язано до: {getHomeworkTitle(note.linkedHomeworkId)}
                </p>
            )}
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap flex-grow mb-4">{note.content}</p>
            <div className="flex justify-end gap-2 mt-auto border-t border-slate-200 dark:border-slate-700 pt-4">
              <Button variant="ghost" size-sm="true" onClick={() => openModal(note)}>Редагувати</Button>
              <Button variant="secondary" size-sm="true" onClick={() => handleDelete(note.id)}>Видалити</Button>
            </div>
          </div>
        )) : <p className="text-slate-500 text-center col-span-full py-8">У вас ще немає жодної нотатки.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{currentNote ? 'Редагувати нотатку' : 'Створити нотатку'}</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Заголовок" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800" required />
                  <textarea placeholder="Текст нотатки..." value={content} onChange={e => setContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 h-40" required></textarea>
                  <select value={linkedHomeworkId || ''} onChange={e => setLinkedHomeworkId(e.target.value || undefined)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800">
                    <option value="">Не прив'язувати до Д/З</option>
                    {homeworks.map(hw => <option key={hw.id} value={hw.id}>{hw.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={closeModal} disabled={loading}>Скасувати</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Збереження...' : 'Зберегти'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
