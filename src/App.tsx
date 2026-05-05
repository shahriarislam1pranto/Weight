/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Search, BookOpen, Settings, Menu, X, Languages, Sun, Moon, Info, Quote } from 'lucide-react';
import ChatArea from './components/ChatArea';
import HadithSearch from './components/HadithSearch';
import Sidebar from './components/Sidebar';

type View = 'chat' | 'hadith' | 'reflection';

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState<View>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    // Check local storage for language preference on mount
    const savedLang = localStorage.getItem('deenbot_lang') as 'en' | 'bn';
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('deenbot_lang', language);
  }, [language]);

  return (
    <div className="flex h-screen bg-dark-bg text-slate-100 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view as View);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-16 flex items-center justify-between px-4 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5 text-emerald-accent" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-accent rounded-lg flex items-center justify-center shadow-lg shadow-emerald-accent/20">
                <span className="text-lg font-bold text-dark-bg">ن</span>
              </div>
              <h1 className="text-xl font-semibold tracking-tight italic">
                DeenBot <span className="text-emerald-accent not-italic">AI</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all font-medium text-xs"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {currentView === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <ChatArea language={language} />
              </motion.div>
            )}
            {currentView === 'hadith' && (
              <motion.div
                key="hadith"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <HadithSearch language={language} />
              </motion.div>
            )}
            {currentView === 'reflection' && (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <div className="p-8 max-w-2xl mx-auto text-center h-full flex flex-col justify-center">
                  <BookOpen className="w-16 h-16 text-emerald-accent mx-auto mb-6 opacity-30" />
                  <h2 className="text-4xl font-serif text-white mb-4 italic">{t('reflectionTitle')}</h2>
                  <p className="text-slate-400 mb-8 max-w-sm mx-auto">{t('welcome')}</p>
                  <div className="p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Quote className="w-12 h-12 text-emerald-accent rotate-180" />
                    </div>
                    <p className="font-serif italic text-2xl mb-4 text-emerald-accent/80 leading-relaxed">{t('reflectionQuote')}</p>
                    <p className="text-xs uppercase tracking-widest text-emerald-accent font-bold">{t('reflectionSource')}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

