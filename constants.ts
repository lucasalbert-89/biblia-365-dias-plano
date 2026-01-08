
import { BibleBook } from './types';

export const OT_BOOKS: BibleBook[] = [
  { id: 'gn', name: 'Gênesis', chapters: 50, testament: 'Antigo' },
  { id: 'ex', name: 'Êxodo', chapters: 40, testament: 'Antigo' },
  { id: 'lv', name: 'Levítico', chapters: 27, testament: 'Antigo' },
  { id: 'nm', name: 'Números', chapters: 36, testament: 'Antigo' },
  { id: 'dt', name: 'Deuteronômio', chapters: 34, testament: 'Antigo' },
  { id: 'js', name: 'Josué', chapters: 24, testament: 'Antigo' },
  { id: 'jz', name: 'Juízes', chapters: 21, testament: 'Antigo' },
  { id: 'rt', name: 'Rute', chapters: 4, testament: 'Antigo' },
  { id: '1sm', name: '1 Samuel', chapters: 31, testament: 'Antigo' },
  { id: '2sm', name: '2 Samuel', chapters: 24, testament: 'Antigo' },
  { id: '1rs', name: '1 Reis', chapters: 22, testament: 'Antigo' },
  { id: '2rs', name: '2 Reis', chapters: 25, testament: 'Antigo' },
  { id: '1cr', name: '1 Crônicas', chapters: 29, testament: 'Antigo' },
  { id: '2cr', name: '2 Crônicas', chapters: 36, testament: 'Antigo' },
  { id: 'ed', name: 'Esdras', chapters: 10, testament: 'Antigo' },
  { id: 'ne', name: 'Neemias', chapters: 13, testament: 'Antigo' },
  { id: 'et', name: 'Ester', chapters: 10, testament: 'Antigo' },
  { id: 'jo', name: 'Jó', chapters: 42, testament: 'Antigo' },
  { id: 'is', name: 'Isaías', chapters: 66, testament: 'Antigo' },
  { id: 'jr', name: 'Jeremias', chapters: 52, testament: 'Antigo' },
  { id: 'lm', name: 'Lamentações', chapters: 5, testament: 'Antigo' },
  { id: 'ez', name: 'Ezequiel', chapters: 48, testament: 'Antigo' },
  { id: 'dn', name: 'Daniel', chapters: 12, testament: 'Antigo' },
  { id: 'os', name: 'Oséias', chapters: 14, testament: 'Antigo' },
  { id: 'jl', name: 'Joel', chapters: 3, testament: 'Antigo' },
  { id: 'am', name: 'Amós', chapters: 9, testament: 'Antigo' },
  { id: 'ob', name: 'Obadias', chapters: 1, testament: 'Antigo' },
  { id: 'jn', name: 'Jonas', chapters: 4, testament: 'Antigo' },
  { id: 'mq', name: 'Miquéias', chapters: 7, testament: 'Antigo' },
  { id: 'na', name: 'Naum', chapters: 3, testament: 'Antigo' },
  { id: 'hc', name: 'Habacuque', chapters: 3, testament: 'Antigo' },
  { id: 'sf', name: 'Sofonias', chapters: 3, testament: 'Antigo' },
  { id: 'ag', name: 'Ageu', chapters: 2, testament: 'Antigo' },
  { id: 'zc', name: 'Zacarias', chapters: 14, testament: 'Antigo' },
  { id: 'ml', name: 'Malaquias', chapters: 4, testament: 'Antigo' }
];

export const SAP_BOOKS: BibleBook[] = [
  { id: 'sl', name: 'Salmos', chapters: 150, testament: 'Sapiencial' },
  { id: 'pv', name: 'Provérbios', chapters: 31, testament: 'Sapiencial' }
];

export const NT_BOOKS: BibleBook[] = [
  { id: 'mt', name: 'Mateus', chapters: 28, testament: 'Novo' },
  { id: 'mc', name: 'Marcos', chapters: 16, testament: 'Novo' },
  { id: 'lc', name: 'Lucas', chapters: 24, testament: 'Novo' },
  { id: 'jo', name: 'João', chapters: 21, testament: 'Novo' },
  { id: 'at', name: 'Atos', chapters: 28, testament: 'Novo' },
  { id: 'rm', name: 'Romanos', chapters: 16, testament: 'Novo' },
  { id: '1co', name: '1 Coríntios', chapters: 16, testament: 'Novo' },
  { id: '2co', name: '2 Coríntios', chapters: 13, testament: 'Novo' },
  { id: 'gl', name: 'Gálatas', chapters: 6, testament: 'Novo' },
  { id: 'ef', name: 'Efésios', chapters: 6, testament: 'Novo' },
  { id: 'fp', name: 'Filipenses', chapters: 4, testament: 'Novo' },
  { id: 'cl', name: 'Colossenses', chapters: 4, testament: 'Novo' },
  { id: '1ts', name: '1 Tessalonicenses', chapters: 5, testament: 'Novo' },
  { id: '2ts', name: '2 Tessalonicenses', chapters: 3, testament: 'Novo' },
  { id: '1tm', name: '1 Timóteo', chapters: 6, testament: 'Novo' },
  { id: '2tm', name: '2 Timóteo', chapters: 4, testament: 'Novo' },
  { id: 'tt', name: 'Tito', chapters: 3, testament: 'Novo' },
  { id: 'fm', name: 'Filemom', chapters: 1, testament: 'Novo' },
  { id: 'hb', name: 'Hebreus', chapters: 13, testament: 'Novo' },
  { id: 'tg', name: 'Tiago', chapters: 5, testament: 'Novo' },
  { id: '1pe', name: '1 Pedro', chapters: 5, testament: 'Novo' },
  { id: '2pe', name: '2 Pedro', chapters: 3, testament: 'Novo' },
  { id: '1jo', name: '1 João', chapters: 5, testament: 'Novo' },
  { id: '2jo', name: '2 João', chapters: 1, testament: 'Novo' },
  { id: '3jo', name: '3 João', chapters: 1, testament: 'Novo' },
  { id: 'jd', name: 'Judas', chapters: 1, testament: 'Novo' },
  { id: 'ap', name: 'Apocalipse', chapters: 22, testament: 'Novo' }
];

export const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Added consolidated BIBLE_BOOKS list for use in components
export const BIBLE_BOOKS: BibleBook[] = [...OT_BOOKS, ...SAP_BOOKS, ...NT_BOOKS];
