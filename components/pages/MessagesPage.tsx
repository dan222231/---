import React, { useState } from 'react';
import { Message, Role } from '../../types';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

interface MessagesPageProps {
    messages: Message[];
    addMessage: (message: Omit<Message, 'id' | 'authorId' | 'authorName' | 'date'>) => Promise<void>;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ messages, addMessage }) => {
    const { user } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && content) {
            setLoading(true);
            await addMessage({ title, content });
            setTitle('');
            setContent('');
            setIsAdding(false);
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Повідомлення та оголошення</h1>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                {user?.role === Role.Teacher && (
                    <div className="mb-6">
                        {!isAdding && <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">Створити оголошення</Button>}
                    </div>
                )}
                
                {isAdding && (
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg dark:border-slate-700">
                        <h3 className="text-lg font-semibold">Нове оголошення</h3>
                        <input type="text" placeholder="Заголовок" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800" required />
                        <textarea placeholder="Текст оголошення..." value={content} onChange={e => setContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 h-28" required></textarea>
                        <div className="flex gap-2 justify-end">
                            <Button type="button" variant="secondary" onClick={() => setIsAdding(false)} disabled={loading}>Скасувати</Button>
                            <Button type="submit" disabled={loading}>{loading ? 'Відправка...' : 'Відправити'}</Button>
                        </div>
                    </form>
                )}

                <div className="space-y-4">
                    {messages.length > 0 ? (
                        messages.map(msg => (
                            <div key={msg.id} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{msg.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap mt-1">{msg.content}</p>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-200 dark:border-slate-600">
                                    <span>Автор: <strong>{msg.authorName}</strong></span>
                                    <span className="mx-2">|</span>
                                    <span>{new Date(msg.date).toLocaleString('uk-UA')}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500 text-center py-8">Поки що немає жодних оголошень.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;