import React from 'react';

const ContactAdminPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Зв'язок з розробником</h1>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Виникли технічні проблеми або є пропозиції?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Якщо ви зіткнулися з помилкою в роботі щоденника або у вас є ідеї щодо покращення сервісу, будь ласка, напишіть розробнику.
        </p>
        <div className="space-y-4 mt-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <h3 className="font-semibold text-lg">Розробник</h3>
                <p className="text-slate-500 dark:text-slate-300">Email: <a href="mailto:daniil.3112.uvarov@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">daniil.3112.uvarov@gmail.com</a></p>
            </div>
        </div>
         <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
          Будь ласка, вказуйте у листі ваше ім'я та детально описуйте ваше питання для швидшого вирішення.
        </p>
      </div>
    </div>
  );
};

export default ContactAdminPage;