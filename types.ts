
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
  // Para o plano completo (3 partes)
  ot?: ReadingSegment;
  sapiential?: ReadingSegment;
  nt?: ReadingSegment;
  // Para o plano em linha reta (pode ter 1 ou mais segmentos sequenciais)
  segments?: ReadingSegment[];
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
