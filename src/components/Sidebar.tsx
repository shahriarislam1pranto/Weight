import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MessageSquare, Search, BookOpen, Clock, Heart, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, onViewChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'chat', label: t('chat'), icon: MessageSquare },
    { id: 'hadith', label: t('hadithSearch'), icon: Search },
    { id: 'reflection', label: t('dailyReflection'), icon: BookOpen },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/5 backdrop-blur-md border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-10 lg:hidden text-white">
          <span className="text-xl font-semibold italic">DeenBot <span className="text-emerald-accent not-italic">AI</span></span>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-emerald-accent" />
          </button>
        </div>

        <nav className="space-y-2 mb-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                currentView === item.id
                  ? 'bg-emerald-accent text-dark-bg shadow-lg shadow-emerald-accent/20 font-bold'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'stroke-[2.5px]' : ''}`} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-widest text-emerald-accent font-bold">{t('dailyReflection')}</h3>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2 group transition-all hover:bg-white/10">
              <p className="text-xs italic leading-relaxed text-white/80">
                {t('reflectionQuote')}
              </p>
              <p className="text-[10px] text-emerald-accent font-medium">{t('reflectionSource')}</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="bg-amber-accent/10 p-3 rounded-xl border border-amber-accent/20">
              <p className="text-[10px] text-amber-accent font-bold uppercase mb-1">Status</p>
              <p className="text-[11px] text-white/40">Multi-lingual AI Active</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
