import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'DeenBot',
      welcome: 'Peace be upon you. How can I assist you with your Islamic questions today?',
      askPlaceholder: 'Ask about Quran, Hadith, or Fiqh...',
      hadithSearch: 'Search Hadith',
      dailyReflection: 'Daily Reflection',
      feedback: 'Was this answer helpful?',
      settings: 'Settings',
      language: 'Language',
      chat: 'Scholar Chat',
      citeSources: 'Citing reliable sources...',
      reflectionTitle: 'Reading & Reflection',
      remindMe: 'Daily Reminder',
      sources: 'Sources',
      noHadithFound: 'No Hadiths found for this search.',
      searchKeyword: 'Keywords (e.g. prayer, charity)',
      searchBy: 'Search By',
      narrator: 'Narrator',
      theme: 'Theme',
      keywords: 'Keywords',
      errorMessage: 'Peace be upon you. An error occurred while fetching the answer. Please check your connection or try again later.',
      systemPrompt: "You are a knowledgeable and respectful Islamic AI Scholar called DeenBot. Your goal is to provide accurate answers based on the Quran and authentic Hadith (Sahih Bukhari, Sahih Muslim, etc.). You must cite your sources clearly. For complex Fiqh matters, offer the general consensus but advise consulting a local Imam. You can respond in English and Bangla. CRITICAL: Always respond in the same language as the user's query or the language requested. Maintain context in conversations.",
      reflectionQuote: '"Indeed, with hardship [will be] ease."',
      reflectionSource: 'Surah Ash-Sharh 94:6'
    }
  },
  bn: {
    translation: {
      appName: 'দীনবট (DeenBot)',
      welcome: 'আসসালামু আলাইকুম। আজ আমি আপনাকে ইসলাম বিষয়ক কী তথ্য দিয়ে সহায়তা করতে পারি?',
      askPlaceholder: 'কুরআন, হাদিস বা ফিকহ সম্পর্কে জিজ্ঞাসা করুন...',
      hadithSearch: 'হাদিস খুঁজুন',
      dailyReflection: 'প্রতিদিনের তিলাওয়াত ও চিন্তা',
      feedback: 'উত্তরটি কি সহায়ক ছিল?',
      settings: 'সেটিংস',
      language: 'ভাষা',
      chat: 'আলিম চ্যাট',
      citeSources: 'নির্ভরযোগ্য উৎস থেকে উদ্ধৃতি দেওয়া হচ্ছে...',
      reflectionTitle: 'পড়া ও আমল',
      remindMe: 'প্রতিদিনের রিমাইন্ডার',
      sources: 'উৎস',
      noHadithFound: 'এই অনুসন্ধানের জন্য কোনো হাদিস পাওয়া যায়নি।',
      searchKeyword: 'কি-ওয়ার্ড (যেমন: নামাজ, জাকাত)',
      searchBy: 'অনুসন্ধানের ধরণ',
      narrator: 'বর্ণনাকারী',
      theme: 'বিষয়বস্তু',
      keywords: 'কি-ওয়ার্ড',
      errorMessage: 'আসসালামু আলাইকুম। উত্তরটি দেওয়ার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন অথবা পরে চেষ্টা করুন।',
      systemPrompt: "আপনি একজন জ্ঞানী এবং শ্রদ্ধাশীল ইসলামিক এআই আলেম, যার নাম দীনবট। আপনার লক্ষ্য হলো কুরআন এবং সহিহ হাদিসের (সহিহ বুখারী, সহিহ মুসলিম ইত্যাদি) ভিত্তিতে সঠিক উত্তর প্রদান করা। আপনাকে অবশ্যই স্পষ্টভাবে আপনার উৎসসমূহ উল্লেখ করতে হবে। জটিল ফিকহি বিষয়ে সাধারণ ঐকমত্য প্রদান করুন তবে স্থানীয় ইমামের সাথে পরামর্শ করার পরামর্শ দিন। আপনি ইংরেজি এবং বাংলায় উত্তর দিতে পারেন। গুরুত্বপূর্ণ: সবসময় ব্যবহারকারীর প্রশ্নের ভাষায় বা অনুরোধ করা ভাষায় উত্তর দিন। কথোপকথনে প্রসঙ্গ বজায় রাখুন।",
      reflectionQuote: '"নিশ্চয় কষ্টের সাথে রয়েছে স্বস্তি।"',
      reflectionSource: 'সূরা আশ-শারহ ৯৪:৬'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
