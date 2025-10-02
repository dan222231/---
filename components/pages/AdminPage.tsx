import React, { useState } from 'react';
import { Homework, Subject } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface HomeworkManagementPageProps {
  subjects: Subject[];
  homeworks: Homework[];
  addHomework: (homework: Omit<Homework, 'id' | 'createdBy'>) => Promise<void>;
}

const HomeworkManagementPage: React.FC<HomeworkManagementPageProps> = ({ subjects, homeworks, addHomework }) => {
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId || !date || !title || !description) {
      alert('Будь ласка, заповніть усі поля.');
      return;
    }
    setLoading(true);
    await addHomework({ subjectId, date, title, description, attachments: [] });
    setSubjectId(subjects[0]?.id || '');
    setDate(new Date().toISOString().split('T')[0]);
    setTitle('');
    setDescription('');
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Керування домашніми завданнями</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Homework Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Додати нове завдання</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select id="subject" label="Предмет" value={subjectId} onChange={e => setSubjectId(e.target.value)} required>
                <option value="" disabled>Оберіть предмет</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </Select>
              <Input id="date" label="Дата виконання" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              <Input id="title" label="Тема/Заголовок" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Опис завдання</label>
                <textarea 
                  id="description" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-800 h-32" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Додавання...' : 'Додати завдання'}
              </Button>
            </form>
          </div>
        </div>

        {/* List of existing homework */}
        <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Список існуючих завдань</h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {homeworks.length > 0 ? (
                        [...homeworks]
                            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map(hw => (
                                <div key={hw.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{new Date(hw.date).toLocaleDateString('uk-UA')}</p>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{subjects.find(s => s.id === hw.subjectId)?.title}</h3>
                                    <p className="text-slate-700 dark:text-slate-200 font-medium">{hw.title}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-wrap">{hw.description}</p>
                                </div>
                            ))
                    ) : (
                        <p className="text-slate-500 text-center py-8">Ще немає жодного домашнього завдання.</p>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default HomeworkManagementPage;
