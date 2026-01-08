
import React, { useState } from 'react';
import { MONTHS } from '../constants';
import { getMonthDays, generatePlanForDay } from '../services/planService';
import { generateReflectionForDay } from '../services/geminiService';
import { CheckCircle2, ChevronRight, Loader2, Sparkles, X, Quote, Share2, Award, Trophy, Book, Target } from 'lucide-react';
import { DayPlan, Devotional, MonthDayMapping, PlanType } from '../types';
import Stats from './Stats';

const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDayPlan, setSelectedDayPlan] = useState<DayPlan | null>(null);
  const [reflection, setReflection] = useState<Devotional | null>(null);
  const [loadingReflection, setLoadingReflection] = useState(false);
  const [showAchievement, setShowAchievement] = useState<{ month: string, count: number } | null>(null);
  const [planType, setPlanType] = useState<PlanType>(() => {
    return (localStorage.getItem('planType') as PlanType) || 'linha-reta';
  });
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('completedDays') || '[]');
  });

  const totalDays = 365;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  const toggleDay = (day: number) => {
    const newCompleted = completedDays.includes(day) 
      ? completedDays.filter(d => d !== day)
      : [...completedDays, day];
    setCompletedDays(newCompleted);
    localStorage.setItem('completedDays', JSON.stringify(newCompleted));
  };

  const handleOpenDay = async (day: number) => {
    const plan = generatePlanForDay(day, planType);
    setSelectedDayPlan(plan);
    setReflection(null);
    setLoadingReflection(true);
    try {
      const data = await generateReflectionForDay(plan);
      setReflection(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingReflection(false);
    }
  };

  const changePlan = (type: PlanType) => {
    setPlanType(type);
    localStorage.setItem('planType', type);
  };

  const getMonthStats = (monthIdx: number) => {
    const days = getMonthDays(monthIdx);
    const completedInMonth = days.filter(d => completedDays.includes(d.globalDay)).length;
    const progress = Math.round((completedInMonth / days.length) * 100);
    return { progress, isComplete: progress === 100, completedCount: completedInMonth, totalCount: days.length };
  };

  const shareProgress = (title: string, text: string) => {
    if (navigator.share) {
      navigator.share({ title, text }).catch(() => {
        navigator.clipboard.writeText(text);
        alert('Copiado para a área de transferência!');
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copiado para a área de transferência!');
    }
  };

  const handleShareAnnual = () => {
    const text = `📖 Estou trilhando meu caminho pela Palavra! Completei ${completedDays.length} dias (${progressPercent}%) do meu plano anual na Bíblia 365. #Biblia365 #Devocional #Fé`;
    shareProgress('Meu Progresso Bíblico', text);
  };

  const handleShareMonth = (monthName: string) => {
    const text = `📖 Glória a Deus! Completei o plano de leitura de ${monthName} no app Bíblia 365! Junte-se a mim nessa jornada de fé. #Biblia365 #LeituraDiaria`;
    shareProgress('Conquista Mensal', text);
  };

  const handleShareReflection = () => {
    if (!reflection) return;
    const text = `✨ Reflexão do Dia - Bíblia 365\n\n"${reflection.verse}" (${reflection.reference})\n\n${reflection.reflection}\n\n#Biblia365 #DevocionalDiario`;
    shareProgress('Reflexão do Dia', text);
  };

  return (
    <div className="space-y-8">
      {/* Seletor de Plano */}
      <div className="flex p-1 bg-white dark:bg-slate-900 rounded-2xl border border-green-100 dark:border-slate-800 shadow-sm">
        <button
          onClick={() => changePlan('linha-reta')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            planType === 'linha-reta'
              ? 'bg-green-600 dark:bg-neonGreen text-white dark:text-black shadow-md'
              : 'text-slate-400 dark:text-slate-500 hover:text-green-600'
          }`}
        >
          <Target className="w-4 h-4" /> LINHA RETA
        </button>
        <button
          onClick={() => changePlan('completo')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            planType === 'completo'
              ? 'bg-green-600 dark:bg-neonOrange text-white dark:text-black shadow-md'
              : 'text-slate-400 dark:text-slate-500 hover:text-green-600'
          }`}
        >
          <Book className="w-4 h-4" /> PLANO COMPLETO
        </button>
      </div>

      {/* Resumo Geral */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-800 dark:from-neonOrange dark:to-orange-900 rounded-[32px] p-6 text-white shadow-xl dark:shadow-[0_0_20px_rgba(255,95,31,0.2)] relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleShareAnnual}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors backdrop-blur-sm"
            title="Compartilhar Progresso Geral"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex justify-between items-end mb-4 pr-12">
          <div>
            <span className="text-green-100 dark:text-white/80 text-[10px] font-black uppercase tracking-widest block mb-1">Status Anual</span>
            <h2 className="text-5xl font-black dark:neon-text-green leading-none">{progressPercent}%</h2>
          </div>
          <div className="text-right">
            <span className="text-green-200 dark:text-white/60 text-sm font-medium">{completedDays.length} / 365 d</span>
          </div>
        </div>
        <div className="h-4 w-full bg-green-900/40 dark:bg-black/40 rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full bg-white dark:bg-neonGreen transition-all duration-1000 ease-out shadow-[0_0_15px_#39FF14]" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Estatísticas Integradas */}
      <Stats />

      {/* Grid de Meses ou Dias */}
      <div className="space-y-4 pt-4 border-t border-green-100 dark:border-slate-800">
        {selectedMonth === null ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-green-900 dark:text-white uppercase tracking-tighter">Meses do Ano</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">2026</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MONTHS.map((month, idx) => {
                const stats = getMonthStats(idx);
                return (
                  <div
                    key={month}
                    className="bg-white dark:bg-slate-900 border border-green-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col hover:border-green-300 dark:hover:border-neonGreen transition-all group shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-green-900 dark:text-white text-lg">{month}</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                          {stats.completedCount} de {stats.totalCount} dias lidos
                        </span>
                      </div>
                      {stats.isComplete ? (
                        <Trophy className="w-6 h-6 text-amber-500 animate-bounce dark:text-neonGreen" />
                      ) : (
                        <div className="p-2 bg-green-50 dark:bg-slate-800 rounded-lg text-green-600 dark:text-neonOrange group-hover:scale-110 transition-transform">
                           <ChevronRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 h-2 bg-green-50 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${stats.isComplete ? 'bg-amber-500' : 'bg-green-500 dark:bg-neonGreen'}`} 
                          style={{ width: `${stats.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-slate-500 dark:text-slate-400">{stats.progress}%</span>
                    </div>

                    <div className="mt-auto pt-3 flex gap-2">
                      <button 
                        onClick={() => setSelectedMonth(idx)}
                        className="flex-1 py-3 rounded-xl bg-green-600 dark:bg-slate-800 text-xs font-black text-white dark:text-slate-300 hover:bg-green-700 dark:hover:bg-neonGreen dark:hover:text-black transition-all uppercase tracking-widest"
                      >
                        Abrir Mês
                      </button>
                      {stats.progress > 0 && (
                        <button 
                          onClick={() => handleShareMonth(month)}
                          className="p-3 rounded-xl bg-green-50 dark:bg-slate-800 text-green-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-neonGreen transition-colors"
                          title="Compartilhar Mês"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedMonth(null)}
                className="p-2 bg-white dark:bg-slate-900 border border-green-100 dark:border-slate-800 rounded-xl text-green-600 dark:text-neonOrange"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <div className="flex-1 flex justify-between items-center">
                <h3 className="text-2xl font-black text-green-900 dark:text-white uppercase tracking-tighter">{MONTHS[selectedMonth]}</h3>
                {getMonthStats(selectedMonth).isComplete && (
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-green-100 dark:bg-neonGreen/20 text-green-700 dark:text-neonGreen rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200 dark:border-neonGreen/40 shadow-sm">
                    <Award className="w-4 h-4" /> Mês Completo
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {getMonthDays(selectedMonth).map((mDay: MonthDayMapping) => (
                <button
                  key={mDay.globalDay}
                  onClick={() => handleOpenDay(mDay.globalDay)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all relative ${
                    completedDays.includes(mDay.globalDay)
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-neonGreen text-emerald-700 dark:text-neonGreen shadow-[0_0_15px_rgba(57,255,20,0.15)]'
                      : 'bg-white dark:bg-slate-900 border-green-50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-green-300 dark:hover:border-neonOrange shadow-sm'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase opacity-40 mb-0.5">D</span>
                  <span className="text-xl font-black">{mDay.monthDay}</span>
                  {completedDays.includes(mDay.globalDay) && (
                    <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-neonGreen" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedDayPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-lg shadow-2xl transition-all border border-green-50 dark:border-slate-800 my-auto">
            <div className="p-6 border-b border-green-50 dark:border-slate-800 flex justify-between items-center bg-green-50/50 dark:bg-slate-950/50">
              <div>
                <span className="text-[10px] font-black uppercase text-green-600 dark:text-neonOrange tracking-[0.2em]">Dia {selectedDayPlan.day} • {planType === 'linha-reta' ? 'Linha Reta' : 'Completo'}</span>
                <h4 className="text-2xl font-black text-green-900 dark:text-white">Leitura Sugerida</h4>
              </div>
              <button onClick={() => setSelectedDayPlan(null)} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors shadow-sm">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {planType === 'completo' ? (
                  <>
                    <div className="p-5 bg-green-50/50 dark:bg-slate-800/50 rounded-2xl border border-green-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-green-500 dark:text-neonGreen uppercase tracking-widest block mb-2">Antigo Testamento</span>
                      <p className="text-xl font-black text-green-900 dark:text-white">{selectedDayPlan.ot?.book} {selectedDayPlan.ot?.startChapter}-{selectedDayPlan.ot?.endChapter}</p>
                    </div>
                    <div className="p-5 bg-amber-50/30 dark:bg-slate-800/50 rounded-2xl border border-amber-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-amber-500 dark:text-neonOrange uppercase tracking-widest block mb-2">Sapienciais</span>
                      <p className="text-xl font-black text-amber-900 dark:text-white">{selectedDayPlan.sapiential?.book} {selectedDayPlan.sapiential?.startChapter}</p>
                    </div>
                    <div className="p-5 bg-emerald-50/50 dark:bg-slate-800/50 rounded-2xl border border-emerald-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-emerald-500 dark:text-neonGreen uppercase tracking-widest block mb-2">Novo Testamento</span>
                      <p className="text-xl font-black text-emerald-900 dark:text-white">{selectedDayPlan.nt?.book} {selectedDayPlan.nt?.startChapter}-{selectedDayPlan.nt?.endChapter}</p>
                    </div>
                  </>
                ) : (
                  selectedDayPlan.segments?.map((seg, idx) => (
                    <div key={idx} className="p-6 bg-green-50/50 dark:bg-slate-800/50 rounded-[24px] border-2 border-green-100 dark:border-neonGreen/20 shadow-sm">
                      <span className="text-[10px] font-bold text-green-500 dark:text-neonGreen uppercase tracking-[0.3em] block mb-2">Trecho Cronológico</span>
                      <p className="text-3xl font-black text-green-900 dark:text-white leading-tight">{seg.book} {seg.startChapter} {seg.startChapter !== seg.endChapter ? `a ${seg.endChapter}` : ''}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-6 border-t border-green-50 dark:border-slate-800">
                {loadingReflection ? (
                  <div className="flex flex-col items-center py-10">
                    <Loader2 className="w-8 h-8 text-green-500 dark:text-neonGreen animate-spin mb-3" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Carregando Reflexão do Dia</span>
                  </div>
                ) : reflection && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center px-1 mb-2">
                      <h5 className="font-black text-green-900 dark:text-white uppercase text-sm tracking-widest">A Mensagem</h5>
                      <button 
                        onClick={handleShareReflection}
                        className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-neonGreen hover:opacity-80 transition-opacity"
                        title="Compartilhar Reflexão"
                      >
                        <Share2 className="w-4 h-4" /> COMPARTILHAR
                      </button>
                    </div>
                    <div className="bg-green-600 dark:bg-slate-800 rounded-3xl p-6 text-white shadow-xl dark:border-l-8 dark:border-neonGreen">
                      <Quote className="w-8 h-8 text-green-300 dark:text-neonGreen opacity-50 mb-2" />
                      <p className="bible-text text-2xl italic font-semibold leading-tight mb-3">"{reflection.verse}"</p>
                      <p className="text-right text-sm font-black text-green-200 dark:text-neonOrange uppercase tracking-tighter">— {reflection.reference}</p>
                    </div>
                    <div className="px-1">
                      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{reflection.reflection}</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  toggleDay(selectedDayPlan.day);
                  setSelectedDayPlan(null);
                }}
                className={`w-full py-5 rounded-[24px] font-black text-xl transition-all shadow-lg ${
                  completedDays.includes(selectedDayPlan.day)
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                    : 'bg-green-600 dark:bg-neonGreen text-white dark:text-black hover:scale-[1.03] active:scale-95'
                }`}
              >
                {completedDays.includes(selectedDayPlan.day) ? 'REVER LEITURA' : 'CONCLUÍDO'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
