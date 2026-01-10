
export type PlanType = 'completo' | 'linha-reta';

export interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  testament: 'Antigo' | 'Novo' | 'Sapiencial';
}

export interface ReadingSegment {
  book: string;
  startChapter: number;
  endChapter: number;
}

export interface DayPlan {
  day: number;
  // Para o plano completo (suporta os 3 campos como string ou objeto)
  ot?: ReadingSegment | string;
  sapiential?: ReadingSegment | string;
  nt?: ReadingSegment | string;
  // Para o plano em linha reta
  segments?: (ReadingSegment | string)[];
}

export interface MonthDayMapping {
  monthDay: number;
  globalDay: number;
}

export interface UserProgress {
  completedDays: number[];
  currentDay: number;
}

export interface Devotional {
  verse: string;
  reference: string;
  reflection: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
