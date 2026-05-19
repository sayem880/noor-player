/**
 * Noor Player - Quran Audio Player
 * Clean version with HQ/LQ support, offline save, and smart playback
 */

// ==============================================
// LANGUAGE TRANSLATIONS
// ==============================================
const TRANSLATIONS = {
    en: {
        siteTitle: "📖 Noor Player",
        siteSubtitle: "Mishary Rashid Alafasy | Bengali Translation Audio",
        qualityLabel: "🎵 Audio Quality",
        lowQuality: "📱 Low Quality (Mobile/Car)",
        highQuality: "💎 High Quality (Best Audio)",
        qualityNoteHigh: "High Quality - Best for home/WiFi",
        qualityNoteLow: "Low Quality - Saves data, good for mobile",
        surahLabel: "Select Surah",
        meccan: "Meccan",
        medinan: "Medinan",
        verses: "Verses",
        ready: "✅ Ready. Select a surah and press play.",
        loading: "Loading",
        loaded: "loaded",
        playing: "Playing",
        paused: "Paused",
        error: "❌ Audio failed to play. Check network.",
        completed: "✅ Recitation completed",
        lastSurah: "📖 This is the last surah",
        firstSurah: "📖 This is the first surah",
        qualityChanged: "Quality changed to",
        backgroundPlay: "🎧 Playing in background",
        repeatOff: "Off",
        repeatOne: "Repeat One",
        repeatAll: "Repeat All",
        footer1: "🎙️ Recitation: Mishary Rashid Alafasy | 📖 Bengali Audio Translation",
        footer2: "📱 Allow background playback on Android for best experience",
        repeatModeChanged: "Repeat mode changed to",
        savedOffline: "✅ Saved offline",
        deletedOffline: "🗑️ Deleted from offline storage",
        saveFailed: "❌ Failed to save. Storage may be full.",
        deleteConfirm: "Delete {quality} version of \"{surah}\"?",
        deleteWarning: "This file is saved offline. You will need internet to stream it again.",
        skipForward: "Forward 15 seconds",
        skipBack: "Back 15 seconds",
        hqSaved: "HQ Saved",
        lqSaved: "LQ Saved"
    },
    bn: {
        siteTitle: "📖 নূর প্লেয়ার",
        siteSubtitle: "মিশারি রশিদ আল-আফাসী | বাংলা অনুবাদ অডিও",
        qualityLabel: "🎵 অডিও কোয়ালিটি",
        lowQuality: "📱 লো কোয়ালিটি (মোবাইল/কার)",
        highQuality: "💎 হাই কোয়ালিটি (সেরা অডিও)",
        qualityNoteHigh: "হাই কোয়ালিটি - বাড়ি/WiFi এর জন্য সেরা",
        qualityNoteLow: "লো কোয়ালিটি - ডেটা সাশ্রয় করে, মোবাইলের জন্য ভালো",
        surahLabel: "সূরা নির্বাচন করুন",
        meccan: "মক্কী",
        medinan: "মাদানী",
        verses: "আয়াত",
        ready: "✅ প্রস্তুত। একটি সূরা নির্বাচন করে প্লে করুন",
        loading: "লোড হচ্ছে",
        loaded: "লোড সম্পূর্ণ",
        playing: "চলছে",
        paused: "থামানো হয়েছে",
        error: "❌ অডিও চালানো যায়নি। নেটওয়ার্ক চেক করুন।",
        completed: "✅ তিলাওয়াত সম্পূর্ণ হয়েছে",
        lastSurah: "📖 এটি শেষ সূরা",
        firstSurah: "📖 এটি প্রথম সূরা",
        qualityChanged: "কোয়ালিটি পরিবর্তন",
        backgroundPlay: "🎧 ব্যাকগ্রাউন্ডে চলছে",
        repeatOff: "বন্ধ",
        repeatOne: "একটি পুনরাবৃত্তি",
        repeatAll: "সব পুনরাবৃত্তি",
        footer1: "🎙️ তিলাওয়াত: মিশারি রশিদ আল-আফাসী | 📖 বাংলা অনুবাদ অডিও",
        footer2: "📱 Android-এ ব্যাকগ্রাউন্ডে চালানোর জন্য ব্রাউজার অনুমতি দিন",
        repeatModeChanged: "পুনরাবৃত্তি মোড পরিবর্তন করা হয়েছে",
        savedOffline: "✅ অফলাইনে সংরক্ষিত",
        deletedOffline: "🗑️ অফলাইন স্টোরেজ থেকে মুছে ফেলা হয়েছে",
        saveFailed: "❌ সংরক্ষণ ব্যর্থ হয়েছে। স্টোরেজ পূর্ণ হতে পারে।",
        deleteConfirm: "{quality} ভার্সন ডিলিট করুন \"{surah}\"?",
        deleteWarning: "এই ফাইলটি অফলাইনে সংরক্ষিত। এটি আবার স্ট্রিম করতে ইন্টারনেট প্রয়োজন হবে।",
        skipForward: "১৫ সেকেন্ড এগিয়ে",
        skipBack: "১৫ সেকেন্ড পিছিয়ে",
        hqSaved: "এইচকিউ সংরক্ষিত",
        lqSaved: "এলকিউ সংরক্ষিত"
    }
};

let currentLanguage = "en";
let currentQuality = "high";
let repeatMode = "off";

// ==============================================
// SURAH DATABASE (1-114)
// ==============================================
const SURAH_DATA = [
    { id: 1, nameBn: "আল-ফাতিহা", nameEn: "Al-Fatiha", nameAr: "الفاتحة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 7 },
    { id: 2, nameBn: "আল-বাকারাহ", nameEn: "Al-Baqarah", nameAr: "البقرة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 286 },
    { id: 3, nameBn: "আল-ইমরান", nameEn: "Aal-Imran", nameAr: "آل عمران", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 200 },
    { id: 4, nameBn: "আন-নিসা", nameEn: "An-Nisa", nameAr: "النساء", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 176 },
    { id: 5, nameBn: "আল-মায়িদাহ", nameEn: "Al-Ma'idah", nameAr: "المائدة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 120 },
    { id: 6, nameBn: "আল-আনআম", nameEn: "Al-An'am", nameAr: "الأنعام", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 165 },
    { id: 7, nameBn: "আল-আরাফ", nameEn: "Al-A'raf", nameAr: "الأعراف", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 206 },
    { id: 8, nameBn: "আল-আনফাল", nameEn: "Al-Anfal", nameAr: "الأنفال", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 75 },
    { id: 9, nameBn: "আত-তাওবাহ", nameEn: "At-Tawbah", nameAr: "التوبة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 129 },
    { id: 10, nameBn: "ইউনুস", nameEn: "Yunus", nameAr: "يونس", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 109 },
    { id: 11, nameBn: "হুদ", nameEn: "Hud", nameAr: "هود", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 123 },
    { id: 12, nameBn: "ইউসুফ", nameEn: "Yusuf", nameAr: "يوسف", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 111 },
    { id: 13, nameBn: "আর-রাদ", nameEn: "Ar-Ra'd", nameAr: "الرعد", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 43 },
    { id: 14, nameBn: "ইব্রাহীম", nameEn: "Ibrahim", nameAr: "إبراهيم", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 52 },
    { id: 15, nameBn: "আল-হিজর", nameEn: "Al-Hijr", nameAr: "الحجر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 99 },
    { id: 16, nameBn: "আন-নাহল", nameEn: "An-Nahl", nameAr: "النحل", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 128 },
    { id: 17, nameBn: "বনী ইসরাঈল", nameEn: "Al-Isra", nameAr: "الإسراء", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 111 },
    { id: 18, nameBn: "আল-কাহফ", nameEn: "Al-Kahf", nameAr: "الكهف", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 110 },
    { id: 19, nameBn: "মারইয়াম", nameEn: "Maryam", nameAr: "مريم", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 98 },
    { id: 20, nameBn: "ত্বোয়া-হা", nameEn: "Taha", nameAr: "طه", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 135 },
    { id: 21, nameBn: "আল-আম্বিয়া", nameEn: "Al-Anbya", nameAr: "الأنبياء", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 112 },
    { id: 22, nameBn: "আল-হাজ্জ", nameEn: "Al-Hajj", nameAr: "الحج", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 78 },
    { id: 23, nameBn: "আল-মু'মিনুন", nameEn: "Al-Mu'minun", nameAr: "المؤمنون", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 118 },
    { id: 24, nameBn: "আন-নূর", nameEn: "An-Nur", nameAr: "النور", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 64 },
    { id: 25, nameBn: "আল-ফুরকান", nameEn: "Al-Furqan", nameAr: "الفرقان", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 77 },
    { id: 26, nameBn: "আশ-শু'আরা", nameEn: "Ash-Shu'ara", nameAr: "الشعراء", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 227 },
    { id: 27, nameBn: "আন-নামল", nameEn: "An-Naml", nameAr: "النمل", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 93 },
    { id: 28, nameBn: "আল-কাসাস", nameEn: "Al-Qasas", nameAr: "القصص", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 88 },
    { id: 29, nameBn: "আল-আনকাবুত", nameEn: "Al-Ankabut", nameAr: "العنكبوت", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 69 },
    { id: 30, nameBn: "আর-রুম", nameEn: "Ar-Rum", nameAr: "الروم", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 60 },
    { id: 31, nameBn: "লুকমান", nameEn: "Luqman", nameAr: "لقمان", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 34 },
    { id: 32, nameBn: "আস-সাজদাহ", nameEn: "As-Sajdah", nameAr: "السجدة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 30 },
    { id: 33, nameBn: "আল-আহযাব", nameEn: "Al-Ahzab", nameAr: "الأحزاب", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 73 },
    { id: 34, nameBn: "সাবা", nameEn: "Saba", nameAr: "سبأ", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 54 },
    { id: 35, nameBn: "ফাতির", nameEn: "Fatir", nameAr: "فاطر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 45 },
    { id: 36, nameBn: "ইয়াসিন", nameEn: "Ya-Sin", nameAr: "يس", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 83 },
    { id: 37, nameBn: "আস-সাফফাত", nameEn: "As-Saffat", nameAr: "الصافات", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 182 },
    { id: 38, nameBn: "সোয়াদ", nameEn: "Sad", nameAr: "ص", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 88 },
    { id: 39, nameBn: "আজ-জুমার", nameEn: "Az-Zumar", nameAr: "الزمر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 75 },
    { id: 40, nameBn: "আল-মু'মিন", nameEn: "Ghafir", nameAr: "غافر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 85 },
    { id: 41, nameBn: "হা-মীম সেজদাহ", nameEn: "Fussilat", nameAr: "فصلت", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 54 },
    { id: 42, nameBn: "আশ-শুরা", nameEn: "Ash-Shura", nameAr: "الشورى", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 53 },
    { id: 43, nameBn: "আজ-জুখরুফ", nameEn: "Az-Zukhruf", nameAr: "الزخرف", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 89 },
    { id: 44, nameBn: "আদ-দুখান", nameEn: "Ad-Dukhan", nameAr: "الدخان", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 59 },
    { id: 45, nameBn: "আল-জাসিয়াহ", nameEn: "Al-Jathiyah", nameAr: "الجاثية", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 37 },
    { id: 46, nameBn: "আল-আহকাফ", nameEn: "Al-Ahqaf", nameAr: "الأحقاف", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 35 },
    { id: 47, nameBn: "মুহাম্মদ", nameEn: "Muhammad", nameAr: "محمد", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 38 },
    { id: 48, nameBn: "আল-ফাতহ", nameEn: "Al-Fath", nameAr: "الفتح", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 29 },
    { id: 49, nameBn: "আল-হুজুরাত", nameEn: "Al-Hujurat", nameAr: "الحجرات", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 18 },
    { id: 50, nameBn: "ক্বাফ", nameEn: "Qaf", nameAr: "ق", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 45 },
    { id: 51, nameBn: "আজ-জারিয়াত", nameEn: "Adh-Dhariyat", nameAr: "الذاريات", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 60 },
    { id: 52, nameBn: "আত-তুর", nameEn: "At-Tur", nameAr: "الطور", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 49 },
    { id: 53, nameBn: "আন-নাজম", nameEn: "An-Najm", nameAr: "النجم", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 62 },
    { id: 54, nameBn: "আল-ক্বামার", nameEn: "Al-Qamar", nameAr: "القمر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 55 },
    { id: 55, nameBn: "আর-রহমান", nameEn: "Ar-Rahman", nameAr: "الرحمن", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 78 },
    { id: 56, nameBn: "আল-ওয়াকিয়াহ", nameEn: "Al-Waqi'ah", nameAr: "الواقعة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 96 },
    { id: 57, nameBn: "আল-হাদীদ", nameEn: "Al-Hadid", nameAr: "الحديد", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 29 },
    { id: 58, nameBn: "আল-মুজাদালাহ", nameEn: "Al-Mujadila", nameAr: "المجادلة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 22 },
    { id: 59, nameBn: "আল-হাশর", nameEn: "Al-Hashr", nameAr: "الحشر", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 24 },
    { id: 60, nameBn: "আল-মুমতাহিনাহ", nameEn: "Al-Mumtahanah", nameAr: "الممتحنة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 13 },
    { id: 61, nameBn: "আস-সাফ", nameEn: "As-Saff", nameAr: "الصف", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 14 },
    { id: 62, nameBn: "আল-জুমুআ", nameEn: "Al-Jumu'ah", nameAr: "الجمعة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 11 },
    { id: 63, nameBn: "আল-মুনাফিকুন", nameEn: "Al-Munafiqun", nameAr: "المنافقون", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 11 },
    { id: 64, nameBn: "আত-তাগাবুন", nameEn: "At-Taghabun", nameAr: "التغابن", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 18 },
    { id: 65, nameBn: "আত-তালাক", nameEn: "At-Talaq", nameAr: "الطلاق", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 12 },
    { id: 66, nameBn: "আত-তাহরীম", nameEn: "At-Tahrim", nameAr: "التحريم", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 12 },
    { id: 67, nameBn: "আল-মুলক", nameEn: "Al-Mulk", nameAr: "الملك", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 30 },
    { id: 68, nameBn: "আল-কালাম", nameEn: "Al-Qalam", nameAr: "القلم", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 52 },
    { id: 69, nameBn: "আল-হাক্কাহ", nameEn: "Al-Haqqah", nameAr: "الحاقة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 52 },
    { id: 70, nameBn: "আল-মাআরিজ", nameEn: "Al-Ma'arij", nameAr: "المعارج", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 44 },
    { id: 71, nameBn: "নূহ", nameEn: "Nuh", nameAr: "نوح", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 28 },
    { id: 72, nameBn: "আল-জ্বীন", nameEn: "Al-Jinn", nameAr: "الجن", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 28 },
    { id: 73, nameBn: "আল-মুযযাম্মিল", nameEn: "Al-Muzzammil", nameAr: "المزمل", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 20 },
    { id: 74, nameBn: "আল-মুদ্দাসসির", nameEn: "Al-Muddaththir", nameAr: "المدثر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 56 },
    { id: 75, nameBn: "আল-কিয়ামাহ", nameEn: "Al-Qiyamah", nameAr: "القيامة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 40 },
    { id: 76, nameBn: "আল-ইনসান", nameEn: "Al-Insan", nameAr: "الإنسان", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 31 },
    { id: 77, nameBn: "আল-মুরসালাত", nameEn: "Al-Mursalat", nameAr: "المرسلات", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 50 },
    { id: 78, nameBn: "আন-নাবা", nameEn: "An-Naba", nameAr: "النبأ", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 40 },
    { id: 79, nameBn: "আন-নাযিয়াত", nameEn: "An-Nazi'at", nameAr: "النازعات", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 46 },
    { id: 80, nameBn: "আবাসা", nameEn: "'Abasa", nameAr: "عبس", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 42 },
    { id: 81, nameBn: "আত-তাকভীর", nameEn: "At-Takwir", nameAr: "التكوير", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 29 },
    { id: 82, nameBn: "আল-ইনফিতার", nameEn: "Al-Infitar", nameAr: "الانفطار", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 19 },
    { id: 83, nameBn: "আল-মুতাফফিফীন", nameEn: "Al-Mutaffifin", nameAr: "المطففين", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 36 },
    { id: 84, nameBn: "আল-ইনশিকাক", nameEn: "Al-Inshiqaq", nameAr: "الانشقاق", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 25 },
    { id: 85, nameBn: "আল-বুরুজ", nameEn: "Al-Buruj", nameAr: "البروج", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 22 },
    { id: 86, nameBn: "আত-তারিক", nameEn: "At-Tariq", nameAr: "الطارق", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 17 },
    { id: 87, nameBn: "আল-আ'লা", nameEn: "Al-A'la", nameAr: "الأعلى", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 19 },
    { id: 88, nameBn: "আল-গাশিয়াহ", nameEn: "Al-Ghashiyah", nameAr: "الغاشية", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 26 },
    { id: 89, nameBn: "আল-ফাজর", nameEn: "Al-Fajr", nameAr: "الفجر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 30 },
    { id: 90, nameBn: "আল-বালাদ", nameEn: "Al-Balad", nameAr: "البلد", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 20 },
    { id: 91, nameBn: "আশ-শামস", nameEn: "Ash-Shams", nameAr: "الشمس", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 15 },
    { id: 92, nameBn: "আল-লাইল", nameEn: "Al-Layl", nameAr: "الليل", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 21 },
    { id: 93, nameBn: "আদ-দুহা", nameEn: "Ad-Duha", nameAr: "الضحى", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 11 },
    { id: 94, nameBn: "আল-ইনশিরাহ", nameEn: "Ash-Sharh", nameAr: "الشرح", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 8 },
    { id: 95, nameBn: "আত-তীন", nameEn: "At-Tin", nameAr: "التين", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 8 },
    { id: 96, nameBn: "আল-আলাক", nameEn: "Al-'Alaq", nameAr: "العلق", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 19 },
    { id: 97, nameBn: "আল-কদর", nameEn: "Al-Qadr", nameAr: "القدر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 5 },
    { id: 98, nameBn: "আল-বাইয়্যিনাহ", nameEn: "Al-Bayyinah", nameAr: "البينة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 8 },
    { id: 99, nameBn: "আজ-জিলযাল", nameEn: "Az-Zalzalah", nameAr: "الزلزلة", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 8 },
    { id: 100, nameBn: "আল-আদিয়াত", nameEn: "Al-'Adiyat", nameAr: "العاديات", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 11 },
    { id: 101, nameBn: "আল-কারিয়াহ", nameEn: "Al-Qari'ah", nameAr: "القارعة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 11 },
    { id: 102, nameBn: "আত-তাকাসুর", nameEn: "At-Takathur", nameAr: "التكاثر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 8 },
    { id: 103, nameBn: "আল-আসর", nameEn: "Al-'Asr", nameAr: "العصر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 3 },
    { id: 104, nameBn: "আল-হুমাযাহ", nameEn: "Al-Humazah", nameAr: "الهمزة", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 9 },
    { id: 105, nameBn: "আল-ফীল", nameEn: "Al-Fil", nameAr: "الفيل", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 5 },
    { id: 106, nameBn: "কুরাইশ", nameEn: "Quraysh", nameAr: "قريش", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 4 },
    { id: 107, nameBn: "আল-মাউন", nameEn: "Al-Ma'un", nameAr: "الماعون", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 7 },
    { id: 108, nameBn: "আল-কাওসার", nameEn: "Al-Kawthar", nameAr: "الكوثر", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 3 },
    { id: 109, nameBn: "আল-কাফিরুন", nameEn: "Al-Kafirun", nameAr: "الكافرون", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 6 },
    { id: 110, nameBn: "আন-নাসর", nameEn: "An-Nasr", nameAr: "النصر", typeBn: "মাদানী", typeEn: "Medinan", ayahs: 3 },
    { id: 111, nameBn: "আল-লাহাব", nameEn: "Al-Masad", nameAr: "المسد", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 5 },
    { id: 112, nameBn: "আল-ইখলাস", nameEn: "Al-Ikhlas", nameAr: "الإخلاص", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 4 },
    { id: 113, nameBn: "আল-ফালাক", nameEn: "Al-Falaq", nameAr: "الفلق", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 5 },
    { id: 114, nameBn: "আন-নাস", nameEn: "An-Nas", nameAr: "الناس", typeBn: "মক্কী", typeEn: "Meccan", ayahs: 6 }
];

// ==============================================
// LOCALSTORAGE KEYS
// ==============================================
const STORAGE_KEYS = {
    LAST_SURAH: 'noor_last_surah',
    QUALITY: 'noor_quality',
    REPEAT_MODE: 'noor_repeat_mode',
    LANGUAGE: 'noor_language',
    VOLUME: 'noor_volume'
};

const OFFLINE_PREFIX = 'noor_offline_';

// ==============================================
// APPLICATION STATE
// ==============================================
let currentSurahIndex = 0;
let audio = null;
let isPlaying = false;
let isDragging = false;
let pendingDelete = { quality: null, surahId: null, surahName: null };
let tooltipElement = null;

// DOM Elements
const surahSelect = document.getElementById('surahSelect');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const skipBackBtn = document.getElementById('skipBackBtn');
const skipForwardBtn = document.getElementById('skipForwardBtn');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent');
const statusText = document.getElementById('statusText');
const surahNameBn = document.getElementById('surahNameBn');
const surahNameAr = document.getElementById('surahNameAr');
const surahDetails = document.getElementById('surahDetails');
const lowQualityBtn = document.getElementById('lowQualityBtn');
const highQualityBtn = document.getElementById('highQualityBtn');
const qualityNote = document.getElementById('qualityNote');
const qualityLabel = document.getElementById('qualityLabel');
const surahLabel = document.getElementById('surahLabel');
const repeatBtn = document.getElementById('repeatBtn');
const repeatIcon = document.getElementById('repeatIcon');
const repeatText = document.getElementById('repeatText');
const engLangBtn = document.getElementById('engLangBtn');
const bnLangBtn = document.getElementById('bnLangBtn');
const siteTitle = document.getElementById('siteTitle');
const siteSubtitle = document.getElementById('siteSubtitle');
const footerText1 = document.getElementById('footerText1');
const footerText2 = document.getElementById('footerText2');
const saveHqBtn = document.getElementById('saveHqBtn');
const saveLqBtn = document.getElementById('saveLqBtn');
const deleteHqBtn = document.getElementById('deleteHqBtn');
const deleteLqBtn = document.getElementById('deleteLqBtn');
const hqSavedBadge = document.getElementById('hqSavedBadge');
const lqSavedBadge = document.getElementById('lqSavedBadge');
const modal = document.getElementById('deleteModal');
const modalMessage = document.getElementById('modalMessage');
const modalWarning = document.getElementById('modalWarning');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');

// ==============================================
// HELPER FUNCTIONS
// ==============================================
function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function saveToLocalStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
}

function loadFromLocalStorage(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        if (item !== null) return JSON.parse(item);
    } catch(e) {}
    return defaultValue;
}

// ==============================================
// AUDIO URL - Uses global getAudioUrl from urls.js
// ==============================================
function getAudioUrlForSurah(surahId, quality) {
    if (typeof getAudioUrl !== 'undefined') {
        return getAudioUrl(surahId, quality);
    }
    console.error('getAudioUrl function not found! Make sure urls.js is loaded.');
    return null;
}

// ==============================================
// OFFLINE STORAGE FUNCTIONS
// ==============================================
async function saveOffline(surahId, quality, audioUrl) {
    try {
        const cacheName = `${OFFLINE_PREFIX}${surahId}_${quality}`;
        const cache = await caches.open(cacheName);
        const response = await fetch(audioUrl);
        if (!response.ok) throw new Error('Fetch failed');
        await cache.put(audioUrl, response);
        const metadata = { surahId, quality, savedAt: Date.now(), url: audioUrl };
        localStorage.setItem(`${cacheName}_meta`, JSON.stringify(metadata));
        return true;
    } catch (error) {
        console.error('Save offline error:', error);
        return false;
    }
}

async function deleteOffline(surahId, quality) {
    try {
        const cacheName = `${OFFLINE_PREFIX}${surahId}_${quality}`;
        const cache = await caches.open(cacheName);
        const metadata = localStorage.getItem(`${cacheName}_meta`);
        if (metadata) {
            const { url } = JSON.parse(metadata);
            await cache.delete(url);
            localStorage.removeItem(`${cacheName}_meta`);
        }
        await caches.delete(cacheName);
        return true;
    } catch (error) {
        console.error('Delete offline error:', error);
        return false;
    }
}

async function isOfflineAvailable(surahId, quality) {
    const cacheName = `${OFFLINE_PREFIX}${surahId}_${quality}`;
    const metadata = localStorage.getItem(`${cacheName}_meta`);
    return metadata !== null;
}

async function playFromOffline(surahId, quality) {
    const cacheName = `${OFFLINE_PREFIX}${surahId}_${quality}`;
    const metadata = localStorage.getItem(`${cacheName}_meta`);
    if (metadata) {
        const { url } = JSON.parse(metadata);
        const cache = await caches.open(cacheName);
        const response = await cache.match(url);
        if (response) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
    }
    return null;
}

async function getPlayableUrl(surahId, quality) {
    const saved = await isOfflineAvailable(surahId, quality);
    if (saved) {
        const offlineUrl = await playFromOffline(surahId, quality);
        if (offlineUrl) return offlineUrl;
    }
    return getAudioUrlForSurah(surahId, quality);
}

// ==============================================
// UI UPDATE FUNCTIONS
// ==============================================
async function updateOfflineUI() {
    const surah = SURAH_DATA[currentSurahIndex];
    if (!surah) return;
    
    const [hqSaved, lqSaved] = await Promise.all([
        isOfflineAvailable(surah.id, 'high'),
        isOfflineAvailable(surah.id, 'low')
    ]);
    
    saveHqBtn.style.display = hqSaved ? 'none' : 'flex';
    deleteHqBtn.style.display = hqSaved ? 'flex' : 'none';
    hqSavedBadge.style.display = hqSaved ? 'inline' : 'none';
    
    saveLqBtn.style.display = lqSaved ? 'none' : 'flex';
    deleteLqBtn.style.display = lqSaved ? 'flex' : 'none';
    lqSavedBadge.style.display = lqSaved ? 'inline' : 'none';
    
    await updateDropdownOptions();
}

async function updateDropdownOptions() {
    const currentValue = surahSelect.value;
    surahSelect.innerHTML = '';
    
    for (const surah of SURAH_DATA) {
        const option = document.createElement('option');
        option.value = surah.id;
        
        const [hqSaved, lqSaved] = await Promise.all([
            isOfflineAvailable(surah.id, 'high'),
            isOfflineAvailable(surah.id, 'low')
        ]);
        
        let badges = '';
        if (hqSaved && lqSaved) badges = ' ✓HQ ✓LQ';
        else if (hqSaved) badges = ' ✓HQ';
        else if (lqSaved) badges = ' ✓LQ';
        
        const name = currentLanguage === "en" ? surah.nameEn : surah.nameBn;
        option.textContent = `${surah.id}. ${name} (${surah.ayahs})${badges}`;
        surahSelect.appendChild(option);
    }
    surahSelect.value = currentValue;
}

function updateSurahInfo() {
    const surah = SURAH_DATA[currentSurahIndex];
    if (surah) {
        surahNameBn.textContent = currentLanguage === "en" ? surah.nameEn : surah.nameBn;
        surahNameAr.textContent = surah.nameAr;
        const type = currentLanguage === "en" ? surah.typeEn : surah.typeBn;
        surahDetails.textContent = `${type} | ${surah.ayahs} ${TRANSLATIONS[currentLanguage].verses}`;
        if (surahSelect.value != surah.id) surahSelect.value = surah.id;
        updateOfflineUI();
    }
}

function updateLanguage() {
    const t = TRANSLATIONS[currentLanguage];
    siteTitle.textContent = t.siteTitle;
    siteSubtitle.textContent = t.siteSubtitle;
    qualityLabel.textContent = t.qualityLabel;
    lowQualityBtn.textContent = t.lowQuality;
    highQualityBtn.textContent = t.highQuality;
    surahLabel.textContent = t.surahLabel;
    footerText1.textContent = t.footer1;
    footerText2.textContent = t.footer2;
    qualityNote.textContent = currentQuality === "high" ? t.qualityNoteHigh : t.qualityNoteLow;
    updateRepeatButtonText();
    updateSurahInfo();
    if (!isPlaying && (!audio || audio.ended)) statusText.textContent = t.ready;
}

function updateRepeatButtonText() {
    const t = TRANSLATIONS[currentLanguage];
    if (repeatMode === "off") { repeatIcon.textContent = "🔁"; repeatText.textContent = t.repeatOff; }
    else if (repeatMode === "one") { repeatIcon.textContent = "🔂"; repeatText.textContent = t.repeatOne; }
    else { repeatIcon.textContent = "🔁"; repeatText.textContent = t.repeatAll; }
}

// ==============================================
// PLAYBACK FUNCTIONS
// ==============================================
function setupAudioEvents() {
    if (!audio) return;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onAudioEnd);
    audio.addEventListener('error', onAudioError);
}

function updateProgress() {
    if (audio && audio.duration && !isNaN(audio.duration) && !isDragging) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        const knob = document.getElementById('progressKnob');
        if (knob) knob.style.left = `${percent}%`;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
        totalTimeSpan.textContent = formatTime(audio.duration);
    }
}

function onAudioEnd() {
    const t = TRANSLATIONS[currentLanguage];
    if (repeatMode === "one") {
        loadAndPlaySurah(currentSurahIndex, true);
    } else if (repeatMode === "all") {
        currentSurahIndex = (currentSurahIndex + 1) % SURAH_DATA.length;
        loadAndPlaySurah(currentSurahIndex, true);
    } else {
        isPlaying = false;
        playPauseBtn.textContent = "▶";
        statusText.textContent = t.completed;
        saveToLocalStorage(STORAGE_KEYS.LAST_SURAH, currentSurahIndex);
        if (audio) audio.currentTime = 0;
        progressFill.style.width = "0%";
        const knob = document.getElementById('progressKnob');
        if (knob) knob.style.left = "0%";
        currentTimeSpan.textContent = "0:00";
        setTimeout(() => {
            if (!isPlaying && statusText.textContent === t.completed) statusText.textContent = t.ready;
        }, 3000);
    }
}

function onAudioError(e) {
    const t = TRANSLATIONS[currentLanguage];
    console.error("Audio error:", e);
    statusText.textContent = t.error;
    isPlaying = false;
    playPauseBtn.textContent = "▶";
}

async function loadAndPlaySurah(index, autoPlay = true) {
    const surah = SURAH_DATA[index];
    const t = TRANSLATIONS[currentLanguage];
    if (!surah) return false;
    
    saveToLocalStorage(STORAGE_KEYS.LAST_SURAH, index);
    
    if (audio) {
        audio.pause();
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', onAudioEnd);
        audio.removeEventListener('error', onAudioError);
        audio = null;
    }
    
    const audioUrl = await getPlayableUrl(surah.id, currentQuality);
    const isOffline = await isOfflineAvailable(surah.id, currentQuality);
    
    statusText.textContent = `⏳ ${t.loading}: ${currentLanguage === "en" ? surah.nameEn : surah.nameBn}...`;
    
    try {
        audio = new Audio(audioUrl);
        audio.volume = volumeSlider.value / 100;
        setupAudioEvents();
        
        audio.addEventListener('loadedmetadata', () => {
            totalTimeSpan.textContent = formatTime(audio.duration);
            if (!autoPlay) statusText.textContent = `✅ ${currentLanguage === "en" ? surah.nameEn : surah.nameBn} ${t.loaded}`;
        });
        
        if (autoPlay) {
            await audio.play();
            isPlaying = true;
            playPauseBtn.textContent = "⏸";
            const source = isOffline ? "📴" : "🌐";
            statusText.textContent = `${source} ${t.playing}: ${currentLanguage === "en" ? surah.nameEn : surah.nameBn}`;
        } else {
            isPlaying = false;
            playPauseBtn.textContent = "▶";
        }
        
        updateSurahInfo();
        return true;
    } catch (error) {
        console.error("Playback error:", error);
        statusText.textContent = t.error;
        isPlaying = false;
        playPauseBtn.textContent = "▶";
        return false;
    }
}

function togglePlayback() {
    const t = TRANSLATIONS[currentLanguage];
    if (!audio) {
        loadAndPlaySurah(currentSurahIndex, true);
        return;
    }
    const hasEnded = audio.ended || (audio.currentTime > 0 && audio.currentTime >= audio.duration - 0.1);
    if (hasEnded && !isPlaying) {
        audio.currentTime = 0;
        audio.play().then(() => {
            isPlaying = true;
            playPauseBtn.textContent = "⏸";
            const surah = SURAH_DATA[currentSurahIndex];
            statusText.textContent = `🔊 ${t.playing}: ${currentLanguage === "en" ? surah.nameEn : surah.nameBn}`;
        }).catch(err => { console.error(err); statusText.textContent = t.error; });
        return;
    }
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶";
        statusText.textContent = `⏸️ ${t.paused}`;
    } else {
        audio.play().then(() => {
            isPlaying = true;
            playPauseBtn.textContent = "⏸";
            const surah = SURAH_DATA[currentSurahIndex];
            statusText.textContent = `🔊 ${t.playing}: ${currentLanguage === "en" ? surah.nameEn : surah.nameBn}`;
        }).catch(err => { console.error(err); statusText.textContent = t.error; });
    }
}

function nextSurah() {
    const t = TRANSLATIONS[currentLanguage];
    if (currentSurahIndex < SURAH_DATA.length - 1) {
        currentSurahIndex++;
        loadAndPlaySurah(currentSurahIndex, true);
    } else {
        statusText.textContent = t.lastSurah;
        setTimeout(() => { if (statusText.textContent === t.lastSurah) statusText.textContent = t.ready; }, 2000);
    }
}

function prevSurah() {
    const t = TRANSLATIONS[currentLanguage];
    if (currentSurahIndex > 0) {
        currentSurahIndex--;
        loadAndPlaySurah(currentSurahIndex, true);
    } else {
        statusText.textContent = t.firstSurah;
        setTimeout(() => { if (statusText.textContent === t.firstSurah) statusText.textContent = t.ready; }, 2000);
    }
}

function onSurahChange() {
    const selectedId = parseInt(surahSelect.value);
    const newIndex = SURAH_DATA.findIndex(s => s.id === selectedId);
    if (newIndex !== -1 && newIndex !== currentSurahIndex) {
        currentSurahIndex = newIndex;
        loadAndPlaySurah(currentSurahIndex, true);
    }
}

// ==============================================
// SKIP FUNCTIONS
// ==============================================
function skipForward() {
    if (audio && audio.duration) {
        audio.currentTime = Math.min(audio.currentTime + 15, audio.duration);
        const t = TRANSLATIONS[currentLanguage];
        statusText.textContent = `⏩ ${t.skipForward}`;
        setTimeout(() => {
            if (statusText.textContent === `⏩ ${t.skipForward}` && !isPlaying) {
                statusText.textContent = t.ready;
            }
        }, 1500);
    }
}

function skipBackward() {
    if (audio && audio.duration) {
        audio.currentTime = Math.max(audio.currentTime - 15, 0);
        const t = TRANSLATIONS[currentLanguage];
        statusText.textContent = `⏪ ${t.skipBack}`;
        setTimeout(() => {
            if (statusText.textContent === `⏪ ${t.skipBack}` && !isPlaying) {
                statusText.textContent = t.ready;
            }
        }, 1500);
    }
}

// ==============================================
// QUALITY & REPEAT FUNCTIONS
// ==============================================
function cycleRepeatMode() {
    if (repeatMode === "off") repeatMode = "one";
    else if (repeatMode === "one") repeatMode = "all";
    else repeatMode = "off";
    updateRepeatButtonText();
    saveToLocalStorage(STORAGE_KEYS.REPEAT_MODE, repeatMode);
    const t = TRANSLATIONS[currentLanguage];
    let modeText = repeatMode === "off" ? t.repeatOff : (repeatMode === "one" ? t.repeatOne : t.repeatAll);
    statusText.textContent = `🔄 ${t.repeatModeChanged}: ${modeText}`;
    setTimeout(() => {
        if (!isPlaying && statusText.textContent.includes(t.repeatModeChanged)) {
            statusText.textContent = t.ready;
        }
    }, 2000);
}

async function switchQuality(quality) {
    if (currentQuality === quality) return;
    const wasPlaying = isPlaying;
    const currentTime = audio ? audio.currentTime : 0;
    currentQuality = quality;
    saveToLocalStorage(STORAGE_KEYS.QUALITY, currentQuality);
    const t = TRANSLATIONS[currentLanguage];
    highQualityBtn.classList.toggle('active', quality === 'high');
    lowQualityBtn.classList.toggle('active', quality === 'low');
    qualityNote.textContent = quality === 'high' ? t.qualityNoteHigh : t.qualityNoteLow;
    
    if (wasPlaying || (audio && audio.src)) {
        const surah = SURAH_DATA[currentSurahIndex];
        const newUrl = await getPlayableUrl(surah.id, quality);
        const wasPlayingState = isPlaying;
        if (audio) {
            audio.pause();
            const oldAudio = audio;
            audio = new Audio(newUrl);
            audio.volume = volumeSlider.value / 100;
            audio.currentTime = currentTime;
            setupAudioEvents();
            oldAudio.removeEventListener('timeupdate', updateProgress);
            oldAudio.removeEventListener('ended', onAudioEnd);
            oldAudio.removeEventListener('error', onAudioError);
            if (wasPlayingState) {
                await audio.play();
                isPlaying = true;
                playPauseBtn.textContent = "⏸";
            }
            statusText.textContent = `🔄 ${t.qualityChanged}: ${quality === 'high' ? t.highQuality : t.lowQuality}`;
        }
    }
}

// ==============================================
// VOLUME FUNCTION
// ==============================================
function updateVolume() {
    const volume = volumeSlider.value;
    volumePercent.textContent = `${volume}%`;
    if (audio) audio.volume = volume / 100;
    saveToLocalStorage(STORAGE_KEYS.VOLUME, volume);
    const volumeIcon = document.querySelector('.volume-icon');
    if (volume == 0) volumeIcon.textContent = "🔇";
    else if (volume < 40) volumeIcon.textContent = "🔈";
    else if (volume < 70) volumeIcon.textContent = "🔉";
    else volumeIcon.textContent = "🔊";
}

// ==============================================
// SAVE/DELETE HANDLERS
// ==============================================
async function handleSave(quality) {
    const surah = SURAH_DATA[currentSurahIndex];
    const audioUrl = getAudioUrlForSurah(surah.id, quality);
    const t = TRANSLATIONS[currentLanguage];
    
    if (!audioUrl) {
        statusText.textContent = "❌ No audio URL found";
        return;
    }
    
    statusText.textContent = `⏳ ${t.loading}...`;
    const success = await saveOffline(surah.id, quality, audioUrl);
    
    if (success) {
        statusText.textContent = t.savedOffline;
        await updateOfflineUI();
    } else {
        statusText.textContent = t.saveFailed;
    }
    
    setTimeout(() => {
        if (statusText.textContent === t.savedOffline || statusText.textContent === t.saveFailed) {
            statusText.textContent = t.ready;
        }
    }, 2000);
}

function showDeleteModal(quality, surahId, surahName) {
    pendingDelete = { quality, surahId, surahName };
    const t = TRANSLATIONS[currentLanguage];
    const qualityText = quality === 'high' ? 'High Quality' : 'Low Quality';
    const displayQuality = currentLanguage === 'en' ? qualityText : (quality === 'high' ? 'হাই কোয়ালিটি' : 'লো কোয়ালিটি');
    
    modalMessage.textContent = t.deleteConfirm
        .replace('{quality}', displayQuality)
        .replace('{surah}', surahName);
    modalWarning.textContent = t.deleteWarning;
    modal.style.display = 'flex';
}

function hideDeleteModal() {
    modal.style.display = 'none';
    pendingDelete = { quality: null, surahId: null, surahName: null };
}

async function confirmDelete() {
    if (pendingDelete.surahId) {
        const success = await deleteOffline(pendingDelete.surahId, pendingDelete.quality);
        const t = TRANSLATIONS[currentLanguage];
        
        if (success) {
            statusText.textContent = t.deletedOffline;
            await updateOfflineUI();
            
            if (currentSurahIndex === SURAH_DATA.findIndex(s => s.id === pendingDelete.surahId) && audio) {
                const newUrl = await getPlayableUrl(pendingDelete.surahId, currentQuality);
                const wasPlaying = isPlaying;
                const currentTime = audio.currentTime;
                
                audio.pause();
                audio = new Audio(newUrl);
                audio.volume = volumeSlider.value / 100;
                audio.currentTime = currentTime;
                setupAudioEvents();
                if (wasPlaying) await audio.play();
            }
        } else {
            statusText.textContent = t.saveFailed;
        }
    }
    hideDeleteModal();
}

// ==============================================
// LANGUAGE FUNCTION
// ==============================================
function switchLanguage(lang) {
    if (currentLanguage === lang) return;
    currentLanguage = lang;
    engLangBtn.classList.toggle('active', lang === 'en');
    bnLangBtn.classList.toggle('active', lang === 'bn');
    updateLanguage();
    saveToLocalStorage(STORAGE_KEYS.LANGUAGE, currentLanguage);
}

// ==============================================
// DRAGGABLE PROGRESS BAR
// ==============================================
function getTooltip() {
    if (!tooltipElement) {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'progress-tooltip';
        tooltipElement.style.display = 'none';
        document.querySelector('.progress-container').appendChild(tooltipElement);
    }
    return tooltipElement;
}

function getTimeFromPosition(clientX) {
    const rect = progressBar.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    if (audio && audio.duration && !isNaN(audio.duration)) return percent * audio.duration;
    return 0;
}

function showTooltip(clientX, time) {
    const tooltip = getTooltip();
    const rect = progressBar.getBoundingClientRect();
    let left = clientX - rect.left;
    left = Math.max(10, Math.min(rect.width - 10, left));
    tooltip.style.left = `${left}px`;
    tooltip.style.display = 'block';
    tooltip.textContent = formatTime(time);
}

function hideTooltip() { const t = getTooltip(); if (t) t.style.display = 'none'; }

function startDrag(clientX) {
    if (!audio || !audio.duration || isNaN(audio.duration)) return;
    isDragging = true;
    document.body.classList.add('dragging-progress');
    const knob = document.getElementById('progressKnob');
    if (knob) knob.classList.add('dragging');
}

function duringDrag(clientX) {
    if (!isDragging || !audio) return;
    const newTime = getTimeFromPosition(clientX);
    if (!isNaN(newTime) && isFinite(newTime)) {
        showTooltip(clientX, newTime);
        const rect = progressBar.getBoundingClientRect();
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        progressFill.style.width = `${percent * 100}%`;
        const knob = document.getElementById('progressKnob');
        if (knob) knob.style.left = `${percent * 100}%`;
        currentTimeSpan.textContent = formatTime(newTime);
    }
}

function endDrag(clientX) {
    if (!isDragging) return;
    isDragging = false;
    document.body.classList.remove('dragging-progress');
    const knob = document.getElementById('progressKnob');
    if (knob) knob.classList.remove('dragging');
    hideTooltip();
    if (audio && audio.duration) {
        let newTime = getTimeFromPosition(clientX);
        newTime = Math.max(0, Math.min(audio.duration, newTime));
        audio.currentTime = newTime;
        const percent = (newTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        if (knob) knob.style.left = `${percent}%`;
        currentTimeSpan.textContent = formatTime(newTime);
    }
}

function setupDraggableProgress() {
    progressBar.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDrag(e.clientX);
        const onMouseMove = (moveEvent) => duringDrag(moveEvent.clientX);
        const onMouseUp = (upEvent) => {
            endDrag(upEvent.clientX);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    progressBar.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        startDrag(touch.clientX);
        const onTouchMove = (moveEvent) => {
            moveEvent.preventDefault();
            duringDrag(moveEvent.touches[0].clientX);
        };
        const onTouchEnd = (endEvent) => {
            endDrag(endEvent.changedTouches[0].clientX);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    });
    progressBar.addEventListener('click', (e) => {
        if (!isDragging && audio && audio.duration) {
            audio.currentTime = getTimeFromPosition(e.clientX);
        }
    });
}

function setupMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => togglePlayback());
        navigator.mediaSession.setActionHandler('pause', () => togglePlayback());
        navigator.mediaSession.setActionHandler('previoustrack', () => prevSurah());
        navigator.mediaSession.setActionHandler('nexttrack', () => nextSurah());
        navigator.mediaSession.setActionHandler('seekbackward', () => skipBackward());
        navigator.mediaSession.setActionHandler('seekforward', () => skipForward());
    }
}

// ==============================================
// LOAD SETTINGS & INITIALIZATION
// ==============================================
function loadAllSettings() {
    currentSurahIndex = loadFromLocalStorage(STORAGE_KEYS.LAST_SURAH, 0);
    currentQuality = loadFromLocalStorage(STORAGE_KEYS.QUALITY, "high");
    repeatMode = loadFromLocalStorage(STORAGE_KEYS.REPEAT_MODE, "off");
    currentLanguage = loadFromLocalStorage(STORAGE_KEYS.LANGUAGE, "en");
    volumeSlider.value = loadFromLocalStorage(STORAGE_KEYS.VOLUME, 80);
    updateVolume();
}

// ==============================================
// EVENT LISTENERS
// ==============================================
playPauseBtn.addEventListener('click', togglePlayback);
prevBtn.addEventListener('click', prevSurah);
nextBtn.addEventListener('click', nextSurah);
skipBackBtn.addEventListener('click', skipBackward);
skipForwardBtn.addEventListener('click', skipForward);
surahSelect.addEventListener('change', onSurahChange);
volumeSlider.addEventListener('input', updateVolume);
lowQualityBtn.addEventListener('click', () => switchQuality('low'));
highQualityBtn.addEventListener('click', () => switchQuality('high'));
repeatBtn.addEventListener('click', cycleRepeatMode);
engLangBtn.addEventListener('click', () => switchLanguage('en'));
bnLangBtn.addEventListener('click', () => switchLanguage('bn'));
saveHqBtn.addEventListener('click', () => handleSave('high'));
saveLqBtn.addEventListener('click', () => handleSave('low'));
deleteHqBtn.addEventListener('click', () => {
    const surah = SURAH_DATA[currentSurahIndex];
    showDeleteModal('high', surah.id, currentLanguage === 'en' ? surah.nameEn : surah.nameBn);
});
deleteLqBtn.addEventListener('click', () => {
    const surah = SURAH_DATA[currentSurahIndex];
    showDeleteModal('low', surah.id, currentLanguage === 'en' ? surah.nameEn : surah.nameBn);
});
modalCancelBtn.addEventListener('click', hideDeleteModal);
modalConfirmBtn.addEventListener('click', confirmDelete);
modal.addEventListener('click', (e) => { if (e.target === modal) hideDeleteModal(); });

window.addEventListener('beforeunload', () => {
    if (audio && !audio.paused) saveToLocalStorage(STORAGE_KEYS.LAST_SURAH, currentSurahIndex);
    saveToLocalStorage(STORAGE_KEYS.VOLUME, volumeSlider.value);
});

// ==============================================
// INITIALIZATION
// ==============================================
async function init() {
    loadAllSettings();
    updateRepeatButtonText();
    highQualityBtn.classList.toggle('active', currentQuality === 'high');
    lowQualityBtn.classList.toggle('active', currentQuality === 'low');
    engLangBtn.classList.toggle('active', currentLanguage === 'en');
    bnLangBtn.classList.toggle('active', currentLanguage === 'bn');
    await updateDropdownOptions();
    setupDraggableProgress();
    setupMediaSession();
    updateSurahInfo();
    updateLanguage();
    updateVolume();
    const t = TRANSLATIONS[currentLanguage];
    statusText.textContent = t.ready;
}

init();
