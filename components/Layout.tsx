
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  onToggleTheme: () => void;
}

const BurningBushIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Base do Arbusto / Ramos */}
    <path d="M12 21v-4m0 0c-1.5-1-3-0.5-4-1.5s-1-3 0-4.5" />
    <path d="M12 17c1.5-1 3-0.5 4-1.5s1-3 0-4.5" />
    <path d="M12 18.5c-2.5-1-4.5-3.5-4.5-6.5" />
    <path d="M12 18.5c2.5-1 4.5-3.5 4.5-6.5" />
    
    {/* Traços de Chama/Fogo Minimalistas */}
    <path d="M8 9c0-3 2-5 4-5s4 2 4 5" />
    <path d="M10 7.5c.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5" />
    <path d="M6 12c-1-2 0-5 2-6" />
    <path d="M18 12c1-2 0-5-2-6" />
    <path d="M12 11c0-2 1-3.5 2-4" />
    <path d="M12 11c0-2-1-3.5-2-4" />
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children, darkMode, onToggleTheme }) => {
  return (
    <div className="flex flex-col h-screen bg-green-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <header className="bg-white dark:bg-slate-900 border-b border-green-100 dark:border-slate-800 px-4 py-3 flex justify-between items-center shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 dark:bg-neonOrange p-1.5 rounded-lg shadow-sm dark:shadow-[0_0_15px_rgba(255,95,31,0.4)]">
            <BurningBushIcon className="text-white dark:text-black w-6 h-6" />
          </div>
          <div className="flex flex-col leading-none">
            <h1 className="text-2xl font-bold font-condensed text-green-900 dark:text-white uppercase tracking-tighter">
              BÍBLIA <span className="text-green-600 dark:text-neonGreen">365</span>
            </h1>
            <span className="text-[9px] sm:text-[10px] font-condensed font-bold text-green-700/60 dark:text-white/40 uppercase tracking-[0.15em] whitespace-nowrap">
              Plano de Leitura Diária
            </span>
          </div>
        </div>
        <button 
          onClick={onToggleTheme}
          className="p-2 text-green-600 dark:text-neonGreen hover:bg-green-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-2xl mx-auto w-full px-4 py-6 pb-20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
