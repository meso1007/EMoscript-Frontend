"use client"
import i18n from "i18next";
import { initReactI18next } from "../../node_modules/react-i18next";

// 言語データ
const resources = {
  en: {
    translation: {
      settings: "Settings",
      notifications: "Notifications",
      sound: "Sound",
      autoUpdate: "Auto Update",
      language: "Language",
      save: "Save",
    },
  },
  ja: {
    translation: {
      settings: "設定",
      notifications: "通知",
      sound: "サウンド",
      autoUpdate: "自動アップデート",
      language: "言語",
      save: "保存",
    },
  },
  es: {
    translation: {
      settings: "Configuraciones",
      notifications: "Notificaciones",
      sound: "Sonido",
      autoUpdate: "Actualización automática",
      language: "Idioma",
      save: "Guardar",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja", // デフォルト言語
  fallbackLng: "ja", // フォールバック言語
  interpolation: {
    escapeValue: false, // Reactではエスケープが自動で行われるため
  },
});

export default i18n;
