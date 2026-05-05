export type Language = 'en' | 'bn';

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Hadith {
  id: string;
  text: string;
  source: string;
  narrator: string;
  theme: string;
  language: Language;
}

export interface Reflection {
  text: string;
  source: string;
  language: Language;
}
