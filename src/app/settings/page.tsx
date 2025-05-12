"use client";
import { useTranslation } from "../../../node_modules/react-i18next";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { t, i18n } = useTranslation(); // t関数とi18nインスタンスを取得
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("ja");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleSummiting = () => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");
      console.log("Token from localStorage:", accessToken);
      setToken(accessToken);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  const toggleAutoUpdate = () => {
    setAutoUpdateEnabled(!autoUpdateEnabled);
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang); // 言語変更
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br bg-gray-100 p-6">
      <SideBar />
      <div
        className={`settings-page min-w-5xl p-6 bg-white rounded-xl shadow-md`}
      >
        <h2 className="text-2xl font-semibold mb-8">{t("settings")}</h2>

        {/* 通知設定 */}
        <div className="setting-item mb-6">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="notifications"
          >
            通知を受け取る
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="notifications"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-200"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* サウンド設定 */}
        <div className="setting-item mb-6">
          <label htmlFor="sound" className="block text-sm font-medium mb-2">
            サウンド
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="sound"
              checked={soundEnabled}
              onChange={toggleSound}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-200"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* 自動アップデート設定 */}
        <div className="setting-item mb-6">
          <label
            htmlFor="autoUpdate"
            className="block text-sm font-medium mb-2"
          >
            自動アップデート
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="autoUpdate"
              checked={autoUpdateEnabled}
              onChange={toggleAutoUpdate}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-200"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* 言語設定 */}
        <div className="setting-item mb-6">
          <label htmlFor="language" className="block text-sm font-medium mb-2">
            言語設定
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* 保存ボタン */}
        <button
          onClick={() => alert("設定が保存されました")}
          className="w-full bg-[#5F8B4C] text-white p-3 rounded-lg shadow-md hover:bg-[#446336] transition duration-200 ease-in-out cursor-pointer"
        >
          保存
        </button>
      </div>
    </div>
  );
}
