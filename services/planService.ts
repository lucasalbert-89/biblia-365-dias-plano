
import { OT_BOOKS, NT_BOOKS, SAP_BOOKS } from '../constants';
import { BibleBook, ReadingSegment, DayPlan, MonthDayMapping, PlanType } from '../types';

/**
 * Lógica do Plano Completo (3 partes: OT + NT + Sapiential)
 */
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
    book: startBook === endBook ? startBook : `${startBook} / ${endBook}`,
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

/**
 * Lógica do Plano Linha Reta (Cronológico)
 */
const getLinhaRetaSegments = (day: number): ReadingSegment[] => {
  const chronologicalOrder = [
    { name: 'Gênesis', chapters: 11 },
    { name: 'Jó', chapters: 42 },
    { name: 'Gênesis', offset: 11, chapters: 39 },
    { name: 'Êxodo', chapters: 40 },
    { name: 'Levítico', chapters: 27 },
    { name: 'Números', chapters: 36 },
    { name: 'Deuteronômio', chapters: 34 },
    { name: 'Josué', chapters: 24 },
    { name: 'Juízes', chapters: 21 },
    { name: 'Rute', chapters: 4 },
    { name: '1 Samuel', chapters: 31 },
    { name: '2 Samuel', chapters: 24 },
    { name: '1 Reis', chapters: 22 },
    { name: '2 Reis', chapters: 25 },
    { name: '1 Crônicas', chapters: 29 },
    { name: '2 Crônicas', chapters: 36 },
    { name: 'Esdras', chapters: 10 },
    { name: 'Neemias', chapters: 13 },
    { name: 'Ester', chapters: 10 },
    { name: 'Isaías', chapters: 66 },
    { name: 'Jeremias', chapters: 52 },
    { name: 'Lamentações', chapters: 5 },
    { name: 'Ezequiel', chapters: 48 },
    { name: 'Daniel', chapters: 12 },
    { name: 'Oséias', chapters: 14 },
    { name: 'Joel', chapters: 3 },
    { name: 'Amós', chapters: 9 },
    { name: 'Obadias', chapters: 1 },
    { name: 'Jonas', chapters: 4 },
    { name: 'Miquéias', chapters: 7 },
    { name: 'Naum', chapters: 3 },
    { name: 'Habacuque', chapters: 3 },
    { name: 'Sofonias', chapters: 3 },
    { name: 'Ageu', chapters: 2 },
    { name: 'Zacarias', chapters: 14 },
    { name: 'Malaquias', chapters: 4 },
    ...NT_BOOKS.map(b => ({ name: b.name, chapters: b.chapters }))
  ];

  const totalChapters = chronologicalOrder.reduce((acc, b) => acc + b.chapters, 0);
  const chaptersPerDay = totalChapters / 365;
  const startGlobal = Math.floor((day - 1) * chaptersPerDay);
  const endGlobal = Math.max(startGlobal, Math.floor(day * chaptersPerDay) - 1);

  let current = 0;
  let results: ReadingSegment[] = [];

  for (const book of chronologicalOrder) {
    const bookStart = current;
    const bookEnd = current + book.chapters - 1;

    if (!(endGlobal < bookStart || startGlobal > bookEnd)) {
      const s = Math.max(startGlobal, bookStart);
      const e = Math.min(endGlobal, bookEnd);
      
      const realOffset = (book as any).offset || 0;
      results.push({
        book: book.name,
        startChapter: (s - bookStart) + 1 + realOffset,
        endChapter: (e - bookStart) + 1 + realOffset
      });
    }
    current += book.chapters;
  }

  return results.length > 0 ? results : [{ book: 'Salmos', startChapter: 1, endChapter: 1 }];
};

export const generatePlanForDay = (day: number, type: PlanType = 'completo'): DayPlan => {
  if (type === 'completo') {
    return {
      day,
      ot: getReadingForDayCompleto(OT_BOOKS, day),
      sapiential: getSapientialForDay(day),
      nt: getReadingForDayCompleto(NT_BOOKS, day)
    };
  }
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
