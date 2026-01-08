
import React, { useState, useEffect } from 'react';
import { BIBLE_BOOKS } from '../constants';
import { ChevronRight, ChevronLeft, Info, Loader2, Sparkles } from 'lucide-react';
import { explainChapter } from '../services/geminiService';

const Reader: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS[0]);
  const [chapter, setChapter] = useState(1);
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Mock content generation logic (In a real app, this would come from an API)
  const getMockVerses = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      number: i + 1,
      text: `Este é o texto do versículo ${i + 1} de ${selectedBook.name} capítulo ${chapter}. Que a sabedoria divina ilumine o seu dia através destas palavras.`
    }));
  };

  const handleFetchInsight = async () => {
    setLoadingInsight(true);
    try {
      const text = await explainChapter(selectedBook.name, chapter);
      setInsight(text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInsight(false);
    }
  };

  useEffect(() => {
    setInsight(null);
  }, [selectedBook, chapter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
        {BIBLE_BOOKS.map(book => (
          <button
            key={book.id}
            onClick={() => { setSelectedBook(book); setChapter(1); }}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              selectedBook.id === book.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {book.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              disabled={chapter === 1}
              onClick={() => setChapter(prev => Math.max(1, prev - 1))}
              className="p-1 hover:bg-slate-200 rounded-full disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-700">Capítulo {chapter}</span>
            <button 
              disabled={chapter === selectedBook.chapters}
              onClick={() => setChapter(prev => Math.min(selectedBook.chapters, prev + 1))}
              className="p-1 hover:bg-slate-200 rounded-full disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleFetchInsight}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            <Info className="w-4 h-4" />
            Explicar Capítulo
          </button>
        </div>

        <div className="p-8 space-y-4">
          {getMockVerses().map(verse => (
            <div key={verse.number} className="flex gap-4 group">
              <span className="text-indigo-400 font-bold text-xs pt-1 select-none">{verse.number}</span>
              <p className="bible-text text-lg text-slate-800 leading-relaxed group-hover:text-black">
                {verse.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {loadingInsight && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      )}

      {insight && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-indigo-900">Visão do Assistente</h4>
          </div>
          <div className="text-indigo-800 leading-relaxed space-y-3 prose-sm">
            {insight.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <button 
            onClick={() => setInsight(null)}
            className="mt-4 text-xs font-medium text-indigo-500 hover:text-indigo-700"
          >
            Fechar explicação
          </button>
        </div>
      )}
    </div>
  );
};

export default Reader;
