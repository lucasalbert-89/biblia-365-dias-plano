
import React from 'react';
import { Book, CheckCircle2, Clock } from 'lucide-react';

const Stats: React.FC = () => {
  const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
  const totalRead = completedDays.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card: Total Lido */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-green-50 dark:border-slate-800 flex items-center gap-4">
          <div className="bg-green-100 dark:bg-neonGreen/10 p-3 rounded-xl text-green-600 dark:text-neonGreen">
            <Book className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Lido</span>
            <p className="text-2xl font-bold text-green-900 dark:text-white">{totalRead} dias</p>
          </div>
        </div>

        {/* Card: Progresso */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-green-50 dark:border-slate-800 flex items-center gap-4">
          <div className="bg-emerald-100 dark:bg-neonOrange/10 p-3 rounded-xl text-emerald-600 dark:text-neonOrange">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Progresso</span>
            <p className="text-2xl font-bold text-green-900 dark:text-white">
              {Math.round((totalRead / 365) * 100)}%
            </p>
          </div>
        </div>

        {/* Card: Meta Anual */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-green-50 dark:border-slate-800 flex items-center gap-4">
          <div className="bg-amber-100 dark:bg-slate-800 p-3 rounded-xl text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Meta Anual</span>
            <p className="text-2xl font-bold text-green-900 dark:text-white">365 Dias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
