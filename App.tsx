
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { Info, X } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [showUpdateNotice, setShowUpdateNotice] = useState(false);

  useEffect(() => {
    // Lógica do Tema
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Lógica do Aviso de Atualização
    const hasSeenUpdate = localStorage.getItem('hasSeenCompletePlanUpdate_v1');
    if (!hasSeenUpdate) {
      setShowUpdateNotice(true);
    }
  }, [darkMode]);

  const closeNotice = () => {
    setShowUpdateNotice(false);
    localStorage.setItem('hasSeenCompletePlanUpdate_v1', 'true');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Layout 
      darkMode={darkMode} 
      onToggleTheme={toggleDarkMode}
    >
      <Dashboard />

      {/* Modal de Aviso de Atualização */}
      {showUpdateNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border-2 border-green-100 dark:border-neonGreen/30 rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-neonGreen/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-neonGreen">
                <Info className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-black text-green-900 dark:text-white mb-2 uppercase tracking-tighter">
                Plano Atualizado!
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Atualizamos o <strong>Plano de Leitura Completo</strong> para seguir rigorosamente a nova sequência de 365 dias. 
                <br /><br />
                Pedimos desculpas caso essa mudança tenha afetado sua marcação de progresso anterior. Nosso objetivo é garantir a melhor experiência espiritual para você.
              </p>

              <button
                onClick={closeNotice}
                className="w-full py-4 bg-green-600 dark:bg-neonGreen text-white dark:text-black font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-green-200 dark:shadow-neonGreen/20"
              >
                ENTENDIDO
              </button>
            </div>
            
            <button 
              onClick={closeNotice}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
