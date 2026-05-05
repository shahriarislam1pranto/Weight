import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, Book, Quote, Info, ExternalLink } from 'lucide-react';
import { searchHadiths } from '../services/geminiService';
import { Hadith } from '../types';

interface HadithSearchProps {
  language: 'en' | 'bn';
}

const HadithSearch: React.FC<HadithSearchProps> = ({ language }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setHasSearched(true);
    const hadiths = await searchHadiths(query, language);
    setResults(hadiths);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 lg:p-10 max-w-5xl mx-auto overflow-y-auto custom-scrollbar">
      <div className="mb-10 text-center">
        <h2 className="text-3xl lg:text-4xl text-white mb-2 font-serif italic tracking-tight">{t('hadithSearch')}</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">{t('searchBy')} {t('keywords').toLowerCase()}, {t('narrator').toLowerCase()}, {t('theme').toLowerCase()}</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-12">
        <div className="relative group max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchKeyword')}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 focus:border-emerald-accent transition-all text-white text-base"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-accent/40 group-focus-within:text-emerald-accent transition-colors" />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-emerald-accent text-dark-bg rounded-xl hover:bg-emerald-400 disabled:opacity-50 transition-all font-bold text-sm"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('hadithSearch')}
          </button>
        </div>
      </form>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 pb-10">
        <AnimatePresence mode="popLayout">
          {results.map((hadith, index) => (
            <motion.div
              key={hadith.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 p-8 hover:bg-white/10 transition-all relative overflow-hidden group border-b-4 border-b-emerald-accent/20"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-16 h-16 text-emerald-accent rotate-180" />
              </div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-accent/20 flex items-center justify-center shrink-0">
                  <Book className="w-5 h-5 text-emerald-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-emerald-accent leading-tight mb-1">
                    {hadith.source}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    {t('narrator')}: {hadith.narrator}
                  </p>
                </div>
              </div>

              <p className="font-serif italic text-white/80 leading-relaxed mb-6 text-base">
                "{hadith.text}"
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <span className="px-3 py-1 bg-white/5 text-emerald-accent text-[9px] font-bold uppercase tracking-wider rounded-lg border border-white/5">
                  {hadith.theme}
                </span>
                <button className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 hover:text-emerald-accent transition-colors uppercase tracking-widest">
                  Verified <Info className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasSearched && !isLoading && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed"
        >
          <Info className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/20 font-medium">{t('noHadithFound')}</p>
        </motion.div>
      )}
    </div>
  );
};

export default HadithSearch;
