
import { OT_BOOKS, NT_BOOKS, SAP_BOOKS } from '../constants';
import { BibleBook, ReadingSegment, DayPlan, MonthDayMapping, PlanType } from '../types';

// Lógica do Plano Completo (OT + NT + Sapiential)
const getReadingForDayCompleto = (books: BibleBook[], targetDay: number, totalDays: number = 365): ReadingSegment => {
  const totalChapters = books.reduce((acc, b) => acc + b.chapters, 0);
  const chaptersPerDay = totalChapters / totalDays;
  const startChapterGlobal = Math.floor((targetDay - 1) * chaptersPerDay);
  const endChapterGlobal = Math.max(startChapterGlobal, Math.floor(targetDay * chaptersPerDay) - 1);

  let currentGlobal = 0;
  let startBook = "";
  let startChap = 1;
  let endBook = "";
  let endChap = 1;

  for (const book of books) {
    const bookStart = currentGlobal;
    const bookEnd = currentGlobal + book.chapters - 1;
    if (startChapterGlobal >= bookStart && startChapterGlobal <= bookEnd) {
      startBook = book.name;
      startChap = (startChapterGlobal - bookStart) + 1;
    }
    if (endChapterGlobal >= bookStart && endChapterGlobal <= bookEnd) {
      endBook = book.name;
      endChap = (endChapterGlobal - bookStart) + 1;
    }
    currentGlobal += book.chapters;
  }
  if (!endBook) {
    const last = books[books.length - 1];
    endBook = last.name;
    endChap = last.chapters;
  }
  return {
    book: startBook === endBook ? startBook : `${startBook} - ${endBook}`,
    startChapter: startChap,
    endChapter: endChap
  };
};

const getSapientialForDay = (targetDay: number): ReadingSegment => {
  const books = SAP_BOOKS;
  const totalChapters = books.reduce((acc, b) => acc + b.chapters, 0);
  const currentChapterIndex = (targetDay - 1) % totalChapters;
  let currentGlobal = 0;
  for (const book of books) {
    const bookEnd = currentGlobal + book.chapters - 1;
    if (currentChapterIndex >= currentGlobal && currentChapterIndex <= bookEnd) {
      return {
        book: book.name,
        startChapter: (currentChapterIndex - currentGlobal) + 1,
        endChapter: (currentChapterIndex - currentGlobal) + 1
      };
    }
    currentGlobal += book.chapters;
  }
  return { book: "Salmos", startChapter: 1, endChapter: 1 };
};

// Mapeamento simplificado do Plano em Linha Reta (Baseado na Imagem)
// Para fins de demonstração robusta, implementamos o fluxo sequencial que a imagem sugere
export const generatePlanForDay = (day: number, type: PlanType = 'completo'): DayPlan => {
  if (type === 'completo') {
    return {
      day,
      ot: getReadingForDayCompleto(OT_BOOKS, day),
      sapiential: getSapientialForDay(day),
      nt: getReadingForDayCompleto(NT_BOOKS, day)
    };
  }

  // Lógica "Linha Reta" (Ordem Cronológica aproximada da imagem)
  // Janeiros: Gen 1-11, Jó 1-42, Gen 12-50...
  // Implementação de fluxo para o Plano em Linha Reta:
  const getLinhaRetaSegments = (d: number): ReadingSegment[] => {
    // Exemplo de mapeamento para Janeiro (Dias 1-31)
    if (d <= 4) return [{ book: 'Gênesis', startChapter: (d-1)*3+1, endChapter: d*3 }];
    if (d >= 5 && d <= 16) {
      const jobDay = d - 4;
      return [{ book: 'Jó', startChapter: (jobDay-1)*4+1, endChapter: jobDay*4 }];
    }
    if (d >= 17 && d <= 31) {
      const genDay = d - 16;
      return [{ book: 'Gênesis', startChapter: 11 + (genDay-1)*3, endChapter: 11 + genDay*3 }];
    }
    // Para os demais dias, seguimos uma lógica sequencial simplificada para cobrir o ano
    // Na prática, em uma versão final, este objeto teria o mapeamento exato de todos os 365 dias
    return [{ book: d < 180 ? 'Antigo Testamento' : 'Novo Testamento', startChapter: d % 30 + 1, endChapter: d % 30 + 3 }];
  };

  return {
    day,
    segments: getLinhaRetaSegments(day)
  };
};

export const getMonthDays = (monthIndex: number): MonthDayMapping[] => {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const offset = daysInMonths.slice(0, monthIndex).reduce((acc, d) => acc + d, 0);
  return Array.from({ length: daysInMonths[monthIndex] }, (_, i) => ({
    monthDay: i + 1,
    globalDay: offset + i + 1
  }));
};
